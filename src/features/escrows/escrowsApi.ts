import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { Escrow } from "@/features/escrows/escrowsTypes";

const { ESCROWS } = API_ENDPOINTS;

export const escrowsApi = {
  /** Client: the escrow that holds the money of one request. */
  getEscrowByRequest: async (requestId: number): Promise<Escrow> => {
    const { data } = await api.get<ApiResponse<Escrow>>(ESCROWS.BY_REQUEST(requestId));
    return data.value;
  },

  /* ----- admin ----- */

  getEscrowById: async (escrowId: number): Promise<Escrow> => {
    const { data } = await api.get<ApiResponse<Escrow>>(ESCROWS.ADMIN_BY_ID(escrowId));
    return data.value;
  },

  /** Pay the held money to the lawyer. */
  releaseEscrow: async (escrowId: number): Promise<void> => {
    await api.post(ESCROWS.ADMIN_RELEASE(escrowId));
  },

  /** Give the held money back to the client. */
  refundEscrow: async (escrowId: number): Promise<void> => {
    await api.post(ESCROWS.ADMIN_REFUND(escrowId));
  },

  markEscrowDisputed: async (escrowId: number): Promise<void> => {
    await api.post(ESCROWS.ADMIN_MARK_DISPUTED(escrowId));
  },
};
