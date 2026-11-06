// lib/session.ts
import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "@/constants/appUrl";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { tokenStorage } from "@/lib/tokenStorage";
import type { AuthUser } from "@/features/auth/authTypes";

type RefreshResult = { ok: boolean; user: AuthUser | null };

/** Only one refresh runs at a time; everyone who asks meanwhile shares its result. */
let inFlight: Promise<RefreshResult> | null = null;

async function requestNewTokens(): Promise<RefreshResult> {
    const failed: RefreshResult = { ok: false, user: null };
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) return failed;

    try {
        const { data } = await axios.post(
            `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
            { token: refreshToken },
        );

        const tokens = data?.value?.tokens;
        if (!tokens?.accessToken) return failed;

        tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        // the refresh response is expected to carry the user like login does
        return { ok: true, user: (data?.value?.user as AuthUser | undefined) ?? null };
    } catch (error) {
        const status = isAxiosError(error) ? error.response?.status : undefined;

        if (process.env.NODE_ENV !== "production") {
            // Tells you WHY the refresh was refused (wrong body field, expired, used twice...).
            console.warn(
                "[auth] refresh failed:",
                status ?? "no response",
                isAxiosError(error) ? error.response?.data : error,
            );
        }

        // Erase the saved session only when the server says the token is invalid (401).
        // A 400 usually means OUR request is wrong, and a network error is not the user's fault,
        // so neither of them should log the user out.
        if (status === 401) tokenStorage.clear();
        return failed;
    }
}

/** Asks the server for a new access token using the saved refresh token. Returns false if it could not. */
export async function refreshAccessToken(): Promise<boolean> {
    return (await restoreSession()).ok;
}

/** Same as refreshAccessToken, but also returns the user (used to restore the session on page load). */
export function restoreSession(): Promise<RefreshResult> {
    inFlight ??= requestNewTokens().finally(() => {
        inFlight = null;
    });

    return inFlight;
}

/** After a page reload the access token is gone (memory only), so get a new one if we can. */
export async function ensureToken() {
    if (tokenStorage.getAccessToken()) return;

    await refreshAccessToken();
}
