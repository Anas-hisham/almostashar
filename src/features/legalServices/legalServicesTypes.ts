/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface AddLegalServiceRequest {
  title?: string;
  summary?: string;
  fullDescription?: string;
  /** Number here (not the string enum used by cases/requests) - that is how Swagger declares it. */
  serviceType: number;
  iconUrl?: string;
  requiredDocuments?: string;
  expectedDuration?: string;
}

/* ---------- responses (best guess, see note in lookupsTypes) ---------- */

export interface LegalService {
  id: number;
  title: string;
  summary?: string | null;
  fullDescription?: string | null;
  serviceType?: number | string;
  iconUrl?: string | null;
  requiredDocuments?: string | null;
  expectedDuration?: string | null;
}

export interface LegalServiceTypeOption {
  id: number;
  name: string;
  nameAr?: string | null;
}
