import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type {
  ApiResponse,
  RegisterAdminRequest,
  VerifyLawyerRequest,
  UnverifiedLawyer,
  LawyerDetails,
  GetUsersParams,
  AdminUsersPage,
} from "@/features/admin/adminTypes";

export const adminApi = {
  registerAdmin: async (body: RegisterAdminRequest): Promise<void> => {
    await api.post(API_ENDPOINTS.ADMIN.REGISTER, body);
  },

  /** Approve a lawyer, or reject with a reason (`isAccepted: false` + `rejectionReason`). */
  verifyLawyer: async (body: VerifyLawyerRequest): Promise<void> => {
    await api.put(API_ENDPOINTS.ADMIN.VERIFY_LAWYER, body);
  },

  getUnverifiedLawyers: async (): Promise<UnverifiedLawyer[]> => {
    const { data } = await api.get<ApiResponse<UnverifiedLawyer[]>>(
      API_ENDPOINTS.ADMIN.UNVERIFIED_LAWYERS,
    );

    return data.value;
  },

  getLawyerById: async (id: number): Promise<LawyerDetails> => {
    const { data } = await api.get<ApiResponse<LawyerDetails>>(
      API_ENDPOINTS.ADMIN.LAWYER_BY_ID(id),
    );

    return data.value;
  },

  getUsers: async (params: GetUsersParams = {}): Promise<AdminUsersPage> => {
    const { data } = await api.get<ApiResponse<AdminUsersPage>>(
      API_ENDPOINTS.ADMIN.USERS,
      { params },
    );

    return data.value;
  },
};
