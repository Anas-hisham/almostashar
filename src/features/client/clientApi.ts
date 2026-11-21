import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type {
  ChangePasswordRequest,
  ClientHomeAnalytics,
  ClientProfile,
  ClientRecentUpdate,
  UpdateClientProfileRequest,
} from "@/features/client/clientTypes";

const { CLIENT } = API_ENDPOINTS;

/** The logged-in client: dashboard numbers + profile. */
export const clientApi = {
  getHomeAnalytics: async (): Promise<ClientHomeAnalytics> => {
    const { data } = await api.get<ApiResponse<ClientHomeAnalytics>>(CLIENT.HOME_ANALYTICS);
    return data.value;
  },

  getRecentUpdates: async (limit?: number): Promise<ClientRecentUpdate[]> => {
    const { data } = await api.get<ApiResponse<ClientRecentUpdate[]>>(CLIENT.HOME_RECENT_UPDATES, {
      params: { limit },
    });
    return data.value;
  },

  getProfile: async (): Promise<ClientProfile> => {
    const { data } = await api.get<ApiResponse<ClientProfile>>(CLIENT.PROFILE);
    const raw = data.value as ClientProfile & Record<string, unknown>;

    // the backend may name the image field differently: take the first image-like string
    const imageKey = Object.keys(raw).find(
      (k) => /image|photo|avatar|picture/i.test(k) && typeof raw[k] === "string" && raw[k],
    );

    return { ...raw, profileImage: imageKey ? (raw[imageKey] as string) : raw.profileImage ?? null };
  },

  updateProfile: async (body: UpdateClientProfileRequest): Promise<void> => {
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

    await api.put(CLIENT.PROFILE, formData);
  },

  changePassword: async (body: ChangePasswordRequest): Promise<void> => {
    await api.post(CLIENT.CHANGE_PASSWORD, body);
  },
};
