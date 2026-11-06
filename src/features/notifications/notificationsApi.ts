import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { AppNotification, GetNotificationsParams, NotificationsPage, RegisterFcmTokenRequest } from "@/features/notifications/notificationsTypes";

const { NOTIFICATIONS } = API_ENDPOINTS;

export const notificationsApi = {
  getNotifications: async (
    params: GetNotificationsParams = {},
  ): Promise<NotificationsPage> => {
    const { data } = await api.get<ApiResponse<NotificationsPage>>(NOTIFICATIONS.ROOT, {
      params,
    });
    return data.value;
  },

  /** Save this device's push token so the server can notify it. */
  registerFcmToken: async (body: RegisterFcmTokenRequest): Promise<void> => {
    await api.post(NOTIFICATIONS.FCM_TOKEN, body);
  },

  /** Marks every notification up to `lastReadId` as read (pass the newest id you have shown). */
  markAsRead: async (lastReadId: number): Promise<void> => {
    await api.put(NOTIFICATIONS.MARK_AS_READ, null, { params: { lastReadId } });
  },
};
