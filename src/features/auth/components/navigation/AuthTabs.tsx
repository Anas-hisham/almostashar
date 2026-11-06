import Link from "next/link";
import { ROUTES } from "@/constants";

type AuthTabsProps = {
  active: "login" | "register";
};

const tabs = [
  { key: "login", label: "دخول", href: ROUTES.login },
  { key: "register", label: "حساب جديد", href: ROUTES.register },
] as const;

export default function AuthTabs({ active }: AuthTabsProps) {
  return (
    <nav className="flex gap-3 rounded-xl bg-surface p-1.5">
      {tabs.map((tab) => {
        const isActive = tab.key === active;

        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 flex-1 items-center justify-center rounded-xl text-sm ${
              isActive
                ? "bg-white font-black text-brand-accent shadow-md"
                : "font-semibold text-muted"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
