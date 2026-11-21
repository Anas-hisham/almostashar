import { z } from "zod";
import { validateWith } from "@/features/auth/authSchemas";
import { attachmentFiles } from "@/features/clientRequests/clientRequestsSchemas";
import { ReportReason } from "@/shared/types/enums";

export const reportSchema = z.object({
  reason: z.enum(ReportReason, { error: "اختر سبب البلاغ" }),
  details: z.string().trim().min(10, "اشرح ما حدث (10 أحرف علي الأقل)"),
  files: attachmentFiles,
});

export const validateReport = (values: unknown) => validateWith(reportSchema, values);
