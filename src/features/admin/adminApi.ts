import { api } from "@/lib/axios";
import { pickByName } from "@/lib/pickImage";
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

    const raw = data.value as LawyerDetails & Record<string, unknown>;

    // the photo fields are named differently in the backend (e.g. avatarUrl), so find them by name
    return {
      ...raw,
      avatarPhoto: raw.avatarPhoto ?? pickByName(raw, /avatar|profile.?(image|photo|picture)/i),
      ssnPhoto: raw.ssnPhoto ?? pickByName(raw, /ssn|national|identity|id.?(photo|card|image)/i),
      syndicateCardPhoto:
        raw.syndicateCardPhoto ?? pickByName(raw, /syndicate.*(card|photo|image|url)/i),
      practiceCertificatesPhoto:
        raw.practiceCertificatesPhoto ?? pickByName(raw, /certificate|practice/i),
    };
  },

  getUsers: async (params: GetUsersParams = {}): Promise<AdminUsersPage> => {
    const { data } = await api.get<ApiResponse<AdminUsersPage>>(
      API_ENDPOINTS.ADMIN.USERS,
      { params },
    );

    return data.value;
  },
};
