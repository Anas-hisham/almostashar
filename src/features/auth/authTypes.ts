
export interface commonRequest {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    GovernorateId: number;
    CityId: number;
}

export interface RegisterClientRequest extends commonRequest {
    AvatarPhoto?: File;
    FrontIdPhoto: File;
    BackIdPhoto: File;
}

export interface RegisterLawyerRequest extends commonRequest {
    PhoneNo: string;
    SyndicateId: number;
    YearsOfExperience: number;
    SpecializationIds: number[];
    SSNPhoto: File;
    SyndicateCardPhoto: File;
    PracticeCertificatesPhoto: File;
    AvatarPhoto?: File;
}

export interface VerifyEmailRequest {
    userId: number;
    otpCode: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshTokenRequest {
    token: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyOtpRequest {
    email: string;
    otpCode: string;
}

export interface VerifyOtpResponse {
    success: boolean;
    message: string | null;
    messageAr: string | null;
    value: {
        resetToken: string;
    };
}

export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
}

export interface UploadIdentityDocumentsRequest {
    SSN: File;
    SyndicateCard: File;
    PracticeCertificates: File;
}

export interface AuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accountStatus: string;
    profileImage: string;
    userDetails: unknown | null;
}
export interface LoginResponse {
    success: boolean;
    message: string | null;
    messageAr: string | null;
    value: {
        user: AuthUser;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
}

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthState {
    user: AuthUser | null;
    status: AuthStatus;
}

export interface AuthSession {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
}