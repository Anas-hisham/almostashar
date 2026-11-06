import type { ComponentProps } from "react";

export default function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={`block text-base font-semibold text-black ${className ?? ""}`}
      {...props}
    />
  );
}
