import type { DisputeResolutionType, DisputeStatus } from "@/shared/types/enums";

/* ---------- requests ---------- */

/** One chat message copied into the dispute as evidence. */
export interface OpenDisputeChatMessageInput {
  senderId: number;
  content?: string;
  /** ISO date-time */
  sentAt: string;
}

/**
 * POST /api/cases/{caseId}/disputes (multipart). Keys are PascalCase because that is
 * what Swagger declares for form fields. `CaseId` is added for you by `disputesApi.openDispute`.
 */
export interface OpenDisputeRequest {
  Reason: string;
  Attachments?: File[];
  DisputeChatMessages?: OpenDisputeChatMessageInput[];
}

export interface ResolveDisputeRequest {
  resolutionType: DisputeResolutionType;
  adminNotes?: string;
  adminDecision?: string;
}

/** Query string of GET /api/admin/disputes. */
export interface GetDisputesParams {
  Status?: DisputeStatus;
  PageSize?: number;
  Cursor?: number;
  CursorDate?: string;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface Dispute {
  id: number;
  caseId: number;
  status: DisputeStatus;
  reason?: string | null;
  openedByName?: string | null;
  createdAt?: string | null;
}

export interface DisputeAttachment {
  id: number;
  fileName?: string | null;
  url?: string | null;
}

export interface DisputeChatMessage {
  id?: number;
  senderId: number;
  senderName?: string | null;
  content?: string | null;
  sentAt: string;
}

export interface DisputeDetails extends Dispute {
  clientName?: string | null;
  lawyerName?: string | null;
  escrowId?: number | null;
  adminNotes?: string | null;
  adminDecision?: string | null;
  attachments?: DisputeAttachment[];
  chatMessages?: DisputeChatMessage[];
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface DisputesPage {
  items: Dispute[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
