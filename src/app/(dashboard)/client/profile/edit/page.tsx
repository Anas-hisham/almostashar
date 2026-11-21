"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Info } from "lucide-react";

import { clientApi } from "@/features/client/clientApi";
import { useClientProfile } from "@/features/client/hooks/useClientProfile";
import { validateEditProfile } from "@/features/client/clientSchemas";
import { ProfileScreen, ScreenHeader } from "@/features/client/components/ProfileScreen";
import type { FieldErrors } from "@/features/auth/authSchemas";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { ROUTES } from "@/constants";
import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import Input from "@/shared/components/ui/form/Input";
import { useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/features/auth/authSlice";
import UserAvatar from "@/shared/components/ui/UserAvatar";

const FAILED = "تعذر حفظ التغييرات، حاول مرة أخري";

export default function EditProfilePage() {
  const router = useRouter();
  const { profile } = useClientProfile();
  const { run, loading } = useAsyncAction(clientApi.updateProfile);
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  // fill the form once the profile arrives
  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
  }, [profile]);

  // local preview of the picked photo
  useEffect(() => {
    if (!image) return setPreview(null);
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateEditProfile({ firstName, lastName, profileImage: image });
    if (!data) return setErrors(errors);

    try {
      await run({
        FirstName: data.firstName,
        LastName: data.lastName,
        ...(data.profileImage ? { ProfileImage: data.profileImage } : {}),
      });
      // read back what the database now has, so the Navbar updates too
      const fresh = await clientApi.getProfile();
      dispatch(
        updateUser({
          firstName: fresh.firstName,
          lastName: fresh.lastName,
          ...(fresh.profileImage ? { profileImage: fresh.profileImage } : {}),
        }),
      );
      router.push(ROUTES.clientProfile);
    } catch (error) {
      setServerError(getRequestError(error, FAILED));
    }
  }

  return (
    <ProfileScreen>
      <ScreenHeader title="المعلومات الشخصية" backHref={ROUTES.clientProfile} />

      <form onSubmit={submit} noValidate className="flex flex-col gap-6 rounded-[1.25rem] bg-white p-5 sm:p-6">
        {serverError && <Alert title={serverError} />}

        <div className="relative size-28 self-start">
          <div className="size-full overflow-hidden rounded-full bg-brand">
            <UserAvatar src={preview ?? profile?.profileImage} alt="الصورة الشخصية" />
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="تغيير الصورة"
            className="absolute -bottom-1 start-0 flex size-10 items-center justify-center rounded-full bg-white text-brand shadow"
          >
            <Camera className="size-5" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={(e) => {
              setImage(e.target.files?.[0] ?? null);
              setErrors((prev) => ({ ...prev, profileImage: "" }));
            }}
          />
        </div>
        {errors.profileImage && <p className="text-sm font-semibold text-danger">{errors.profileImage}</p>}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="الاسم الأول" htmlFor="firstName" error={errors.firstName}>
            <Input
              id="firstName"
              value={firstName}
              invalid={!!errors.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormField>
          <FormField label="اسم العائلة" htmlFor="lastName" error={errors.lastName}>
            <Input
              id="lastName"
              value={lastName}
              invalid={!!errors.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormField>
        </div>

        <div className="flex flex-col gap-2">
          <FormField label="البريد الإلكتروني" htmlFor="email">
            <Input id="email" dir="ltr" value={profile?.email ?? ""} disabled readOnly />
          </FormField>
          <p className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Info className="size-4 shrink-0" />
            يمكنك تعديل الاسم والصورة فقط. البريد الإلكتروني لا يعدل من هنا.
          </p>
        </div>

        <Button type="submit" loading={loading}>
          حفظ التغييرات
        </Button>
      </form>
    </ProfileScreen>
  );
}
