import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { CreateFeedbackRequest, Feedback, FeedbacksPage, GetFeedbacksParams } from "@/features/feedbacks/feedbacksTypes";

export const feedbacksApi = {
  createFeedback: async (body: CreateFeedbackRequest): Promise<void> => {
    await api.post(API_ENDPOINTS.FEEDBACKS.ROOT, body);
  },

  getFeedbacks: async (params: GetFeedbacksParams = {}): Promise<FeedbacksPage> => {
    const { data } = await api.get<ApiResponse<FeedbacksPage>>(API_ENDPOINTS.FEEDBACKS.ROOT, {
      params,
    });
    return data.value;
  },
};
