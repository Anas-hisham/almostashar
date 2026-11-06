"use client";

import { useState, type ReactNode } from "react";
import BackToLoginLink from "@/features/auth/components/navigation/BackToLoginLink";
import EmailStep from "@/features/auth/components/forgot-password/EmailStep";
import NewPasswordStep from "@/features/auth/components/forgot-password/NewPasswordStep";
import OtpStep from "@/features/auth/components/forgot-password/OtpStep";
import AppLogo from "@/shared/components/ui/AppLogo";
import Stepper from "@/shared/components/ui/Stepper";

type Step = "email" | "otp" | "reset";

const STEPS: Step[] = ["email", "otp", "reset"];
const STEP_LABELS = ["البريد", "رمز التحقق", "كلمة جديدة"];

const STEP_CONTENT: Record<
  Step,
  { logo: string; title: string; description: (email: string) => ReactNode }
> = {
  email: {
    logo: "/images/auth/forgot-key.svg",
    title: "نسيت كلمة المرور؟",
    description: () => "اكتب البريد الالكتروني المسجل لدينا وسنرسل لك رابطا لاعادة تعيين كلمة المرور.",
  },
  otp: {
    logo: "/images/auth/forgot-mail.svg",
    title: "أدخل رمز التحقق",
    description: (email) => (
      <>
        أرسلنا رابط الاستعادة الي <bdi className="font-black text-slate-900">{email}</bdi>. الرمز
        صالح لمدة 10 دقائق.
      </>
    ),
  },
  reset: {
    logo: "/images/auth/forgot-lock.svg",
    title: "كلمة مرور جديدة",
    description: () => "اختر كلمة مرور قوية لا تستخدمها في موقع آخر.",
  },
};

/** The 3 steps of "forgot password": email -> verification code -> new password. */
export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  const { logo, title, description } = STEP_CONTENT[step];

  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center">
        <AppLogo src={logo} />
        <h1 className="text-2xl font-bold text-brand">{title}</h1>
        <p className="text-base font-semibold leading-relaxed text-muted">{description(email)}</p>
      </div>

      <Stepper steps={STEP_LABELS} current={STEPS.indexOf(step)} />

      {step === "email" && (
        <EmailStep
          onSuccess={(value) => {
            setEmail(value);
            setStep("otp");
          }}
        />
      )}

      {step === "otp" && (
        <OtpStep
          email={email}
          onSuccess={(token) => {
            setResetToken(token);
            setStep("reset");
          }}
        />
      )}

      {step === "reset" && <NewPasswordStep resetToken={resetToken} />}

      <BackToLoginLink />
    </>
  );
}
