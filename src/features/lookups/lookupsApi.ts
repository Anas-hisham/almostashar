import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { City, Governorate, Specialization } from "@/features/lookups/lookupsTypes";

export const lookupsApi = {
  getGovernorates: async (): Promise<Governorate[]> => {
    const { data } = await api.get<ApiResponse<Governorate[]>>(API_ENDPOINTS.LOOKUPS.GOVERNORATES);
    return data.value;
  },

  getCities: async (governorateId?: number): Promise<City[]> => {
    const { data } = await api.get<ApiResponse<City[]>>(API_ENDPOINTS.LOOKUPS.CITIES, {
      params: { governorateId },
    });
    return data.value;
  },

  getSpecializations: async (): Promise<Specialization[]> => {
    const { data } = await api.get<ApiResponse<Specialization[]>>(
      API_ENDPOINTS.LOOKUPS.SPECIALIZATIONS,
    );
    return data.value;
  },
};
