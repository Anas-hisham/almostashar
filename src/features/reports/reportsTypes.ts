import type { ReportReason, ReportStatus } from "@/shared/types/enums";

/* ---------- requests (match the Swagger bodies exactly) ---------- */

/** One chat message attached to a report as evidence. */
export interface ReportMessageEvidence {
  messageId?: string;
  chatId?: string;
  senderUserId?: number;
  senderName?: string;
  content?: string;
  /** ISO date-time */
  sentAt: string;
}

/** Report a lawyer, a user, or a case. Send at least one of `lawyerId` / `userId` / `caseId`. */
export interface CreateReportRequest {
  lawyerId?: number;
  userId?: number;
  caseId?: number;
  problemContent?: string;
  reason: ReportReason;
  messages: ReportMessageEvidence[];
  /** ids returned by documents upload */
  attachmentIds: number[];
}

export interface UpdateReportStatusRequest {
  status: ReportStatus;
  adminNotes?: string;
}

/** Query string of GET /api/reports/admin. */
export interface GetReportsParams {
  Status?: ReportStatus;
  Cursor?: number;
  CursorDate?: string;
  PageSize?: number;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface Report {
  id: number;
  reason: ReportReason;
  status: ReportStatus;
  reporterName?: string | null;
  targetName?: string | null;
  createdAt?: string | null;
}

export interface ReportDetails extends Report {
  problemContent?: string | null;
  adminNotes?: string | null;
  caseId?: number | null;
  messages?: ReportMessageEvidence[];
  attachments?: { id: number; fileName?: string | null; url?: string | null }[];
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface ReportsPage {
  items: Report[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
