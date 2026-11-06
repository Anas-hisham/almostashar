import { z } from "zod";

/* ---------- shared rules ---------- */

const emailSchema = z
  .string()
  .trim()
  .min(1, "اكتب البريد الالكتروني")
  .pipe(z.email("البريد الالكتروني غير صحيح"));

const passwordSchema = z
  .string()
  .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
  .regex(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف إنجليزي كبير")
  .regex(/\d/, "كلمة المرور يجب أن تحتوي علي أرقام");

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const imageFile = (requiredMessage: string) =>
  z
    .instanceof(File, { error: requiredMessage })
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), "اختر صورة بصيغة PNG أو JPG")
    .refine((file) => file.size <= MAX_IMAGE_BYTES, "حجم الصورة يجب ألا يزيد عن 5 ميجا");

const selectedId = (message: string) => z.number({ error: message }).positive(message);

/** Turns zod issues into { fieldName: firstMessage }. */
export type FieldErrors = Record<string, string>;

function validateWith<S extends z.ZodType>(schema: S, values: unknown) {
  const result = schema.safeParse(values);

  if (result.success) {
    return { data: result.data as z.output<S>, errors: {} as FieldErrors };
  }

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0]);
    if (!errors[field]) errors[field] = issue.message;
  }

  return { data: null, errors };
}

/* ---------- login ---------- */

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "اكتب كلمة المرور"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type LoginFieldErrors = Partial<Record<keyof LoginFormValues, string>>;

/** Validates the form and returns either clean data or the first message per field. */
export function validateLogin(values: unknown) {
  const result = loginSchema.safeParse(values);

  if (result.success) {
    return { data: result.data, errors: {} as LoginFieldErrors };
  }

  const { fieldErrors } = z.flattenError(result.error);
  const errors: LoginFieldErrors = {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  };

  return { data: null, errors };
}

/* ---------- register ---------- */

const accountFields = {
  firstName: z.string().trim().min(1, "اكتب الاسم الأول"),
  lastName: z.string().trim().min(1, "اكتب اسم العائلة"),
  email: emailSchema,
  password: passwordSchema,
  governorateId: selectedId("اختر المحافظة"),
  cityId: selectedId("اختر المدينة"),
};

const optionalAvatar = imageFile("").nullable();

export const registerClientSchema = z.object({
  ...accountFields,
  avatarPhoto: optionalAvatar,
  frontIdPhoto: imageFile("ارفع صورة البطاقة - الوجه الأمامي"),
  backIdPhoto: imageFile("ارفع صورة البطاقة - الوجه الخلفي"),
});

export const registerLawyerSchema = z.object({
  ...accountFields,
  phoneNo: z
    .string()
    .trim()
    .min(1, "اكتب رقم الجوال")
    .regex(/^\+?\d{10,15}$/, "رقم الجوال غير صحيح"),
  syndicateId: selectedId("اختر النقابة"),
  yearsOfExperience: z
    .string()
    .trim()
    .regex(/^\d{1,2}$/, "اكتب سنوات الخبرة بالأرقام"),
  specializationIds: z.array(z.number()).min(1, "اختر تخصصا واحدا علي الأقل"),
  ssnPhoto: imageFile("ارفع صورة الرقم القومي / الهوية"),
  syndicateCardPhoto: imageFile("ارفع صورة كارنيه النقابة"),
  practiceCertificatesPhoto: imageFile("ارفع شهادات مزاولة المهنة"),
  avatarPhoto: optionalAvatar,
});

export const validateRegisterClient = (values: unknown) => validateWith(registerClientSchema, values);
export const validateRegisterLawyer = (values: unknown) => validateWith(registerLawyerSchema, values);

/* ---------- forgot password ---------- */

export const OTP_LENGTH = 6;

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const verifyOtpSchema = z.object({
  otpCode: z.string().regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), "الرمز غير صحيح, حاول مرة اخري"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    error: "كلمتا المرور غير متطابقين",
  });

export const validateForgotPassword = (values: unknown) => validateWith(forgotPasswordSchema, values);
export const validateVerifyOtp = (values: unknown) => validateWith(verifyOtpSchema, values);
export const validateResetPassword = (values: unknown) => validateWith(resetPasswordSchema, values);
