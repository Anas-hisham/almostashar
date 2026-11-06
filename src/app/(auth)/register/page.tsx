"use client";

import { useState } from "react";
import AuthTabs from "@/features/auth/components/navigation/AuthTabs";
import RegisterForm from "@/features/auth/components/register/RegisterForm";
import RegisterationTaps, {
  type AccountType,
} from "@/features/auth/components/register/RegisterationTaps";
import AppLogo from "@/shared/components/ui/AppLogo";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<AccountType>("client");

  return (
    <main className="flex justify-center bg-surface px-4 py-12">
      <section className="flex w-full max-w-[50rem] flex-col gap-6 rounded-2xl bg-white px-5 py-8 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <AppLogo />
          <h1 className="text-2xl font-bold text-brand">انشاء حساب جديد</h1>
        </div>

        <AuthTabs active="register" />
        <RegisterationTaps active={accountType} onChange={setAccountType} />
        <RegisterForm accountType={accountType} />
      </section>
    </main>
  );
}
