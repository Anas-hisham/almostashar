/**
 * Skeleton loaders — Tailwind only (no extra dependency).
 * Colors come from the project tokens (bg-line / bg-surface / border-line).
 *
 * Usage:
 *   {loading && <CardGridSkeleton />}
 *   if (loading) return <LawyerDetailSkeleton />;
 */

type BoxProps = { className?: string };

/** Base block. Size/shape it with className: <Skeleton className="h-4 w-32" /> */
export function Skeleton({ className = "" }: BoxProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-line/70 ${className}`}
    />
  );
}

/** Wrapper that announces the loading state to screen readers. */
function Busy({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">جاري التحميل…</span>
      {children}
    </div>
  );
}

/** N text lines; the last one is shorter, like a real paragraph. */
export function TextSkeleton({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <Busy className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </Busy>
  );
}

/** Single card — same shape as the lawyer cards in the unverified list. */
function LawyerCardSkeleton() {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-white p-5">
      <Skeleton className="h-6 w-1/2" />
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-2 h-11 w-full rounded-xl" />
    </li>
  );
}

/** Grid of cards (admin/lawyers/unverified). */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Busy>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <LawyerCardSkeleton key={i} />
        ))}
      </ul>
    </Busy>
  );
}

/** Table-like list: header row + N rows (users, cases, offers ...). */
export function TableSkeleton({
  rows = 6,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <Busy className="overflow-hidden rounded-2xl border-2 border-line bg-white">
      <div className="flex gap-4 border-b-2 border-line bg-surface p-4">
        {Array.from({ length: cols }, (_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div
          key={r}
          className="flex items-center gap-4 border-b border-line p-4 last:border-b-0"
        >
          {Array.from({ length: cols }, (_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </Busy>
  );
}

/** Placeholder for the raw <pre> JSON blocks used by the stub pages. */
export function JsonSkeleton() {
  return (
    <Busy className="flex flex-col gap-2 rounded-lg border bg-slate-50 p-4">
      {["w-1/4", "w-1/2", "w-2/5", "w-3/5", "w-1/3", "w-1/2", "w-1/5"].map(
        (w, i) => (
          <Skeleton key={i} className={`h-4 ${w}`} />
        ),
      )}
    </Busy>
  );
}

/** Profile page: avatar + name + info card (public lawyer profile, case details, chat). */
export function ProfileSkeleton() {
  return (
    <Busy className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="grid gap-4 rounded-2xl border-2 border-line bg-white p-5 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </Busy>
  );
}

/** Admin lawyer review page: back link + header + info + 3 documents + decision box. */
export function LawyerDetailSkeleton() {
  return (
    <Busy className="flex max-w-4xl flex-col gap-6">
      <Skeleton className="h-5 w-36" />
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
      <div className="grid gap-4 rounded-2xl border-2 border-line bg-white p-5 sm:grid-cols-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex justify-between gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-6 w-24" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-[52px] w-full rounded-xl" />
        <Skeleton className="h-[52px] w-full rounded-xl" />
      </div>
    </Busy>
  );
}
