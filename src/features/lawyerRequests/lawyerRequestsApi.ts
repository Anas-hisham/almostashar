import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { ClientRequest, ClientRequestsPage } from "@/features/clientRequests/clientRequestsTypes";
import type {
  GetAvailableBroadcastParams,
  GetIncomingDirectParams,
  SendOfferRequest,
} from "@/features/lawyerRequests/lawyerRequestsTypes";

const { LAWYER_REQUESTS } = API_ENDPOINTS;

export const lawyerRequestsApi = {
  /** Broadcast requests this lawyer can still send an offer on. */
  getAvailableBroadcast: async (
    params: GetAvailableBroadcastParams = {},
  ): Promise<ClientRequestsPage> => {
    const { data } = await api.get<ApiResponse<ClientRequestsPage>>(
      LAWYER_REQUESTS.BROADCAST_AVAILABLE,
      { params },
    );
    return data.value;
  },

  /** Requests a client sent straight to this lawyer. */
  getIncomingDirect: async (params: GetIncomingDirectParams = {}): Promise<ClientRequest[]> => {
    const { data } = await api.get<ApiResponse<ClientRequest[]>>(LAWYER_REQUESTS.DIRECT_INCOMING, {
      params,
    });
    return data.value;
  },

  acceptRequest: async (id: number): Promise<void> => {
    await api.put(LAWYER_REQUESTS.ACCEPT(id));
  },

  rejectRequest: async (id: number): Promise<void> => {
    await api.put(LAWYER_REQUESTS.REJECT(id));
  },

  sendOffer: async (requestId: number, body: SendOfferRequest): Promise<void> => {
    await api.post(LAWYER_REQUESTS.SEND_OFFER(requestId), body);
  },
};
