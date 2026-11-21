import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/** Taupe page background from Figma. Cancels the dashboard's padding so it fills the area. */
export function ProfileScreen({ children }: { children: ReactNode }) {
  return (
    <div className="-m-4 min-h-full  p-4 md:-m-8 md:p-8">
      <div className="mx-auto flex w-full max-w-[44rem] flex-col gap-6">{children}</div>
    </div>
  );
}

/** Centered title with the round back button (same as the Figma header). */
export function ScreenHeader({ title, backHref }: { title: string; backHref: string }) {
  return (
    <header className="relative flex h-14 items-center justify-center">
      <h1 className="text-2xl font-bold text-black">{title}</h1>
      <Link
        href={backHref}
        aria-label="رجوع"
        className="absolute end-0 flex size-12 items-center justify-center rounded-full bg-white text-black"
      >
        <ChevronLeft className="size-6" />
      </Link>
    </header>
  );
}
