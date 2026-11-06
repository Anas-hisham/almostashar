import type { ReactNode } from "react";
import InlineError from "@/shared/components/ui/feedback/InlineError";
import Label from "@/shared/components/ui/form/Label";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  /** Small gray text next to the label, e.g. "(اختياري)". */
  hint?: string;
  /** Gray text under the field, replaced by the error when there is one. */
  helper?: string;
  error?: string;
  children: ReactNode;
};

/** Label + control + error message stacked, so every field looks the same. */
export default function FormField({
  label,
  htmlFor,
  required,
  hint,
  helper,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-danger"> *</span>}
        {hint && <span className="text-xs font-medium text-black/60"> {hint}</span>}
      </Label>
      {children}
      {error ? (
        <InlineError>{error}</InlineError>
      ) : (
        helper && <p className="text-base font-semibold text-muted">{helper}</p>
      )}
    </div>
  );
}
