import type { SelectOption } from "@/shared/components/ui/form/Select";

/**
 * Static lists for the register form.
 * The ids must match the ids your backend expects: governorates, syndicates and
 * specializations come from your earlier code; the CITIES ids are placeholders.
 */
export const GOVERNORATES: SelectOption[] = [
  { value: 1, label: "القاهرة" },
  { value: 2, label: "الجيزة" },
  { value: 3, label: "الإسكندرية" },
];

export const CITIES: Array<SelectOption & { governorateId: number }> = [
  { value: 1, governorateId: 1, label: "مدينة نصر" },
  { value: 2, governorateId: 1, label: "المعادي" },
  { value: 3, governorateId: 1, label: "التجمع الخامس" },
  { value: 4, governorateId: 2, label: "الدقي" },
  { value: 5, governorateId: 2, label: "6 أكتوبر" },
  { value: 6, governorateId: 2, label: "الشيخ زايد" },
  { value: 7, governorateId: 3, label: "سموحة" },
  { value: 8, governorateId: 3, label: "المنتزه" },
  { value: 9, governorateId: 3, label: "العجمي" },
];

export const SYNDICATES: SelectOption[] = [
  { value: 1, label: "نقابة محامين القاهرة" },
  { value: 2, label: "نقابة محامين الجيزة" },
];

export const SPECIALIZATIONS: SelectOption[] = [
  { value: 1, label: "الشركات والعقود" },
  { value: 2, label: "قضايا العمل" },
  { value: 3, label: "العقارات" },
  { value: 4, label: "الأحوال الشخصية" },
  { value: 5, label: "الملكية الفكرية" },
  { value: 6, label: "الجنائي" },
];

export function getCities(governorateId: number | null): SelectOption[] {
  return CITIES.filter((city) => city.governorateId === governorateId);
}
