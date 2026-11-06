import type { ReactNode } from "react";
import Image from "next/image";

type InlineErrorProps = {
  children: ReactNode;
  className?: string;
};

/** Small red message with the error icon, shown right under a field. */
export default function InlineError({ children, className }: InlineErrorProps) {
  return (
    <p
      role="alert"
      className={`flex items-center gap-1.5 text-[13px] font-bold text-danger ${className ?? ""}`}
    >
      <Image src="/images/icons/error-circle.svg" alt="" width={14} height={14} />
      {children}
    </p>
  );
}
