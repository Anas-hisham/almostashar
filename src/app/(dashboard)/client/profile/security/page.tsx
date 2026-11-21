"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { clientApi } from "@/features/client/clientApi";
import { validateChangePassword } from "@/features/client/clientSchemas";
import { ProfileScreen, ScreenHeader } from "@/features/client/components/ProfileScreen";
import type { FieldErrors } from "@/features/auth/authSchemas";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { ROUTES } from "@/constants";
import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import PasswordInput from "@/shared/components/ui/form/PasswordInput";

type Values = { currentPassword: string; newPassword: string; confirmPassword: string };

const EMPTY: Values = { currentPassword: "", newPassword: "", confirmPassword: "" };
const FAILED = "تعذر تحديث كلمة المرور، تأكد من كلمة المرور الحالية وحاول مرة أخري";

export default function SecurityPage() {
  const router = useRouter();
  const { run, loading } = useAsyncAction(clientApi.changePassword);

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  function handleChange(field: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setServerError("");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateChangePassword(values);
    if (!data) return setErrors(errors);

    try {
      await run({ oldPassword: data.currentPassword, newPassword: data.newPassword });
      router.push(ROUTES.clientProfile);
    } catch (error) {
      setServerError(getRequestError(error, FAILED));
    }
  }

  return (
    <ProfileScreen>
      <ScreenHeader title="الأمان والخصوصية" backHref={ROUTES.clientProfile} />

      <form onSubmit={submit} noValidate className="flex flex-col gap-5 rounded-[1.25rem] bg-white p-5 sm:p-6">
        {serverError && <Alert title={serverError} />}

        <div className="flex flex-col gap-2">
          <FormField label="كلمة المرور الحالية" htmlFor="currentPassword" error={errors.currentPassword}>
            <PasswordInput
              id="currentPassword"
              dir="ltr"
              autoComplete="current-password"
              value={values.currentPassword}
              invalid={!!errors.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
            />
          </FormField>
          <Link href={ROUTES.forgotPassword} className="w-fit text-sm font-semibold text-muted">
            هل نسيت كلمة المرور ؟
          </Link>
        </div>

        <FormField
          label="كلمة المرور الجديدة"
          htmlFor="newPassword"
          helper="8 أحرف علي الأقل مع أرقام"
          error={errors.newPassword}
        >
          <PasswordInput
            id="newPassword"
            dir="ltr"
            autoComplete="new-password"
            value={values.newPassword}
            invalid={!!errors.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />
        </FormField>

        <FormField label="تأكيد كلمة المرور" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            dir="ltr"
            autoComplete="new-password"
            value={values.confirmPassword}
            invalid={!!errors.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </FormField>

        <Button type="submit" loading={loading}>
          تحديث كلمة المرور
        </Button>
      </form>
    </ProfileScreen>
  );
}
