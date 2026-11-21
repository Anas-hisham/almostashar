import { z } from "zod";
import { imageFile, passwordSchema, validateWith } from "@/features/auth/authSchemas";

export const editProfileSchema = z.object({
  firstName: z.string().trim().min(1, "اكتب الاسم الأول"),
  lastName: z.string().trim().min(1, "اكتب اسم العائلة"),
  profileImage: imageFile("").nullable(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "اكتب كلمة المرور الحالية"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    error: "كلمتا المرور غير متطابقين",
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    path: ["newPassword"],
    error: "كلمة المرور الجديدة يجب أن تختلف عن الحالية",
  });

export const validateEditProfile = (values: unknown) => validateWith(editProfileSchema, values);
export const validateChangePassword = (values: unknown) => validateWith(changePasswordSchema, values);
