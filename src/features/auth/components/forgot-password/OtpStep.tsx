"use client";

import { useState } from "react";
import { authApi } from "@/features/auth/authApi";
import { OTP_LENGTH, validateVerifyOtp } from "@/features/auth/authSchemas";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { useCountdown } from "@/shared/hooks/useCountdown";
import Button from "@/shared/components/ui/Button";
import InlineError from "@/shared/components/ui/feedback/InlineError";
import OtpInput from "@/shared/components/ui/form/OtpInput";

type OtpStepProps = {
  email: string;
  /** Called with the reset token once the code is accepted. */
  onSuccess: (resetToken: string) => void;
};

const RESEND_SECONDS = 60;
const INVALID_OTP = "الرمز غير صحيح, حاول مرة اخري";
const RESEND_FAILED = "تعذر إعادة إرسال الرمز، حاول مرة أخري";

export default function OtpStep({ email, onSuccess }: OtpStepProps) {
  const verifyAction = useAsyncAction(authApi.verifyOtp);
  const resendAction = useAsyncAction(authApi.forgotPassword);
  const countdown = useCountdown(RESEND_SECONDS);

  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");

  function handleChange(value: string) {
    setOtpCode(value);
    setError("");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateVerifyOtp({ otpCode });
    if (!data) return setError(errors.otpCode ?? INVALID_OTP);

    try {
      const resetToken = await verifyAction.run({ email, otpCode: data.otpCode });
      onSuccess(resetToken);
    } catch (err) {
      setError(getRequestError(err, INVALID_OTP));
    }
  }

  async function resend() {
    handleChange("");

    try {
      await resendAction.run({ email });
      countdown.restart();
    } catch (err) {
      setError(getRequestError(err, RESEND_FAILED));
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-3">
        <OtpInput
          value={otpCode}
          length={OTP_LENGTH}
          invalid={!!error}
          disabled={verifyAction.loading}
          onChange={handleChange}
        />
        {error && <InlineError>{error}</InlineError>}
      </div>

      <Button type="submit" loading={verifyAction.loading}>
        {verifyAction.loading ? "جاري التأكيد…" : "تأكيد الرمز"}
      </Button>

      <Button
        type="button"
        variant="outline"
        loading={resendAction.loading}
        disabled={countdown.isRunning}
        onClick={resend}
      >
        {countdown.isRunning
          ? `اعادة الارسال بعد ${countdown.secondsLeft} ثانية`
          : "اعادة ارسال الرمز"}
      </Button>
    </form>
  );
}
