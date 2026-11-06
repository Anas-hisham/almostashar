import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type {
  AddLegalServiceRequest,
  LegalService,
  LegalServiceTypeOption,
} from "@/features/legalServices/legalServicesTypes";

export const legalServicesApi = {
  addLegalService: async (body: AddLegalServiceRequest): Promise<void> => {
    await api.post(API_ENDPOINTS.LEGAL_SERVICES.ROOT, body);
  },

  getLegalServices: async (): Promise<LegalService[]> => {
    const { data } = await api.get<ApiResponse<LegalService[]>>(API_ENDPOINTS.LEGAL_SERVICES.ROOT);
    return data.value;
  },

  getLegalServiceTypes: async (): Promise<LegalServiceTypeOption[]> => {
    const { data } = await api.get<ApiResponse<LegalServiceTypeOption[]>>(
      API_ENDPOINTS.LEGAL_SERVICES.TYPES,
    );
    return data.value;
  },
};
