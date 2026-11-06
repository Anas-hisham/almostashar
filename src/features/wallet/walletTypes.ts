import type { WithdrawalMethod } from "@/shared/types/enums";

/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface RequestWithdrawalRequest {
  amount: number;
  method: WithdrawalMethod;
  /** Bank account / wallet number the money should go to. */
  accountDetails?: string;
}

/** Query string of the wallet lists (transactions, withdrawals). */
export interface WalletListParams {
  cursor?: number;
  pageSize?: number;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface Wallet {
  balance: number;
  pendingBalance?: number;
  totalEarned?: number;
  currency?: string;
}

export interface WalletTransaction {
  id: number;
  amount: number;
  type?: string | null;
  description?: string | null;
  createdAt?: string | null;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface WalletTransactionsPage {
  items: WalletTransaction[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
