"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";

import { lawyersApi } from "@/features/lawyers/lawyersApi";
import { useMyLawyerProfile } from "@/features/lawyers/hooks/useMyLawyerProfile";
import { validateEditLawyerProfile } from "@/features/lawyers/lawyersSchemas";
import { lookupsApi } from "@/features/lookups/lookupsApi";
import { updateUser } from "@/features/auth/authSlice";
import type { FieldErrors } from "@/features/auth/authSchemas";
import SpecializationPicker from "@/features/auth/components/register/SpecializationPicker";
import { ProfileScreen, ScreenHeader } from "@/features/client/components/ProfileScreen";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ROUTES } from "@/constants";
import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import FileUpload from "@/shared/components/ui/form/FileUpload";
import Input from "@/shared/components/ui/form/Input";
import type { SelectOption } from "@/shared/components/ui/form/Select";
import UserAvatar from "@/shared/components/ui/UserAvatar";

const FAILED = "تعذر حفظ التغييرات، حاول مرة أخري";
const textareaClass =
  "w-full rounded-xl border-2 border-line bg-surface p-4 text-base text-black outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]";

export default function EditLawyerProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const { profile } = useMyLawyerProfile();
  const { run, loading } = useAsyncAction(lawyersApi.editProfile);
  const fileRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [years, setYears] = useState("");
  const [specIds, setSpecIds] = useState<number[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ssn, setSsn] = useState<File | null>(null);
  const [card, setCard] = useState<File | null>(null);
  const [cert, setCert] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    lookupsApi
      .getSpecializations()
      .then((list) => setOptions(list.map((s) => ({ value: s.id, label: s.arabicTitle }))))
      .catch(() => {});
  }, []);

  // fill the form with what the backend has
  useEffect(() => {
    if (!profile) return;
    setBio(profile.bio ?? "");
    setAbout(profile.about ?? "");
    setYears(profile.yearsOfExperience != null ? String(profile.yearsOfExperience) : "");
    setSpecIds(profile.specializations?.map((s) => s.id) ?? []);
  }, [profile]);

  useEffect(() => {
    if (!image) return setPreview(null);
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateEditLawyerProfile({
      firstName,
      lastName,
      bio,
      about,
      yearsOfExperience: years,
      specializationIds: specIds,
      profileImage: image,
      ssnPhoto: ssn,
      syndicateCardPhoto: card,
      practiceCertificatesPhoto: cert,
    });
    if (!data) return setErrors(errors);

    const sendsDocuments = !!(data.ssnPhoto || data.syndicateCardPhoto || data.practiceCertificatesPhoto);

    try {
      await run({
        FirstName: data.firstName,
        LastName: data.lastName,
        Bio: data.bio,
        About: data.about,
        ...(data.yearsOfExperience ? { YearsOfExperience: Number(data.yearsOfExperience) } : {}),
        ...(data.specializationIds.length ? { SpecializationIds: data.specializationIds } : {}),
        ...(data.profileImage ? { ProfileImage: data.profileImage } : {}),
        ...(data.ssnPhoto ? { SSNPhoto: data.ssnPhoto } : {}),
        ...(data.syndicateCardPhoto ? { SyndicateCardPhoto: data.syndicateCardPhoto } : {}),
        ...(data.practiceCertificatesPhoto ? { PracticeCertificatesPhoto: data.practiceCertificatesPhoto } : {}),
        // new documents go back to admin review
        ...(sendsDocuments ? { ResubmitForReview: true } : {}),
      });

      // read back what the database now has, so the Navbar updates too
      if (user) {
        const fresh = await lawyersApi.getLawyerProfile(user.id);
        dispatch(
          updateUser({
            firstName: data.firstName,
            lastName: data.lastName,
            ...(fresh.profileImage ? { profileImage: fresh.profileImage } : {}),
          }),
        );
      }
      router.push(ROUTES.lawyerProfile);
    } catch (error) {
      setServerError(getRequestError(error, FAILED));
    }
  }

  return (
    <ProfileScreen>
      <ScreenHeader title="المعلومات الشخصية" backHref={ROUTES.lawyerProfile} />

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
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>
        {errors.profileImage && <p className="text-sm font-semibold text-danger">{errors.profileImage}</p>}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="الاسم الأول" htmlFor="firstName" error={errors.firstName}>
            <Input id="firstName" value={firstName} invalid={!!errors.firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormField>
          <FormField label="اسم العائلة" htmlFor="lastName" error={errors.lastName}>
            <Input id="lastName" value={lastName} invalid={!!errors.lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormField>
        </div>

        <FormField label="سنوات الخبرة" htmlFor="years" error={errors.yearsOfExperience}>
          <Input id="years" inputMode="numeric" dir="ltr" value={years} invalid={!!errors.yearsOfExperience} onChange={(e) => setYears(e.target.value)} />
        </FormField>

        <FormField label="نبذة قصيرة" htmlFor="bio" error={errors.bio}>
          <textarea id="bio" rows={2} className={textareaClass} value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormField>

        <FormField label="عن المحامي" htmlFor="about" error={errors.about}>
          <textarea id="about" rows={5} className={textareaClass} value={about} onChange={(e) => setAbout(e.target.value)} />
        </FormField>

        <SpecializationPicker options={options} value={specIds} onChange={setSpecIds} />

        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-muted">
            لتحديث المستندات ارفع الملفات الجديدة وسيتم إرسال حسابك للمراجعة مرة أخري.
          </p>
          <FileUpload id="ssn" label="صورة الرقم القومي / الهوية" optional file={ssn} onChange={setSsn} error={errors.ssnPhoto} />
          <FileUpload id="card" label="كارنيه النقابة" optional file={card} onChange={setCard} error={errors.syndicateCardPhoto} />
          <FileUpload id="cert" label="شهادات مزاولة المهنة" optional file={cert} onChange={setCert} error={errors.practiceCertificatesPhoto} />
        </div>

        <Button type="submit" loading={loading}>
          حفظ التغييرات
        </Button>
      </form>
    </ProfileScreen>
  );
}
