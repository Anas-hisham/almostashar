import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, type LucideIcon } from "lucide-react";

export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-brand">{title}</h2>
      <div className="divide-y divide-line overflow-hidden rounded-[1.25rem] bg-white">{children}</div>
    </section>
  );
}

type SettingsRowProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  /** red icon, used for logout */
  danger?: boolean;
};

export function SettingsRow({ icon: Icon, title, description, href, onClick, disabled, danger }: SettingsRowProps) {
  const body = (
    <>
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${
          danger ? "bg-danger/15 text-danger" : "bg-brand-soft text-brand"
        }`}
      >
        <Icon className="size-6" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-start">
        <span className="text-base font-semibold text-brand">{title}</span>
        <span className="text-xs font-bold text-black/50">{description}</span>
      </span>
      {!danger && <ChevronLeft className="size-5 shrink-0 text-black/60" />}
    </>
  );
  const cls = "flex w-full items-center gap-4 px-4 py-4 transition-colors hover:bg-surface disabled:opacity-60";

  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {body}
    </button>
  );
}
