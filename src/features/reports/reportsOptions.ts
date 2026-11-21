import { ReportReason } from "@/shared/types/enums";

/** Report reasons shown in the select (first = default, like the Figma "احتيال"). */
export const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: ReportReason.Fraud, label: "احتيال" },
  { value: ReportReason.Abuse, label: "إساءة" },
  { value: ReportReason.Harassment, label: "تحرش" },
  { value: ReportReason.IncompleteMission, label: "عدم إتمام المهمة" },
  { value: ReportReason.Unprofessional, label: "سلوك غير مهني" },
  { value: ReportReason.Other, label: "أخري" },
];
