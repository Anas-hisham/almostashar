import type {
  CaseSource,
  CaseStatus,
  ClientRole,
  CommunicationMethod,
  CompanyType,
  ContractType,
  LawsuitStatus,
  ServiceType,
} from "@/shared/types/enums";

/* ---------- requests (match the Swagger bodies exactly) ---------- */

/**
 * POST /api/cases. Only `title` and `serviceType` are always needed;
 * the rest depend on the service type (company fields for CompanyFormation,
 * court fields for Lawsuit, contract fields for Contract...).
 */
export interface CreateCaseRequest {
  title: string;
  serviceType: ServiceType;
  description?: string;
  clientName?: string;
  appointmentDate?: string;
  communicationMethod?: CommunicationMethod;
  legalBranch?: string;
  contractType?: ContractType;
  language?: string;
  allowedRevisions?: number;
  deliveryDate?: string;
  companyType?: CompanyType;
  capitalAmount?: number;
  foundersCount?: number;
  hasPowerOfAttorney?: boolean;
  courtName?: string;
  caseNumber?: string;
  nextHearingDate?: string;
  lawsuitStatus?: LawsuitStatus;
  clientRole?: ClientRole;
}

/** Query string of GET /api/cases. Every field is optional. */
export interface GetCasesParams {
  status?: CaseStatus;
  source?: CaseSource;
  serviceType?: ServiceType;
  search?: string;
  cursor?: number;
  pageSize?: number;
}

export interface CancelCaseRequest {
  reason?: string;
}

export interface AddCaseNoteRequest {
  content: string;
}

export interface AddCaseTimelineEventRequest {
  title: string;
  content?: string;
}

/** Attach an already-uploaded document (see features/documents) to a case. */
export interface AttachCaseDocumentRequest {
  documentId: number;
}

/* ---------- responses ----------
 * Swagger only says "200 OK". Best guess from the request bodies: open Swagger -> "Try it out"
 * and compare; if a name differs, fix it HERE and the pages will follow.
 */

export interface CaseSummary {
  id: number;
  title: string;
  clientName?: string | null;
  lawyerName?: string | null;
  serviceType?: ServiceType;
  status: CaseStatus;
  source?: CaseSource;
  createdAt?: string | null;
}

export interface CaseNote {
  id: number;
  content: string;
  createdAt?: string | null;
}

export interface CaseTimelineEvent {
  id: number;
  title: string;
  content?: string | null;
  createdAt?: string | null;
}

export interface CaseDocument {
  id: number;
  documentId?: number;
  fileName?: string | null;
  url?: string | null;
}

export interface CaseDetails extends CaseSummary, Partial<Omit<CreateCaseRequest, "title" | "serviceType" | "clientName">> {
  notes?: CaseNote[];
  timeline?: CaseTimelineEvent[];
  documents?: CaseDocument[];
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface CasesPage {
  items: CaseSummary[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
