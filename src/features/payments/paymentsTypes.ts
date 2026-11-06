/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface AdminRefundPaymentRequest {
  /** Leave empty to refund the full amount (confirm with the backend). */
  refundedAmount?: number;
  reason?: string;
}
