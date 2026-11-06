"use client";

import { useState } from "react";
import Link from "next/link";

import { authApi } from "@/features/auth/authApi";
import { setAuthenticated } from "@/features/auth/authSlice";
import {
  validateLogin,
  type LoginFieldErrors,
} from "@/features/auth/authSchemas";
import type { LoginRequest } from "@/features/auth/authTypes";

import { tokenStorage } from "@/lib/tokenStorage";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { useAppDispatch } from "@/store/hooks";
import { ROUTES } from "@/constants";

import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import Input from "@/shared/components/ui/form/Input";
import PasswordInput from "@/shared/components/ui/form/PasswordInput";
import { useRouter } from "next/navigation";

const WRONG_CREDENTIALS = "البريد الالكتروني أو كلمة المرور غير صحيحة";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { run, loading, error, clearError } = useAsyncAction(authApi.login);

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});

  const alertMessage =
    fieldErrors.email ??
    fieldErrors.password ??
    (error ? WRONG_CREDENTIALS : "");

  function resetErrors() {
    setFieldErrors({});
    clearError();
  }

  function handleChange(field: keyof LoginRequest, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    resetErrors();
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateLogin(form);

    if (!data) {
      setFieldErrors(errors);
      return;
    }

    resetErrors();

    try {
      const session = await run(data);

      tokenStorage.setTokens(session.accessToken, session.refreshToken);

      dispatch(setAuthenticated(session.user));
      console.log("Login successful:", session.user);
      router.replace(ROUTES.clientHome);
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {alertMessage && <Alert title={alertMessage} />}

      <FormField label="البريد الالكتروني" htmlFor="email">
        <Input
          id="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="example@email.com"
          value={form.email}
          invalid={!!fieldErrors.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </FormField>

      <FormField label="كلمة المرور" htmlFor="password">
        <PasswordInput
          id="password"
          dir="ltr"
          autoComplete="current-password"
          placeholder="اكتب كلمة المرور"
          value={form.password}
          invalid={!!fieldErrors.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </FormField>

      <div className="mt-2 flex flex-col items-center gap-4">
        <Button type="submit" loading={loading}>
          {loading ? "جاري الدخول…" : "دخول"}
        </Button>

        <Link
          href={ROUTES.forgotPassword}
          className="text-base font-semibold text-subtle"
        >
          هل نسيت كلمة المرور؟
        </Link>
      </div>
    </form>
  );
}
