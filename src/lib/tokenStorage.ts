/**
 * Keeps the short-lived access token in memory only.
 * The refresh token must be issued by the backend as a Secure, HttpOnly cookie;
 * JavaScript must never read or persist the refresh token.
 */
let accessToken: string | null = null;
type accessTokenType = string | null
export const tokenStorage = {
  getAccessToken: (): accessTokenType => accessToken,

  getRefreshToken: () =>
    typeof window === "undefined" ? null : localStorage.getItem("refreshToken"),

  setTokens: (access: string, refresh?: string): void => {
    accessToken = access;
    if (refresh) localStorage.setItem("refreshToken", refresh);
  },
  setAccessToken: (access: string | null): void => {
    accessToken = access;
  },
  clear: (): void => {
    accessToken = null;
    localStorage.removeItem("refreshToken");
  },
};
