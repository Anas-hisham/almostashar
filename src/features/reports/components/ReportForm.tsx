"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants";
import { getRequestError } from "@/lib/requestError";
import { useAppSelector } from "@/store/hooks";
import { documentsApi } from "@/features/documents/documentsApi";
import { reportsApi } from "@/features/reports/reportsApi";
import { REPORT_REASONS } from "@/features/reports/reportsOptions";
import { validateReport } from "@/features/reports/reportsSchemas";
import type { FieldErrors } from "@/features/auth/authSchemas";
import type { ReportReason } from "@/shared/types/enums";

import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormCard, { CloseButton } from "@/shared/components/ui/FormCard";
import { Field, FilePickerBox, SelectBox, TextAreaBox } from "@/shared/components/ui/form/FieldControls";

type ReportFormProps = { lawyerId: number; lawyerName: string };

/** "الإبلاغ عن ..." — report a lawyer (Figma "Frame 256"). */
export default function ReportForm({ lawyerId, lawyerName }: ReportFormProps) {
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);

  const [reason, setReason] = useState<ReportReason>(REPORT_REASONS[0].value);
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const { data, errors } = validateReport({ reason, details, files });
    setErrors(errors);
    if (!data) return;

    if (!user) {
      router.push(ROUTES.login);
      return;
    }

    setLoading(true);
    try {
      const uploaded = await Promise.all(files.map((file) => documentsApi.upload({ File: file })));

      await reportsApi.createReport({
        lawyerId,
        reason: data.reason,
        problemContent: data.details,
        messages: [],
        attachmentIds: uploaded.map((doc) => doc.id),
      });

      router.replace(ROUTES.lawyer(lawyerId));
    } catch (err) {
      setServerError(getRequestError(err, "تعذر إرسال البلاغ، حاول مرة أخري"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormCard className="px-[34px] pb-[24px] pt-6 max-sm:px-5">
      <CloseButton fallbackHref={ROUTES.lawyer(lawyerId)} className="top-[46px]" />

      <h1 className="flex min-h-[92px] items-end pb-[3px] text-[21px] font-bold leading-normal text-black">
        الإبلاغ عن {lawyerName}
      </h1>

      <form onSubmit={submit} noValidate className="mt-[49px] flex flex-col gap-[23px]">
        {serverError && <Alert title={serverError} />}

        <div className="flex flex-col gap-[18px]">
          <Field medium label="سبب البلاغ" htmlFor="reason" error={errors.reason}>
            <SelectBox
              id="reason"
              invalid={!!errors.reason}
              value={reason}
              onValueChange={(value) => setReason(value as ReportReason)}
              options={REPORT_REASONS}
            />
          </Field>

          <Field medium label="تفاصيل البلاغ" htmlFor="details" error={errors.details}>
            <TextAreaBox
              id="details"
              className="h-[149px] py-3"
              placeholder="اشرح ما حدث"
              invalid={!!errors.details}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Field>

          <Field medium label="أدلة: صور أو ملفات (اختياري)" htmlFor="files" error={errors.files}>
            <FilePickerBox id="files" files={files} onChange={setFiles} invalid={!!errors.files} />
          </Field>
        </div>

        <Button type="submit" size="field" loading={loading}>
          {loading ? "جاري الإرسال…" : "إرسال البلاغ"}
        </Button>
      </form>
    </FormCard>
  );
}
