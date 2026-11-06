import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { AdminRefundPaymentRequest } from "@/features/payments/paymentsTypes";

const { PAYMENTS } = API_ENDPOINTS;

/**
 * To START a payment use `clientRequestsApi.payInvoice` (features/clientRequests).
 * POST /api/Payments/paymob-webhook is called by Paymob's servers, so it is not here.
 */
export const paymentsApi = {
  /** Admin: refund a payment (fully or partly). */
  adminRefundPayment: async (paymentId: number, body: AdminRefundPaymentRequest): Promise<void> => {
    await api.post(PAYMENTS.ADMIN_REFUND(paymentId), body);
  },

  /**
   * Where Paymob sends the browser after the client pays. Normally the browser lands on this URL
   * by itself; call it only if your "payment finished" page needs to ask the backend for the result.
   * Pass along the query values Paymob appended to your page URL.
   */
  getFinishedPayment: async (query: Record<string, string> = {}): Promise<unknown> => {
    const { data } = await api.get<unknown>(PAYMENTS.FINISHED, { params: query });
    return data;
  },

  /** DEVELOPMENT ONLY: marks an invoice as paid without going through Paymob. */
  simulateInvoicePaid: async (invoiceId: number): Promise<void> => {
    await api.post(PAYMENTS.SIMULATE_PAID(invoiceId));
  },
};
