import Label from "@/shared/components/ui/form/Label";
import type { SelectOption } from "@/shared/components/ui/form/Select";

type SpecializationPickerProps = {
  options: SelectOption[];
  value: number[];
  onChange: (ids: number[]) => void;
  error?: string;
};

export default function SpecializationPicker({
  options,
  value,
  onChange,
  error,
}: SpecializationPickerProps) {
  function toggle(id: number) {
    onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);
  }

  return (
    <div role="group" aria-labelledby="specializations-label" className="flex flex-col gap-3">
      <Label id="specializations-label">
        التخصصات <span className="text-danger">*</span>
        <span className="text-xs font-medium text-black/60"> (اختر واحد أو أكثر)</span>
      </Label>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = value.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option.value)}
              className={`h-11 rounded-xl border-2 px-4 text-sm font-semibold transition-colors ${
                selected ? "border-brand bg-brand text-white" : "border-line bg-white text-black"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}
