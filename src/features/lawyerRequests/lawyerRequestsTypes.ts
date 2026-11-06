import type { ClientRequestStatus, ServiceType } from "@/shared/types/enums";

/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface SendOfferRequest {
  legalServiceId?: number;
  offeredAmount: number;
  note?: string;
}

/** Query string of GET /api/lawyer/requests/broadcast/available. */
export interface GetAvailableBroadcastParams {
  minBudget?: number;
  maxBudget?: number;
  serviceType?: ServiceType;
  governorateId?: number;
  cityId?: number;
  cursor?: number;
  pageSize?: number;
}

/** Query string of GET /api/lawyer/requests/direct/incoming. */
export interface GetIncomingDirectParams {
  status?: ClientRequestStatus;
  serviceType?: ServiceType;
}

/* The request objects themselves are the same `ClientRequest` shape (see features/clientRequests). */
