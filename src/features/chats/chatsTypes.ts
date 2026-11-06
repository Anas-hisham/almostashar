import type { CallType } from "@/shared/types/enums";

/* ---------- requests ---------- */

/** Query string of GET /api/Chats. */
export interface GetChatsParams {
  Search?: string;
  NextCursor?: number;
  CursorDate?: string;
  PageSize?: number;
}

/** Query string of GET /api/Chats/Messages. */
export interface GetChatMessagesParams {
  ChatId: number;
  NextCursor?: number;
  PageSize?: number;
}

export interface GenerateCallTokenRequest {
  callType: CallType;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface Chat {
  id: number;
  otherUserId?: number;
  otherUserName?: string | null;
  otherUserImage?: string | null;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  unreadCount?: number;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  sentAt: string;
  isRead?: boolean;
}

/** What you need to join the call in the video/voice SDK. */
export interface CallToken {
  callId: number;
  token: string;
  channelName?: string | null;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface ChatsPage {
  items: Chat[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}

export interface ChatMessagesPage {
  items: ChatMessage[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
