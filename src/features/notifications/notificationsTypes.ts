/* ---------- requests ---------- */

/** Query string of GET /api/notifications. */
export interface GetNotificationsParams {
  isRead?: boolean;
  cursor?: number;
  pageSize?: number;
}

export interface RegisterFcmTokenRequest {
  /** Firebase Cloud Messaging token of this browser / device */
  token: string;
  /** e.g. "web", "android", "ios" */
  deviceType: string;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface AppNotification {
  id: number;
  title?: string | null;
  body?: string | null;
  type?: string | null;
  isRead: boolean;
  createdAt?: string | null;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface NotificationsPage {
  items: AppNotification[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
