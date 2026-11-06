"use client";

import { useState } from "react";
import { authApi } from "@/features/auth/authApi";
import { validateForgotPassword, type FieldErrors } from "@/features/auth/authSchemas";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import Input from "@/shared/components/ui/form/Input";

type EmailStepProps = {
  onSuccess: (email: string) => void;
};

const SEND_FAILED = "تعذر إرسال الرمز، تأكد من البريد الالكتروني وحاول مرة أخري";

export default function EmailStep({ onSuccess }: EmailStepProps) {
  const { run, loading } = useAsyncAction(authApi.forgotPassword);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  function handleChange(value: string) {
    setEmail(value);
    setErrors({});
    setServerError("");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateForgotPassword({ email });
    if (!data) return setErrors(errors);

    try {
      await run({ email: data.email });
      onSuccess(data.email);
    } catch (error) {
      setServerError(getRequestError(error, SEND_FAILED));
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {serverError && <Alert title={serverError} />}

      <FormField label="البريد الالكتروني" htmlFor="email" error={errors.email}>
        <Input
          id="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="اكتب البريد الالكتروني المسجل لدينا"
          value={email}
          invalid={!!errors.email}
          onChange={(e) => handleChange(e.target.value)}
        />
      </FormField>

      <Button type="submit" loading={loading}>
        {loading ? "جاري الإرسال…" : "ارسال رابط الاستعادة"}
      </Button>
    </form>
  );
}
