/** Every backend response is wrapped like this; the useful data is in `value`. */
export interface ApiResponse<T> {
    success: boolean;
    message: string | null;
    messageAr: string | null;
    value: T;
}

/* ---------- requests (these match the Swagger bodies exactly) ---------- */

export interface RegisterAdminRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNo: string;
}

export interface VerifyLawyerRequest {
    lawyerId: number;
    isAccepted: boolean;
    /** Only needed when `isAccepted` is false. */
    rejectionReason?: string;
}

export type UserRole = "Client" | "Lawyer" | "Admin";

export type AccountStatus =
    | "Active"
    | "PendingReview"
    | "EmailVerificationRequired"
    | "Suspended";

/** Query string of GET /api/admin/users. Every field is optional. */
export interface GetUsersParams {
    role?: UserRole;
    accountStatus?: AccountStatus;
    isVerified?: boolean;
    search?: string;
    /** Pagination: send back the cursor values the previous page returned. */
    cursor?: number;
    cursorDate?: string;
    pageSize?: number;
}

/* ---------- responses ----------
 * Swagger only says "200 OK" for these, so the fields below are the best guess
 * from the register form. Open Swagger -> "Try it out" and compare; if a name differs,
 * fix it HERE and the pages will follow.
 */

export interface UnverifiedLawyer {
    id: number;
    fullName: string;
    phoneNo?: string | null;
    yearsOfExperience?: number | null;
    createdAt?: string | null;
}

export interface LawyerSpecialization {
    id: number;
    title: string;
    arabicTitle: string;
}

export interface LawyerDetails extends UnverifiedLawyer {
    governorate?: string | null;
    city?: string | null;
    syndicate?: string | null;
    specializations?: LawyerSpecialization[] | null;
    accountStatus?: string | null;
    avatarPhoto?: string | null;
    ssnPhoto?: string | null;
    syndicateCardPhoto?: string | null;
    practiceCertificatesPhoto?: string | null;
}

export interface AdminUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    accountStatus: AccountStatus;
    isVerified?: boolean;
    createdAt?: string | null;
}

export interface AdminUsersPage {
    items: AdminUser[];
    nextCursor?: number | null;
    nextCursorDate?: string | null;
}
