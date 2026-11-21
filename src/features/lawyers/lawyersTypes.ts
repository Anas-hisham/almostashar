import type { Specialization } from "@/features/lookups/lookupsTypes";
import type { LawyerServiceItem } from "@/features/lawyerServices/lawyerServicesTypes";

/* ---------- requests ---------- */

/** Query string of GET /api/Lawyers (public directory). Every field is optional. */
export interface GetLawyersParams {
  ServiceId?: number;
  specializationId?: number;
  Search?: string;
  Cursor?: number;
  PageSize?: number;
}

/** PUT /api/Lawyers/edit-profile (multipart). Send only what changed. */
export interface EditLawyerProfileRequest {
  FirstName?: string;
  LastName?: string;
  Bio?: string;
  About?: string;
  YearsOfExperience?: number;
  SpecializationIds?: number[];
  ProfileImage?: File;
  SSNPhoto?: File;
  SyndicateCardPhoto?: File;
  PracticeCertificatesPhoto?: File;
  /** true after fixing rejected documents: sends the account back to admin review. */
  ResubmitForReview?: boolean;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface LawyerSummary {
  id: number;
  fullName: string;
  profileImage?: string | null;
  yearsOfExperience?: number | null;
  rating?: number | null;
  reviewsCount?: number | null;
  governorate?: string | null;
  city?: string | null;
  specializations?: Specialization[] | null;
}

export interface LawyerProfile extends LawyerSummary {
  bio?: string | null;
  about?: string | null;
  /** "ترخيص #39/204" on the public profile */
  licenseNumber?: string | null;
  /** Services + prices shown on the public profile and offered in the booking form. */
  services?: LawyerServiceItem[] | null;
  /** Needed to open a direct request (see clientRequestsOptions.buildDirectRequest). */
  governorateId?: number | null;
  cityId?: number | null;
}

export interface LawyerAnalytics {
  activeCases?: number;
  completedCases?: number;
  pendingRequests?: number;
  totalEarnings?: number;
  rating?: number | null;
}

/** One page of a cursor-paginated list. Send `nextCursor` (and `nextCursorDate`) back to get the next page. */
export interface LawyersPage {
  items: LawyerSummary[];
  nextCursor?: number | null;
  nextCursorDate?: string | null;
}
