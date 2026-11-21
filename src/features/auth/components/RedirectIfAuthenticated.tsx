"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store/hooks";
import { getHomeRoute } from "@/features/auth/authRedirect";

/** Landing page is for guests only: a logged-in user goes straight to their dashboard. */
export default function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, status } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (status === "authenticated" && user) router.replace(getHomeRoute(user.role));
  }, [status, user, router]);

  // don't flash the landing page while checking the session or redirecting
  if (status !== "unauthenticated") return null;
  return <>{children}</>;
}
