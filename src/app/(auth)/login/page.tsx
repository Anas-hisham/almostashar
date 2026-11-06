import AuthTabs from "@/features/auth/components/navigation/AuthTabs";
import LoginForm from "@/features/auth/components/login/LoginForm";
import AppLogo from "@/shared/components/ui/AppLogo";

export default function LoginPage() {
  return (
    <main className="flex justify-center bg-surface px-4 py-12">
      <section className="flex w-full max-w-[50rem] flex-col gap-6 rounded-2xl bg-white px-5 py-8 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <AppLogo />
          <h1 className="text-2xl font-bold text-black">تسجيل الدخول</h1>
        </div>

        <AuthTabs active="login" />
        <LoginForm />
      </section>
    </main>
  );
}
