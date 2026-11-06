/* ---------- responses (best guess, see note in casesTypes) ----------
 * Swagger has no enum for the escrow status, so it is a plain string here.
 */
export interface Escrow {
  id: number;
  requestId?: number | null;
  caseId?: number | null;
  clientName?: string | null;
  lawyerName?: string | null;
  amount: number;
  status: string;
  createdAt?: string | null;
}
