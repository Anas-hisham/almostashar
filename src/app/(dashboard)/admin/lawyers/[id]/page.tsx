"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { adminApi } from "@/features/admin/adminApi";
import {
  validateRejectLawyer,
  type RejectLawyerFieldErrors,
} from "@/features/admin/adminSchemas";
import type { LawyerDetails } from "@/features/admin/adminTypes";
import { ensureToken } from "@/lib/session";
import { getRequestError } from "@/lib/requestError";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { API_BASE_URL, ROUTES } from "@/constants";

import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import FormField from "@/shared/components/ui/form/FormField";
import { LawyerDetailSkeleton } from "@/shared/components/ui/Skeleton";

const LOAD_FAILED = "تعذر تحميل بيانات المحامي، حاول مرة أخري";
const VERIFY_FAILED = "تعذر حفظ القرار، حاول مرة أخري";
const INVALID_ID = "رقم المحامي غير صحيح";

/** Documents may come back as a full URL or as a path on the API server. */
function toAbsoluteUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function Row({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-base font-semibold text-black">{value}</dd>
    </div>
  );
}

export default function LawyerDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const lawyerId = Number(params.id);
  const invalidId = !Number.isInteger(lawyerId) || lawyerId <= 0;

  const { run: verify, loading: saving } = useAsyncAction(
    adminApi.verifyLawyer,
  );

  const [lawyer, setLawyer] = useState<LawyerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonErrors, setReasonErrors] = useState<RejectLawyerFieldErrors>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (invalidId) return;
    let alive = true;

    ensureToken()
      .then(() => adminApi.getLawyerById(lawyerId))
      .then((value) => {
        if (alive) setLawyer(value);
      })
      .catch((err: unknown) => {
        if (alive) setLoadError(getRequestError(err, LOAD_FAILED));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [lawyerId, invalidId]);

  async function submitDecision(isAccepted: boolean, rejectionReason?: string) {
    setSubmitError("");

    try {
      await verify({ lawyerId, isAccepted, rejectionReason });
      router.push(ROUTES.adminUnverifiedLawyers);
    } catch (err) {
      setSubmitError(getRequestError(err, VERIFY_FAILED));
    }
  }

  function handleReasonChange(value: string) {
    setReason(value);
    setReasonErrors({});
    setSubmitError("");
  }

  function submitRejection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, errors } = validateRejectLawyer({ rejectionReason: reason });
    if (!data) return setReasonErrors(errors);

    void submitDecision(false, data.rejectionReason);
  }

  const backLink = (
    <Link
      href={ROUTES.adminUnverifiedLawyers}
      className="text-base font-semibold text-subtle"
    >
      ← العودة إلى الطلبات
    </Link>
  );

  if (invalidId) {
    return (
      <section className="flex max-w-md flex-col gap-4">
        <Alert title={INVALID_ID} />
        {backLink}
      </section>
    );
  }

  if (loading) return <LawyerDetailSkeleton />;

  if (loadError || !lawyer) {
    return (
      <section className="flex max-w-md flex-col gap-4">
        <Alert title={loadError || LOAD_FAILED} />
        {backLink}
      </section>
    );
  }

  const documents = [
    { label: "صورة البطاقة الشخصية", url: lawyer.ssnPhoto },
    { label: "كارنيه النقابة", url: lawyer.syndicateCardPhoto },
    { label: "شهادة مزاولة المهنة", url: lawyer.practiceCertificatesPhoto },
  ].filter((doc): doc is { label: string; url: string } => !!doc.url);

  const specializations =
    lawyer.specializations
      ?.map((specialization) => specialization.arabicTitle)
      .filter(Boolean)
      .join("، ") || null;
  return (
    <section className="flex max-w-4xl flex-col gap-6">
      {backLink}

      <header className="flex items-center gap-4">
        {lawyer.avatarPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={toAbsoluteUrl(lawyer.avatarPhoto)}
            alt=""
            className="size-20 rounded-full border-2 border-line object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-black">{lawyer.fullName}</h1>
          <p dir="ltr" className="text-start text-base text-muted">
            {lawyer.email}
          </p>
        </div>
      </header>

      <dl className="grid gap-4 rounded-2xl border-2 border-line bg-white p-5 sm:grid-cols-2">
        <Row label="رقم الجوال" value={lawyer.phoneNo} />
        <Row label="سنوات الخبرة" value={lawyer.yearsOfExperience} />
        <Row label="المحافظة" value={lawyer.governorate} />
        <Row label="المدينة" value={lawyer.city} />
        <Row label="النقابة" value={lawyer.syndicate} />
        <Row label="التخصصات" value={specializations} />
        <Row label="حالة الحساب" value={lawyer.accountStatus} />
      </dl>

      {documents.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-black">المستندات</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {documents.map((doc) => (
              <li key={doc.label} className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-black">
                  {doc.label}
                </span>
                <a
                  href={toAbsoluteUrl(doc.url)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={toAbsoluteUrl(doc.url)}
                    alt={doc.label}
                    className="h-40 w-full rounded-xl border-2 border-line object-cover"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5">
        <h2 className="text-lg font-bold text-black">قرار التوثيق</h2>

        {submitError && <Alert title={submitError} />}

        {!rejecting ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button loading={saving} onClick={() => void submitDecision(true)}>
              {saving ? "جاري الحفظ…" : "قبول وتوثيق المحامي"}
            </Button>
            <Button
              variant="outline"
              disabled={saving}
              onClick={() => setRejecting(true)}
            >
              رفض الطلب
            </Button>
          </div>
        ) : (
          <form
            onSubmit={submitRejection}
            noValidate
            className="flex flex-col gap-4"
          >
            <FormField
              label="سبب الرفض"
              htmlFor="rejectionReason"
              helper="سيظهر هذا السبب للمحامي"
              error={reasonErrors.rejectionReason}
            >
              <textarea
                id="rejectionReason"
                rows={4}
                placeholder="اكتب سبب رفض الطلب، مثال: صورة كارنيه النقابة غير واضحة"
                value={reason}
                disabled={saving}
                aria-invalid={reasonErrors.rejectionReason ? true : undefined}
                onChange={(e) => handleReasonChange(e.target.value)}
                className={`w-full rounded-xl border-2 bg-white p-4 text-base text-black outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] disabled:opacity-60 ${
                  reasonErrors.rejectionReason
                    ? "border-danger-border"
                    : "border-line"
                }`}
              />
            </FormField>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" loading={saving}>
                {saving ? "جاري الحفظ…" : "تأكيد الرفض"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => {
                  setRejecting(false);
                  handleReasonChange("");
                }}
              >
                إلغاء
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
