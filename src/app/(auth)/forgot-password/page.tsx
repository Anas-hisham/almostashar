import ForgotPasswordFlow from "@/features/auth/components/forgot-password/ForgotPasswordFlow";

export default function ForgotPasswordPage() {
  return (
    <main className="flex justify-center bg-surface px-4 py-12">
      <section className="flex w-full max-w-[50rem] flex-col gap-6 rounded-2xl bg-white px-5 py-8 shadow-sm">
        <ForgotPasswordFlow />
      </section>
    </main>
  );
}
