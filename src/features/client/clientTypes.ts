/* ---------- requests ---------- */

/** PUT /api/client/profile (multipart). Send only what changed. */
export interface UpdateClientProfileRequest {
  FirstName?: string;
  LastName?: string;
  ProfileImage?: File;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/* ---------- responses (best guess, see note in casesTypes) ---------- */

export interface ClientHomeAnalytics {
  activeCases?: number;
  completedCases?: number;
  pendingRequests?: number;
  totalSpent?: number;
}

export interface ClientRecentUpdate {
  id: number;
  title?: string | null;
  description?: string | null;
  type?: string | null;
  createdAt?: string | null;
}

export interface ClientProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string | null;
  governorate?: string | null;
  city?: string | null;
}
