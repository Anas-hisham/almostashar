"use client";

import { useState } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  invalid?: boolean;
  disabled?: boolean;
};

/**
 * Shows one box per digit, but there is a single real (invisible) input on top of them.
 * That keeps typing, backspace, paste and SMS auto-fill working natively.
 */
export default function OtpInput({
  value,
  onChange,
  length = 6,
  invalid,
  disabled,
}: OtpInputProps) {
  const [focused, setFocused] = useState(false);
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <div className="relative" dir="ltr">
      <div className="flex justify-center gap-2 sm:gap-2.5" aria-hidden="true">
        {Array.from({ length }, (_, index) => (
          <div
            key={index}
            className={`flex h-14 w-10 items-center justify-center rounded-xl border-2 bg-surface text-2xl font-bold text-black sm:h-[75px] sm:w-[66px] ${
              invalid
                ? "border-danger"
                : focused && index === activeIndex
                  ? "border-[#C5A059] ring-1 ring-[#C5A059]"
                  : "border-line"
            } ${disabled ? "opacity-60" : ""}`}
          >
            {value[index]}
          </div>
        ))}
      </div>

      <input
        value={value}
        disabled={disabled}
        maxLength={length}
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-label="رمز التحقق"
        aria-invalid={invalid || undefined}
        className="absolute inset-0 size-full opacity-0"
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, length))}
        onFocus={(e) => {
          setFocused(true);
          const end = e.target.value.length;
          e.target.setSelectionRange(end, end);
        }}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
