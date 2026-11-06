import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { Dispute, DisputeDetails, DisputesPage, GetDisputesParams, OpenDisputeRequest, ResolveDisputeRequest } from "@/features/disputes/disputesTypes";

const { DISPUTES } = API_ENDPOINTS;

export const disputesApi = {
  /** Client / lawyer: open a dispute on a case. */
  openDispute: async (caseId: number, body: OpenDisputeRequest): Promise<void> => {
    const formData = new FormData();

    formData.append("CaseId", String(caseId));
    formData.append("Reason", body.Reason);
    body.Attachments?.forEach((file) => formData.append("Attachments", file));
    body.DisputeChatMessages?.forEach((message, i) => {
      formData.append(`DisputeChatMessages[${i}].SenderId`, String(message.senderId));
      if (message.content) formData.append(`DisputeChatMessages[${i}].Content`, message.content);
      formData.append(`DisputeChatMessages[${i}].SentAt`, message.sentAt);
    });

    await api.post(DISPUTES.OPEN_FOR_CASE(caseId), formData);
  },

  /* ----- admin ----- */

  getDisputes: async (params: GetDisputesParams = {}): Promise<DisputesPage> => {
    const { data } = await api.get<ApiResponse<DisputesPage>>(DISPUTES.ADMIN_LIST, { params });
    return data.value;
  },

  getDisputeById: async (id: number): Promise<DisputeDetails> => {
    const { data } = await api.get<ApiResponse<DisputeDetails>>(DISPUTES.ADMIN_BY_ID(id));
    return data.value;
  },

  resolveDispute: async (id: number, body: ResolveDisputeRequest): Promise<void> => {
    await api.post(DISPUTES.ADMIN_RESOLVE(id), body);
  },
};
