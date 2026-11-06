import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ComponentProps<"button"> & {
  loading?: boolean;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:opacity-90 disabled:opacity-60",
  outline: "border-2 border-line bg-surface text-muted",
};

export default function Button({
  loading,
  disabled,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`h-[52px] w-full rounded-xl text-base font-bold transition-opacity disabled:cursor-not-allowed ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
