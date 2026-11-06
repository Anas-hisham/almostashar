import type { WithdrawalMethod, WithdrawalStatus } from "@/shared/types/enums";

/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface ApproveWithdrawalRequest {
  adminNotes?: string;
}

export interface RejectWithdrawalRequest {
  rejectionReason: string;
  adminNotes?: string;
}

/** Admin transferred the money outside the app and records how. */
export interface MarkWithdrawalPaidRequest {
  payoutReference?: string;
  payoutProvider?: string;
  adminNotes?: string;
}

/** Query string of GET /api/admin/withdrawals. */
export interface GetWithdrawalsParams {
  status?: WithdrawalStatus;
  cursor?: number;
  pageSize?: number;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

/** Shared with the lawyer wallet (features/wallet). */
export interface Withdrawal {
  id: number;
  lawyerId?: number;
  lawyerName?: string | null;
  amount: number;
  method: WithdrawalMethod;
  accountDetails?: string | null;
  status: WithdrawalStatus;
  rejectionReason?: string | null;
  adminNotes?: string | null;
  payoutReference?: string | null;
  payoutProvider?: string | null;
  createdAt?: string | null;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface WithdrawalsPage {
  items: Withdrawal[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
