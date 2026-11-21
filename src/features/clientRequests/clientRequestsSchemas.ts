import { z } from "zod";
import { validateWith } from "@/features/auth/authSchemas";
import { RESPONSE_METHODS } from "@/features/clientRequests/clientRequestsOptions";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** Evidence / attachments picker, shared by the booking and report forms. */
export const attachmentFiles = z
  .array(z.instanceof(File))
  .max(MAX_FILES, `يمكنك رفع ${MAX_FILES} ملفات كحد أقصي`)
  .refine((files) => files.every((f) => f.size <= MAX_FILE_BYTES), "حجم الملف يجب ألا يزيد عن 10 ميجا");

export const bookingSchema = z.object({
  serviceId: z.number({ error: "اختر الخدمة المطلوبة" }).positive("اختر الخدمة المطلوبة"),
  method: z.enum(RESPONSE_METHODS.map((m) => m.value) as [string, ...string[]]),
  summary: z.string().trim().min(10, "اكتب نبذة مختصرة عن المشكلة (10 أحرف علي الأقل)"),
  deadline: z
    .string()
    .refine((value) => !value || new Date(value).getTime() >= new Date().setHours(0, 0, 0, 0), "اختر موعدا لم يفت"),
  files: attachmentFiles,
});

export const validateBooking = (values: unknown) => validateWith(bookingSchema, values);
