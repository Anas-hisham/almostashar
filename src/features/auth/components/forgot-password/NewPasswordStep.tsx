"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/features/auth/authApi";
import { validateResetPassword, type FieldErrors } from "@/features/auth/authSchemas";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { ROUTES } from "@/constants";
import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import PasswordInput from "@/shared/components/ui/form/PasswordInput";

type NewPasswordStepProps = {
  resetToken: string;
};

type Values = {
  newPassword: string;
  confirmPassword: string;
};

const RESET_FAILED = "تعذر تغيير كلمة المرور، ابدأ من جديد وحاول مرة أخري";

export default function NewPasswordStep({ resetToken }: NewPasswordStepProps) {
  const router = useRouter();
  const { run, loading } = useAsyncAction(authApi.resetPassword);

  const [values, setValues] = useState<Values>({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  function handleChange(field: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors({});
    setServerError("");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateResetPassword(values);
    if (!data) return setErrors(errors);

    try {
      await run({ resetToken, newPassword: data.newPassword });
      router.push(ROUTES.login);
    } catch (error) {
      setServerError(getRequestError(error, RESET_FAILED));
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {serverError && <Alert title={serverError} />}

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
          placeholder="اكتب كلمة المرور الجديدة"
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
          placeholder="اعد كتابة كلمة المرور الجديدة"
          value={values.confirmPassword}
          invalid={!!errors.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </FormField>

      <Button type="submit" loading={loading}>
        {loading ? "جاري الحفظ…" : "حفظ كلمة المرور"}
      </Button>
    </form>
  );
}
