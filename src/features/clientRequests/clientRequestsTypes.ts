import type {
  ClientRequestStatus,
  CommunicationMethod,
  RequestUrgency,
  ServiceType,
} from "@/shared/types/enums";

/* ---------- requests (match the Swagger bodies exactly) ---------- */

interface CreateRequestCommon {
  legalServiceId: number;
  title?: string;
  problemDetails?: string;
  governorateId: number;
  cityId: number;
  clientDeadline?: string;
  preferredCommunicationMethod: CommunicationMethod;
  urgency: RequestUrgency;
  /** Extra fields that depend on the chosen service (Swagger leaves it as a free JSON object). */
  requestDetails?: Record<string, unknown>;
  /** ids returned by documents upload */
  attachmentIds: number[];
}

/** Ask ONE lawyer. */
export interface CreateDirectRequest extends CreateRequestCommon {
  lawyerId: number;
}

/** Ask every matching lawyer; they answer with offers. */
export interface CreateBroadcastRequest extends CreateRequestCommon {
  budget: number;
}

/** Query string of GET /api/client/requests. */
export interface GetClientRequestsParams {
  status?: ClientRequestStatus;
  serviceType?: ServiceType;
  cursor?: number;
  pageSize?: number;
}

/** Query string of GET /api/client/requests/offers. */
export interface GetOffersParams {
  RequestId?: number;
  Cursor?: number;
  PageSize?: number;
}

/** Query string of GET /api/client/requests/lawyers-by-service/{serviceId}. */
export interface LawyersByServiceParams {
  governorateId?: number;
  cityId?: number;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface ClientRequest {
  id: number;
  title?: string | null;
  problemDetails?: string | null;
  status: ClientRequestStatus;
  serviceType?: ServiceType;
  legalServiceId?: number;
  lawyerId?: number | null;
  lawyerName?: string | null;
  clientName?: string | null;
  budget?: number | null;
  urgency?: RequestUrgency;
  clientDeadline?: string | null;
  offersCount?: number;
  /** present once an offer was accepted and an invoice was issued */
  invoiceId?: number | null;
  createdAt?: string | null;
}

export interface RequestOffer {
  id: number;
  requestId: number;
  lawyerId: number;
  lawyerName?: string | null;
  offeredAmount: number;
  note?: string | null;
  status?: string | null;
  createdAt?: string | null;
}

/** Where to send the client to pay (Paymob). */
export interface PayInvoiceResult {
  paymentUrl: string;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface ClientRequestsPage {
  items: ClientRequest[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}

export interface OffersPage {
  items: RequestOffer[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
