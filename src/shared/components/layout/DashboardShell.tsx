"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/store/hooks";
import { getHomeRoute } from "@/features/auth/authRedirect";
import { ROUTES } from "@/constants";
import Sidebar, {
  type DashboardRole,
} from "@/shared/components/layout/Sidebar";
import { TextSkeleton } from "@/shared/components/ui/Skeleton";

/** /client/... -> client, /lawyer/... -> lawyer, /admin/... -> admin. Shared pages return null. */
function getRequiredRole(pathname: string): DashboardRole | null {
  if (pathname.startsWith("/client")) return "client";
  if (pathname.startsWith("/lawyer")) return "lawyer";
  if (pathname.startsWith("/admin")) return "admin";
  return null;
}

function toDashboardRole(role?: string): DashboardRole | null {
  const value = role?.toLowerCase();
  return value === "client" || value === "lawyer" || value === "admin"
    ? value
    : null;
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status } = useAppSelector((s) => s.auth);

  const userRole = toDashboardRole(user?.role);
  const requiredRole = getRequiredRole(pathname);
  const wrongRole = !!requiredRole && !!userRole && requiredRole !== userRole;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(ROUTES.login);
    } else if (status === "authenticated" && wrongRole && user) {
      // a client must not see /admin/... or /lawyer/..., send them to their own home
      router.replace(getHomeRoute(user.role));
    }
  }, [status, wrongRole, user, router]);

  // still restoring the session, or about to redirect: show nothing sensitive
  if (status !== "authenticated" || !userRole || wrongRole) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <TextSkeleton lines={4} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col lg:flex-row">
      <Sidebar role={userRole} />
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
