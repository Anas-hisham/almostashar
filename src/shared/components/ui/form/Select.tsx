import type { ComponentProps } from "react";
import { ChevronDownIcon } from "@/shared/components/ui/icons";

export type SelectOption = { value: number; label: string };

type SelectProps = Omit<ComponentProps<"select">, "value" | "onChange"> & {
  options: SelectOption[];
  value: number | null;
  onValueChange: (value: number) => void;
  placeholder?: string;
  invalid?: boolean;
};

export default function Select({
  options,
  value,
  onValueChange,
  placeholder = "اختر",
  invalid,
  className = "",
  ...props
}: SelectProps) {
  const borderColor = invalid ? "border-danger-border" : "border-line";

  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        value={value ?? ""}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={`h-[52px] w-full appearance-none rounded-xl border-2 bg-surface px-4 pl-12 text-base text-black outline-none transition-colors disabled:opacity-60 ${borderColor} ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-black" />
    </div>
  );
}
