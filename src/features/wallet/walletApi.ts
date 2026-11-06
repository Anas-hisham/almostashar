import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { Withdrawal, WithdrawalsPage } from "@/features/withdrawals/withdrawalsTypes";
import type { RequestWithdrawalRequest, Wallet, WalletListParams, WalletTransaction, WalletTransactionsPage } from "@/features/wallet/walletTypes";

const { WALLET } = API_ENDPOINTS;

/** The logged-in lawyer's wallet. */
export const walletApi = {
  getWallet: async (): Promise<Wallet> => {
    const { data } = await api.get<ApiResponse<Wallet>>(WALLET.WALLET);
    return data.value;
  },

  getTransactions: async (params: WalletListParams = {}): Promise<WalletTransactionsPage> => {
    const { data } = await api.get<ApiResponse<WalletTransactionsPage>>(WALLET.TRANSACTIONS, {
      params,
    });
    return data.value;
  },

  requestWithdrawal: async (body: RequestWithdrawalRequest): Promise<void> => {
    await api.post(WALLET.WITHDRAWALS, body);
  },

  getMyWithdrawals: async (params: WalletListParams = {}): Promise<WithdrawalsPage> => {
    const { data } = await api.get<ApiResponse<WithdrawalsPage>>(WALLET.WITHDRAWALS, { params });
    return data.value;
  },

  cancelWithdrawal: async (id: number): Promise<void> => {
    await api.post(WALLET.CANCEL_WITHDRAWAL(id));
  },
};
