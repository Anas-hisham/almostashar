import Home from "@/features/home/Home";
import RedirectIfAuthenticated from "@/features/auth/components/RedirectIfAuthenticated";

export default function Page() {
  return (
    <RedirectIfAuthenticated>
      <Home />
    </RedirectIfAuthenticated>
  );
}
