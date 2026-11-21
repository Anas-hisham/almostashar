import { z } from "zod";
import { imageFile, validateWith } from "@/features/auth/authSchemas";

const optionalImage = imageFile("").nullable();

export const editLawyerProfileSchema = z.object({
  firstName: z.string().trim().min(1, "اكتب الاسم الأول"),
  lastName: z.string().trim().min(1, "اكتب اسم العائلة"),
  bio: z.string().trim().max(300, "النبذة يجب ألا تزيد عن 300 حرف"),
  about: z.string().trim(),
  yearsOfExperience: z.string().trim().regex(/^(\d{1,2})?$/, "اكتب سنوات الخبرة بالأرقام"),
  specializationIds: z.array(z.number()),
  profileImage: optionalImage,
  ssnPhoto: optionalImage,
  syndicateCardPhoto: optionalImage,
  practiceCertificatesPhoto: optionalImage,
});

export const validateEditLawyerProfile = (values: unknown) =>
  validateWith(editLawyerProfileSchema, values);
