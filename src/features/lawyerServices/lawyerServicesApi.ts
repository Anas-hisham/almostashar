import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type {
  AddLawyerServiceRequest,
  LawyerServiceItem,
  UpdateLawyerServiceRequest,
} from "@/features/lawyerServices/lawyerServicesTypes";

export const lawyerServicesApi = {
  addService: async (body: AddLawyerServiceRequest): Promise<void> => {
    await api.post(API_ENDPOINTS.LAWYER_SERVICES.ROOT, body);
  },

  /** The logged-in lawyer's own services. */
  getMyServices: async (): Promise<LawyerServiceItem[]> => {
    const { data } = await api.get<ApiResponse<LawyerServiceItem[]>>(
      API_ENDPOINTS.LAWYER_SERVICES.ROOT,
    );
    return data.value;
  },

  updateService: async (serviceId: number, body: UpdateLawyerServiceRequest): Promise<void> => {
    await api.put(API_ENDPOINTS.LAWYER_SERVICES.BY_ID(serviceId), body);
  },
};
