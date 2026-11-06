/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface CreateFeedbackRequest {
  clientRequestId: number;
  lawyerId: number;
  serviceId: number;
  /** 1 - 5 */
  rating: number;
  content?: string;
}

/** Query string of GET /api/client/feedbacks. */
export interface GetFeedbacksParams {
  lawyerId?: number;
  serviceId?: number;
  nextCursor?: number;
  pageSize?: number;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface Feedback {
  id: number;
  rating: number;
  content?: string | null;
  clientName?: string | null;
  lawyerId?: number;
  serviceId?: number;
  createdAt?: string | null;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface FeedbacksPage {
  items: Feedback[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
