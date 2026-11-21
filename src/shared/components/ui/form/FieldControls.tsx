"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import InlineError from "@/shared/components/ui/feedback/InlineError";
import { CalendarFieldIcon, ChevronIcon } from "@/shared/components/ui/figmaIcons";

/**
 * Form controls of the "request a service" / "report a lawyer" screens (Figma).
 * They all share one look: cream box, 1px grey border, 12px radius, 60px tall.
 * Colours come from the project tokens (bg-surface, border-line ...).
 */

const box = "rounded-xl border bg-surface text-base font-medium outline-none transition-colors focus:border-gold-light";
const border = (invalid?: boolean) => (invalid ? "border-danger-border" : "border-line");

/* ---------- label + control + error ---------- */

type FieldProps = {
  label: string;
  htmlFor: string;
  /** Shown in the same style, right after the label, e.g. "(اختياري)". */
  hint?: string;
  error?: string;
  /** Report screen uses a lighter label than the booking screen. */
  medium?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, hint, error, medium, className = "", children }: FieldProps) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`text-[21px] leading-normal text-black/80 ${medium ? "font-medium" : "font-semibold"}`}
      >
        {label}
        {hint}
      </label>
      {children}
      {error && <InlineError>{error}</InlineError>}
    </div>
  );
}

/* ---------- select ---------- */

export type SelectBoxOption = { value: string; label: string };

type SelectBoxProps = Omit<ComponentProps<"select">, "value" | "onChange"> & {
  options: SelectBoxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
};

export function SelectBox({
  options,
  value,
  onValueChange,
  placeholder = "اختر",
  invalid,
  ...props
}: SelectBoxProps) {
  return (
    <div className="relative">
      <select
        value={value}
        aria-invalid={invalid || undefined}
        onChange={(e) => onValueChange(e.target.value)}
        className={`${box} ${border(invalid)} h-[60px] w-full appearance-none px-[17px] text-black/70 disabled:opacity-60`}
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
      <ChevronIcon className="pointer-events-none absolute left-[17px] top-1/2 h-[9px] w-[15px] -translate-y-1/2 text-black" />
    </div>
  );
}

/* ---------- textarea ---------- */

type TextAreaBoxProps = ComponentProps<"textarea"> & { invalid?: boolean };

/** Set the height / vertical padding with className (e.g. "h-[98px] py-5"). */
export function TextAreaBox({ invalid, className = "", ...props }: TextAreaBoxProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={`${box} ${border(invalid)} block w-full resize-none px-[17px] text-black placeholder:text-black/40 ${className}`}
      {...props}
    />
  );
}

/* ---------- file picker ("Choose Files") ---------- */

type FilePickerBoxProps = {
  id: string;
  files: File[];
  onChange: (files: File[]) => void;
  invalid?: boolean;
};

export function FilePickerBox({ id, files, onChange, invalid }: FilePickerBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`${box} ${border(invalid)} flex h-[60px] items-center gap-3 px-[17px]`}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => {
          onChange(Array.from(e.target.files ?? []));
          e.target.value = ""; // lets the user pick the same file again
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="h-[28px] w-[117px] shrink-0 rounded-[7px] border border-brand font-inter text-base font-medium text-black"
      >
        Choose Files
      </button>

      {files.length > 0 && (
        <>
          <span className="min-w-0 flex-1 truncate text-xs text-black/60">
            {files.length === 1 ? files[0].name : `${files.length} ملفات`}
          </span>
          <button
            type="button"
            onClick={() => onChange([])}
            className="shrink-0 text-xs font-semibold text-danger"
          >
            إزالة
          </button>
        </>
      )}
    </div>
  );
}

/* ---------- date ---------- */

type DateBoxProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  invalid?: boolean;
};

/** Native date input (shows mm/dd/yyyy like the design) with the Figma calendar icon. */
export function DateBox({ id, value, onChange, min, invalid }: DateBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`${box} ${border(invalid)} relative h-[60px] focus-within:border-gold-light`}>
      <input
        ref={inputRef}
        id={id}
        type="date"
        dir="ltr"
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-full w-full bg-transparent pl-[17px] pr-[52px] text-left font-inter text-base outline-none [&::-webkit-calendar-picker-indicator]:hidden ${value ? "text-black" : "text-black/50"}`}
      />
      <button
        type="button"
        aria-label="اختر التاريخ"
        onClick={() => inputRef.current?.showPicker?.()}
        className="absolute right-[17px] top-1/2 -translate-y-1/2"
      >
        <CalendarFieldIcon className="h-[18px] w-[19px] text-black/60" />
      </button>
    </div>
  );
}
