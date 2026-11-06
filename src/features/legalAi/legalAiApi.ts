import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type {
  LegalAiChatRequest,
  LegalAiChatResponse,
  LegalAiHealthResponse,
  LegalAiInfoResponse,
} from "@/features/legalAi/legalAiTypes";

const { LEGAL_AI } = API_ENDPOINTS;

/** The backend answers 503 when the AI service is down or still waking up (see `warmup`). */
export const legalAiApi = {
  chat: async (body: LegalAiChatRequest): Promise<LegalAiChatResponse> => {
    const { data } = await api.post<LegalAiChatResponse>(LEGAL_AI.CHAT, body);
    return data;
  },

  getInfo: async (): Promise<LegalAiInfoResponse> => {
    const { data } = await api.get<LegalAiInfoResponse>(LEGAL_AI.INFO);
    return data;
  },

  getHealth: async (): Promise<LegalAiHealthResponse> => {
    const { data } = await api.get<LegalAiHealthResponse>(LEGAL_AI.HEALTH);
    return data;
  },

  /** Wakes the AI service up (cold start). Admin only (the backend answers 403 otherwise). */
  warmup: async (): Promise<void> => {
    await api.post(LEGAL_AI.WARMUP);
  },
};
