/* ---------- requests (match the Swagger bodies exactly) ---------- */

export interface AddLawyerServiceRequest {
  /** id of the service from the legal-services catalog */
  serviceId: number;
  price: number;
  duration?: string;
}

export interface UpdateLawyerServiceRequest {
  price?: number;
  duration?: string;
  isActive?: boolean;
}

/* ---------- responses (best guess, see note in lookupsTypes) ---------- */

export interface LawyerServiceItem {
  id: number;
  serviceId: number;
  title?: string | null;
  price: number;
  duration?: string | null;
  isActive?: boolean;
}
