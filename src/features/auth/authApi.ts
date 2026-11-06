
import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { tokenStorage } from "@/lib/tokenStorage";
import type {
  RegisterClientRequest,
  RegisterLawyerRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  LoginRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  UploadIdentityDocumentsRequest,
  AuthSession,
  LoginResponse,
} from "@/features/auth/authTypes";

export const authApi = {
  registerClient: async (body: RegisterClientRequest): Promise<void> => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    await api.post(API_ENDPOINTS.AUTH.REGISTER_CLIENT, formData);
  },

  registerLawyer: async (body: RegisterLawyerRequest): Promise<void> => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    await api.post(API_ENDPOINTS.AUTH.REGISTER_LAWYER, formData);
  },

  verifyEmail: async (body: VerifyEmailRequest): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, body);
  },

  resendVerification: async (
    body: ResendVerificationRequest,
  ): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, body);
  },

  login: async (body: LoginRequest): Promise<AuthSession> => {
    const { data } = await api.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      body,
    );

    return {
      accessToken: data.value.tokens.accessToken,
      refreshToken: data.value.tokens.refreshToken,
      user: data.value.user,
    };
  },
  /** Tells the server to end the session. The caller must still clear local state. */
  logout: async (): Promise<void> => {
    const token = tokenStorage.getRefreshToken();
    await api.post(API_ENDPOINTS.AUTH.LOGOUT, token ? { token } : {});
  },

  refresh: async (body: RefreshTokenRequest): Promise<AuthSession> => {
    const { data } = await api.post<AuthSession>(
      API_ENDPOINTS.AUTH.REFRESH,
      body,
    );

    return data;
  },

  forgotPassword: async (
    body: ForgotPasswordRequest,
  ): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, body);
  },

  /** Returns the reset token that `resetPassword` needs. */
  verifyOtp: async (body: VerifyOtpRequest): Promise<string> => {
    const { data } = await api.post<VerifyOtpResponse>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      body,
    );

    return data.value.resetToken;
  },

  resetPassword: async (body: ResetPasswordRequest): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, body);
  },

  uploadIdentityDocuments: async (
    body: UploadIdentityDocumentsRequest,
  ): Promise<void> => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, file]) => {
      formData.append(key, file);
    });

    await api.post(
      API_ENDPOINTS.AUTH.UPLOAD_IDENTITY_DOCUMENTS,
      formData,
    );
  },
};
