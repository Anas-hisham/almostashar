"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants";
import { getRequestError } from "@/lib/requestError";
import { useAppSelector } from "@/store/hooks";
import { documentsApi } from "@/features/documents/documentsApi";
import { clientRequestsApi } from "@/features/clientRequests/clientRequestsApi";
import { validateBooking } from "@/features/clientRequests/clientRequestsSchemas";
import {
  buildDirectRequest,
  RESPONSE_METHODS,
  type ResponseMethod,
} from "@/features/clientRequests/clientRequestsOptions";
import type { FieldErrors } from "@/features/auth/authSchemas";
import type { LawyerProfile } from "@/features/lawyers/lawyersTypes";
import LawyerAvatar from "@/features/lawyers/components/LawyerAvatar";
import Price from "@/features/lawyers/components/Price";

import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormCard, { CloseButton } from "@/shared/components/ui/FormCard";
import { DateBox, Field, FilePickerBox, SelectBox, TextAreaBox } from "@/shared/components/ui/form/FieldControls";
import {
  LockFilledIcon,
  OfficeIcon,
  RadioOffIcon,
  RadioOnIcon,
  VideoIcon,
  WrittenReplyIcon,
} from "@/shared/components/ui/figmaIcons";

const METHOD_ICONS: Record<ResponseMethod, string> = {
  Video: "h-[23px] w-8",
  Office: "h-[25px] w-8",
  Text: "h-8 w-8",
};

function MethodIcon({ method }: { method: ResponseMethod }) {
  const className = `${METHOD_ICONS[method]} text-gold-light`;
  if (method === "Video") return <VideoIcon className={className} />;
  if (method === "Office") return <OfficeIcon className={className} />;
  return <WrittenReplyIcon className={className} />;
}

type BookingFormProps = {
  lawyer: LawyerProfile;
  initialServiceId?: number;
};

/** "طلب خدمة من ..." — the booking screen (Figma "Frame 270"). */
export default function BookingForm({ lawyer, initialServiceId }: BookingFormProps) {
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);

  const services = (lawyer.services ?? []).filter((s) => s.isActive !== false);
  const specialization = lawyer.specializations?.map((s) => s.arabicTitle).join("، ");

  const [serviceId, setServiceId] = useState<number | null>(
    () => services.find((s) => s.serviceId === initialServiceId)?.serviceId ?? null,
  );
  const [method, setMethod] = useState<ResponseMethod>("Video");
  const [summary, setSummary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const service = services.find((s) => s.serviceId === serviceId);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const { data, errors } = validateBooking({ serviceId, method, summary, deadline, files });
    setErrors(errors);
    if (!data || !service) return;

    if (!user) {
      router.push(ROUTES.login);
      return;
    }

    setLoading(true);
    try {
      const uploaded = await Promise.all(files.map((file) => documentsApi.upload({ File: file })));

      await clientRequestsApi.createDirectRequest(
        buildDirectRequest(lawyer, service.title, service.serviceId, {
          serviceId: service.serviceId,
          method,
          summary: data.summary,
          deadline: data.deadline,
          attachmentIds: uploaded.map((doc) => doc.id),
        }),
      );

      router.replace(ROUTES.clientRequests);
    } catch (err) {
      setServerError(getRequestError(err, "تعذر إرسال الطلب، حاول مرة أخري"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormCard className="px-[54px] pb-[28px] pt-[28px] max-sm:px-5">
      <CloseButton fallbackHref={ROUTES.lawyer(lawyer.id)} />

      <header className="flex items-center gap-5 border-b border-line pb-4 pt-0">
        <LawyerAvatar
          fullName={lawyer.fullName}
          image={lawyer.profileImage}
          className="size-[81px] text-[32px]"
        />
        <div className="flex min-w-0 flex-col leading-normal">
          <h1 className="text-[21px] font-bold text-black">طلب خدمة من {lawyer.fullName}</h1>
          {specialization && <p className="text-base font-medium text-black/60">{specialization}</p>}
        </div>
      </header>

      <form onSubmit={submit} noValidate className="mt-[16px] flex flex-col gap-[23px]">
        {serverError && <Alert title={serverError} />}

        <Field label="الخدمة المطلوبة" htmlFor="serviceId" error={errors.serviceId}>
          <SelectBox
            id="serviceId"
            placeholder="اختر الخدمة"
            invalid={!!errors.serviceId}
            value={serviceId ? String(serviceId) : ""}
            onValueChange={(value) => setServiceId(Number(value))}
            options={services.map((s) => ({ value: String(s.serviceId), label: s.title ?? "" }))}
          />
        </Field>

        <fieldset className="flex flex-col gap-[11px]">
          <legend className="mb-[11px] text-[21px] font-semibold leading-normal text-black">
            وسيلة الرد: كيف تفضّل أن يرد عليك المحامي؟
          </legend>

          <div className="grid grid-cols-3 gap-[21px] max-sm:gap-2">
            {RESPONSE_METHODS.map((option) => {
              const selected = option.value === method;
              return (
                <label
                  key={option.value}
                  className="flex h-[171px] cursor-pointer flex-col items-center justify-center gap-[28px] rounded-xl border border-line bg-surface has-[:focus-visible]:border-gold-light"
                >
                  <input
                    type="radio"
                    name="method"
                    value={option.value}
                    checked={selected}
                    onChange={() => setMethod(option.value)}
                    className="sr-only"
                  />
                  {selected ? (
                    <RadioOnIcon className="size-7 text-black" />
                  ) : (
                    <RadioOffIcon className="size-7 text-black" />
                  )}
                  <span className="flex flex-col items-center gap-[5px]">
                    <MethodIcon method={option.value} />
                    <span className="text-base font-bold leading-normal text-black">{option.label}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <Field label="نبذة مختصرة عن المشكلة" htmlFor="summary" error={errors.summary}>
          <TextAreaBox
            id="summary"
            className="h-[98px] py-5"
            placeholder="اشرح موجز الموضوع لمساعدة المحامي علي الاستعداد..."
            invalid={!!errors.summary}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Field>

        <div className="grid gap-[15px] sm:grid-cols-2">
          {/* RTL: the first column sits on the right → deadline first, attachments on the left (as in Figma) */}
          <Field label="الموعد النهائي" hint="(اختياري)" htmlFor="deadline" error={errors.deadline}>
            <DateBox
              id="deadline"
              value={deadline}
              onChange={setDeadline}
              min={new Date().toISOString().slice(0, 10)}
              invalid={!!errors.deadline}
            />
          </Field>
          <Field label="مرفقات" hint="(اختياري)" htmlFor="files" error={errors.files}>
            <FilePickerBox id="files" files={files} onChange={setFiles} invalid={!!errors.files} />
          </Field>
        </div>

        {service && (
          <div className="flex h-[79px] items-center justify-between rounded-[15px] border border-line bg-surface px-4 text-[21px] text-black">
            <span className="font-semibold">رسوم الخدمة</span>
            <Price amount={service.price} />
          </div>
        )}

        <Button type="submit" size="lg" loading={loading} className="gap-[10px]">
          <LockFilledIcon className="h-6 w-5 shrink-0 text-gold-light" />
          {loading ? "جاري الإرسال…" : "تأكيد الطلب والدفع الآمن"}
        </Button>
      </form>
    </FormCard>
  );
}
