import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { CallToken, Chat, ChatMessage, ChatMessagesPage, ChatsPage, GenerateCallTokenRequest, GetChatMessagesParams, GetChatsParams } from "@/features/chats/chatsTypes";

const { CHATS } = API_ENDPOINTS;

export const chatsApi = {
  getChats: async (params: GetChatsParams = {}): Promise<ChatsPage> => {
    const { data } = await api.get<ApiResponse<ChatsPage>>(CHATS.LIST, { params });
    return data.value;
  },

  getMessages: async (params: GetChatMessagesParams): Promise<ChatMessagesPage> => {
    const { data } = await api.get<ApiResponse<ChatMessagesPage>>(CHATS.MESSAGES, { params });
    return data.value;
  },

  /** Tell the server everything up to `lastReadMessageId` was read. */
  markRead: async (chatId: number, lastReadMessageId: number): Promise<void> => {
    await api.put(CHATS.MARK_READ(chatId, lastReadMessageId));
  },

  /* ----- calls ----- */

  startCall: async (chatId: number, body: GenerateCallTokenRequest): Promise<CallToken> => {
    const { data } = await api.post<ApiResponse<CallToken>>(CHATS.START_CALL(chatId), body);
    return data.value;
  },

  acceptCall: async (callId: number): Promise<void> => {
    await api.put(CHATS.ACCEPT_CALL(callId));
  },

  rejectCall: async (callId: number): Promise<void> => {
    await api.put(CHATS.REJECT_CALL(callId));
  },

  endCall: async (callId: number): Promise<void> => {
    await api.put(CHATS.END_CALL(callId));
  },
};
