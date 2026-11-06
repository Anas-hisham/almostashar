import { z } from "zod";

export const MIN_REJECTION_REASON = 5;

export const rejectLawyerSchema = z.object({
  rejectionReason: z
    .string()
    .trim()
    .min(1, "اكتب سبب الرفض")
    .min(MIN_REJECTION_REASON, "وضح سبب الرفض بشكل أكثر"),
});

export type RejectLawyerFieldErrors = Partial<
  Record<keyof z.infer<typeof rejectLawyerSchema>, string>
>;

/** Validates the rejection form and returns either clean data or the first message per field. */
export function validateRejectLawyer(values: unknown) {
  const result = rejectLawyerSchema.safeParse(values);

  if (result.success) {
    return { data: result.data, errors: {} as RejectLawyerFieldErrors };
  }

  const { fieldErrors } = z.flattenError(result.error);
  const errors: RejectLawyerFieldErrors = {
    rejectionReason: fieldErrors.rejectionReason?.[0],
  };

  return { data: null, errors };
}
