"use client";

import { useCallback, useEffect, useState } from "react";

import { adminApi } from "@/features/admin/adminApi";
import type {
  AccountStatus,
  AdminUser,
  UserRole,
} from "@/features/admin/adminTypes";
import { ensureToken } from "@/lib/session";
import { getRequestError } from "@/lib/requestError";

import Alert from "@/shared/components/ui/feedback/Alert";
import Button from "@/shared/components/ui/Button";
import { TableSkeleton } from "@/shared/components/ui/Skeleton";

const PAGE_SIZE = 20;
const LOAD_FAILED = "تعذر تحميل المستخدمين، حاول مرة أخري";

const ROLE_LABELS: Record<UserRole, string> = {
  Client: "عميل",
  Lawyer: "محامي",
  Admin: "مدير",
};

const STATUS_LABELS: Record<AccountStatus, string> = {
  Active: "نشط",
  PendingReview: "بانتظار المراجعة",
  EmailVerificationRequired: "بانتظار تأكيد البريد",
  Suspended: "موقوف",
};

const fieldClass =
  "h-11 rounded-xl border-2 border-line bg-white px-3 text-base text-black outline-none focus:border-[#C5A059]";

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("ar-EG");
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [cursor, setCursor] = useState<{ id?: number; date?: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [accountStatus, setAccountStatus] = useState<AccountStatus | "">("");

  const fetchPage = useCallback(
    async (after?: { id?: number; date?: string }) => {
      await ensureToken();
      const page = await adminApi.getUsers({
        pageSize: PAGE_SIZE,
        search: search || undefined,
        role: role || undefined,
        accountStatus: accountStatus || undefined,
        cursor: after?.id,
        cursorDate: after?.date,
      });

      const items = Array.isArray(page?.items) ? page.items : [];
      const next =
        page?.nextCursor != null
          ? {
              id: page.nextCursor,
              date: page.nextCursorDate ?? undefined,
            }
          : null;

      return { items, next };
    },
    [search, role, accountStatus],
  );

  // (re)load the first page whenever a filter changes
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");

    fetchPage()
      .then(({ items, next }) => {
        if (!alive) return;
        setUsers(items);
        setCursor(next);
      })
      .catch((err: unknown) => {
        if (alive) setError(getRequestError(err, LOAD_FAILED));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [fetchPage]);

  async function loadMore() {
    if (!cursor) return;
    setLoadingMore(true);
    setError("");

    try {
      const { items, next } = await fetchPage(cursor);
      setUsers((current) => [...current, ...items]);
      setCursor(next);
    } catch (err) {
      setError(getRequestError(err, LOAD_FAILED));
    } finally {
      setLoadingMore(false);
    }
  }

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-black">إدارة المستخدمين</h1>
        <p className="text-base text-muted">
          ابحث في حسابات المستخدمين وراجع الدور وحالة الحساب.
        </p>
      </header>

      <div className="flex flex-col gap-3 md:flex-row">
        <form onSubmit={submitSearch} className="flex flex-1 gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="ابحث بالاسم أو البريد الإلكتروني"
            className={`${fieldClass} min-w-0 flex-1`}
          />
          <button
            type="submit"
            className="h-11 rounded-xl bg-brand px-5 text-base font-bold text-white hover:opacity-90"
          >
            بحث
          </button>
        </form>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole | "")}
          aria-label="الدور"
          className={fieldClass}
        >
          <option value="">كل الأدوار</option>
          {(Object.keys(ROLE_LABELS) as UserRole[]).map((key) => (
            <option key={key} value={key}>
              {ROLE_LABELS[key]}
            </option>
          ))}
        </select>

        <select
          value={accountStatus}
          onChange={(e) =>
            setAccountStatus(e.target.value as AccountStatus | "")
          }
          aria-label="حالة الحساب"
          className={fieldClass}
        >
          <option value="">كل الحالات</option>
          {(Object.keys(STATUS_LABELS) as AccountStatus[]).map((key) => (
            <option key={key} value={key}>
              {STATUS_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      {loading && <TableSkeleton rows={6} cols={5} />}

      {error && (
        <div className="max-w-md">
          <Alert title={error} />
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="rounded-xl border-2 border-line bg-surface p-6 text-center text-muted">
          لا يوجد مستخدمون مطابقون
        </p>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border-2 border-line bg-white">
          <table className="w-full min-w-[640px] text-start text-sm">
            <thead className="border-b-2 border-line bg-surface text-muted">
              <tr>
                <th className="p-3 text-start font-semibold">الاسم</th>
                <th className="p-3 text-start font-semibold">البريد</th>
                <th className="p-3 text-start font-semibold">الدور</th>
                <th className="p-3 text-start font-semibold">الحالة</th>
                <th className="p-3 text-start font-semibold">تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="p-3 font-semibold text-black">
                    {`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
                      "—"}
                  </td>
                  <td dir="ltr" className="p-3 text-start text-muted">
                    {user.email}
                  </td>
                  <td className="p-3">
                    {ROLE_LABELS[user.role] ?? user.role}
                  </td>
                  <td className="p-3">
                    {STATUS_LABELS[user.accountStatus] ?? user.accountStatus}
                  </td>
                  <td className="p-3">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cursor && !loading && (
        <div className="max-w-xs">
          <Button
            variant="outline"
            loading={loadingMore}
            onClick={() => void loadMore()}
          >
            {loadingMore ? "جاري التحميل…" : "عرض المزيد"}
          </Button>
        </div>
      )}
    </section>
  );
}
