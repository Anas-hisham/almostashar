"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type DashboardRole = "client" | "lawyer" | "admin";

type NavItem = { label: string; href: string };

const COMMON_LINKS: NavItem[] = [
  { label: "الإشعارات", href: "/notifications" },
  { label: "المساعد القانوني", href: "/legal-ai" },
];

const LINKS_BY_ROLE: Record<DashboardRole, NavItem[]> = {
  client: [
    { label: "الرئيسية", href: "/client/home" },
    { label: "طلباتي", href: "/client/requests" },
    { label: "قضاياي", href: "/client/cases" },
    { label: "العروض", href: "/client/offers" },
    { label: "النزاعات", href: "/client/disputes" },
  ],
  lawyer: [
    { label: "لوحة التحكم", href: "/lawyer/dashboard" },
    { label: "الطلبات", href: "/lawyer/requests" },
    { label: "العروض", href: "/lawyer/offers" },
    { label: "القضايا", href: "/lawyer/cases" },
    { label: "خدماتي", href: "/lawyer/services" },
    { label: "المحفظة", href: "/lawyer/wallet" },
  ],
  admin: [
    { label: "المستخدمون", href: "/admin/users" },
    { label: "توثيق المحامين", href: "/admin/lawyers/unverified" },
    { label: "النزاعات", href: "/admin/disputes" },
    { label: "الضمان (Escrow)", href: "/admin/escrows" },
    { label: "طلبات السحب", href: "/admin/withdrawals" },
    { label: "البلاغات", href: "/admin/reports" },
  ],
};

const TITLE_BY_ROLE: Record<DashboardRole, string> = {
  client: "لوحة العميل",
  lawyer: "لوحة المحامي",
  admin: "لوحة الإدارة",
};

export default function Sidebar({ role }: { role: DashboardRole }) {
  const pathname = usePathname();
  const items = [...LINKS_BY_ROLE[role], ...COMMON_LINKS];

  return (
    <aside className="w-full shrink-0 border-b border-line bg-surface p-4 lg:w-64 lg:border-b-0 lg:border-e">
      <p className="mb-3 px-3 text-lg font-bold text-brand">
        {TITLE_BY_ROLE[role]}
      </p>

      <nav
        aria-label="قائمة لوحة التحكم"
        className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {items.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "text-black hover:bg-[#F5E6C8]/60"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
