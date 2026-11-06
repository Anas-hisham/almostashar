import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { ApproveWithdrawalRequest, GetWithdrawalsParams, MarkWithdrawalPaidRequest, RejectWithdrawalRequest, Withdrawal, WithdrawalsPage } from "@/features/withdrawals/withdrawalsTypes";

const { WITHDRAWALS } = API_ENDPOINTS;

/** Admin side of withdrawals. The lawyer's own side (request / list / cancel) is in features/wallet. */
export const withdrawalsApi = {
  getWithdrawals: async (params: GetWithdrawalsParams = {}): Promise<WithdrawalsPage> => {
    const { data } = await api.get<ApiResponse<WithdrawalsPage>>(WITHDRAWALS.LIST, { params });
    return data.value;
  },

  getWithdrawalById: async (id: number): Promise<Withdrawal> => {
    const { data } = await api.get<ApiResponse<Withdrawal>>(WITHDRAWALS.BY_ID(id));
    return data.value;
  },

  approveWithdrawal: async (id: number, body: ApproveWithdrawalRequest = {}): Promise<void> => {
    await api.post(WITHDRAWALS.APPROVE(id), body);
  },

  rejectWithdrawal: async (id: number, body: RejectWithdrawalRequest): Promise<void> => {
    await api.post(WITHDRAWALS.REJECT(id), body);
  },

  markWithdrawalPaid: async (id: number, body: MarkWithdrawalPaidRequest): Promise<void> => {
    await api.post(WITHDRAWALS.MARK_PAID(id), body);
  },
};
