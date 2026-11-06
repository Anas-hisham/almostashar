import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { CaseSummary } from "@/features/cases/casesTypes";
import type { Specialization } from "@/features/lookups/lookupsTypes";
import type { EditLawyerProfileRequest, GetLawyersParams, LawyerAnalytics, LawyerProfile, LawyerSummary, LawyersPage } from "@/features/lawyers/lawyersTypes";

const { LAWYERS } = API_ENDPOINTS;

export const lawyersApi = {
  /** Public directory. */
  getLawyers: async (params: GetLawyersParams = {}): Promise<LawyersPage> => {
    const { data } = await api.get<ApiResponse<LawyersPage>>(LAWYERS.LIST, { params });
    return data.value;
  },

  getLawyerProfile: async (lawyerId: number): Promise<LawyerProfile> => {
    const { data } = await api.get<ApiResponse<LawyerProfile>>(LAWYERS.PROFILE(lawyerId));
    return data.value;
  },

  /* ----- the logged-in lawyer ----- */

  editProfile: async (body: EditLawyerProfileRequest): Promise<void> => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    await api.put(LAWYERS.EDIT_PROFILE, formData);
  },

  getAnalytics: async (): Promise<LawyerAnalytics> => {
    const { data } = await api.get<ApiResponse<LawyerAnalytics>>(LAWYERS.HOME_ANALYTICS);
    return data.value;
  },

  /** Lawyer dashboard: cases in progress. `limit` = how many to return. */
  getActiveCases: async (limit?: number): Promise<CaseSummary[]> => {
    const { data } = await api.get<ApiResponse<CaseSummary[]>>(LAWYERS.HOME_ACTIVE_CASES, {
      params: { limit },
    });
    return data.value;
  },

  /** Same list as `lookupsApi.getSpecializations` (the backend exposes both URLs). */
  getSpecializations: async (): Promise<Specialization[]> => {
    const { data } = await api.get<ApiResponse<Specialization[]>>(LAWYERS.SPECIALIZATIONS);
    return data.value;
  },
};
