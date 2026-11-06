import type { ComponentProps, ReactNode } from "react";

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean;
  /** Content shown inside the field on the right edge (e.g. a show/hide button). */
  endAdornment?: ReactNode;
};

export default function Input({
  invalid,
  endAdornment,
  className,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      <input
        aria-invalid={invalid || undefined}
        className={`h-[52px] w-full rounded-xl border-2 bg-surface px-4 text-base text-black disabled:opacity-60 outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] ${invalid ? "border-danger-border" : "border-line"} ${endAdornment ? "pr-12" : ""} ${className ?? ""}`}
        {...props}
      />
      {endAdornment && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          {endAdornment}
        </div>
      )}
    </div>
  );
}
