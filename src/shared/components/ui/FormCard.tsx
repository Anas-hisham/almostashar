"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon } from "@/shared/components/ui/figmaIcons";

/** White rounded card used by the booking and report screens (Figma frames 270 / 256). */
export default function FormCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full rounded-xl bg-white ${className}`}>{children}</div>;
}

/** The "X" in the card corner: goes back, or to `fallbackHref` when there is no history. */
export function CloseButton({ fallbackHref, className = "top-[28px]" }: { fallbackHref: string; className?: string }) {
  const router = useRouter();

  function close() {
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      aria-label="إغلاق"
      onClick={close}
      className={`absolute left-[34px] ${className} z-10`}
    >
      <CloseIcon className="size-[23px] text-black" />
    </button>
  );
}
