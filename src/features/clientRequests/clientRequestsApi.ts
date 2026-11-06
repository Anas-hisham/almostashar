import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { LawyerSummary } from "@/features/lawyers/lawyersTypes";
import type { ClientRequest, ClientRequestsPage, CreateBroadcastRequest, CreateDirectRequest, GetClientRequestsParams, GetOffersParams, LawyersByServiceParams, OffersPage, PayInvoiceResult, RequestOffer } from "@/features/clientRequests/clientRequestsTypes";

const { CLIENT_REQUESTS } = API_ENDPOINTS;

export const clientRequestsApi = {
  createDirectRequest: async (body: CreateDirectRequest): Promise<void> => {
    await api.post(CLIENT_REQUESTS.CREATE_DIRECT, body);
  },

  createBroadcastRequest: async (body: CreateBroadcastRequest): Promise<void> => {
    await api.post(CLIENT_REQUESTS.CREATE_BROADCAST, body);
  },

  getRequests: async (params: GetClientRequestsParams = {}): Promise<ClientRequestsPage> => {
    const { data } = await api.get<ApiResponse<ClientRequestsPage>>(CLIENT_REQUESTS.ROOT, {
      params,
    });
    return data.value;
  },

  cancelRequest: async (id: number): Promise<void> => {
    await api.put(CLIENT_REQUESTS.CANCEL(id));
  },

  /** Lawyers who offer a service, optionally narrowed to a place (used to pick a lawyer for a direct request). */
  getLawyersByService: async (
    serviceId: number,
    params: LawyersByServiceParams = {},
  ): Promise<LawyerSummary[]> => {
    const { data } = await api.get<ApiResponse<LawyerSummary[]>>(
      CLIENT_REQUESTS.LAWYERS_BY_SERVICE(serviceId),
      { params },
    );
    return data.value;
  },

  /* ----- offers on a broadcast request ----- */

  getOffers: async (params: GetOffersParams = {}): Promise<OffersPage> => {
    const { data } = await api.get<ApiResponse<OffersPage>>(CLIENT_REQUESTS.OFFERS, {
      params,
    });
    return data.value;
  },

  acceptOffer: async (offerId: number): Promise<void> => {
    await api.put(CLIENT_REQUESTS.ACCEPT_OFFER(offerId));
  },

  rejectOffer: async (offerId: number): Promise<void> => {
    await api.put(CLIENT_REQUESTS.REJECT_OFFER(offerId));
  },

  /** Starts the payment of an invoice. Redirect the browser to the returned `paymentUrl`. */
  payInvoice: async (invoiceId: number): Promise<PayInvoiceResult> => {
    const { data } = await api.post<ApiResponse<PayInvoiceResult>>(
      CLIENT_REQUESTS.PAY_INVOICE(invoiceId),
    );
    return data.value;
  },
};
