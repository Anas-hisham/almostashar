import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "outline" | "secondary";
type ButtonSize = "md" | "field" | "lg";

type ButtonProps = ComponentProps<"button"> & {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:opacity-90 disabled:opacity-60",
  outline: "border-2 border-line bg-surface text-muted",
  /** cream button with green text (Figma: "اطلب خدمة أخري") */
  secondary: "border border-line bg-surface text-brand hover:bg-white",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-[52px] text-base",
  /** same height as a form field (Figma: report / submit) */
  field: "h-[60px] text-[21px]",
  /** big call-to-action (Figma: book / confirm) */
  lg: "h-[67px] text-[21px]",
};

/** Class string of a button — also usable on <Link> so links look exactly like buttons. */
export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `flex w-full items-center justify-center gap-[22px] rounded-xl font-bold transition-opacity disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]}`;
}

export default function Button({
  loading,
  disabled,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`${buttonStyles(variant, size)} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
