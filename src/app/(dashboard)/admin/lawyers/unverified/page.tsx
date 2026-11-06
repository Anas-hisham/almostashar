"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { adminApi } from "@/features/admin/adminApi";
import type { UnverifiedLawyer } from "@/features/admin/adminTypes";
import { ensureToken } from "@/lib/session";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { ROUTES } from "@/constants";

import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import { CardGridSkeleton } from "@/shared/components/ui/Skeleton";

const LOAD_FAILED = "تعذر تحميل المحامين، حاول مرة أخري";

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString("ar-EG");
}

export default function UnverifiedLawyersPage() {
  const {
    run: loadLawyers,
    loading,
    error,
    clearError,
  } = useAsyncAction(adminApi.getUnverifiedLawyers);

  // null = not loaded yet. This avoids flashing "no requests" before the first fetch starts,
  // because `loading` from the hook is false on the very first render.
  const [lawyers, setLawyers] = useState<UnverifiedLawyer[] | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;

    ensureToken()
      .then(() => loadLawyers())
      .then((value: UnverifiedLawyer[]) => {
        if (alive) setLawyers(value);
      })
      .catch(() => {
        // useAsyncAction already keeps the error, nothing else to do here.
      });

    return () => {
      alive = false;
    };
    // `loadLawyers` is a new function on every render, so it must not be a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  function retry() {
    clearError();
    setLawyers(null);
    setReloadKey((key) => key + 1);
  }

  const showSkeleton = lawyers === null && !error;

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-black">طلبات توثيق المحامين</h1>
        <p className="text-base text-muted">
          راجع بيانات ومستندات المحامين الجدد ثم اقبل الطلب أو ارفضه.
        </p>
      </header>

      {showSkeleton && <CardGridSkeleton />}

      {error && (
        <div className="flex max-w-md flex-col gap-3">
          <Alert title={LOAD_FAILED} />
          <Button variant="outline" onClick={retry} loading={loading}>
            إعادة المحاولة
          </Button>
        </div>
      )}

      {!error && lawyers?.length === 0 && (
        <p className="rounded-xl border-2 border-line bg-surface p-6 text-center text-muted">
          لا توجد طلبات توثيق بانتظار المراجعة
        </p>
      )}

      {!error && lawyers && lawyers.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lawyers.map((lawyer) => {
            const createdAt = formatDate(lawyer.createdAt);

            return (
              <li
                key={lawyer.id}
                className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-white p-5"
              >
                <div>
                  <h2 className="text-lg font-bold text-black">
                    {lawyer.fullName}
                  </h2>
                  <p dir="ltr" className="text-start text-base text-muted">
                    {lawyer.email}
                  </p>
                </div>

                <dl className="flex flex-col gap-1 text-sm text-black">
                  {lawyer.phoneNo && (
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted">رقم الجوال</dt>
                      <dd dir="ltr">{lawyer.phoneNo}</dd>
                    </div>
                  )}
                  {lawyer.yearsOfExperience != null && (
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted">سنوات الخبرة</dt>
                      <dd>{lawyer.yearsOfExperience}</dd>
                    </div>
                  )}
                  {createdAt && (
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted">تاريخ الطلب</dt>
                      <dd>{createdAt}</dd>
                    </div>
                  )}
                </dl>

                <Link
                  href={ROUTES.adminLawyer(lawyer.id)}
                  className="mt-auto flex h-11 items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90"
                >
                  مراجعة الطلب
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}