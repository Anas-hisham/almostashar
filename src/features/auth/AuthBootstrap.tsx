"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { tokenStorage } from "@/lib/tokenStorage";
import { restoreSession } from "@/lib/session";
import { setAuthenticated, setUnauthenticated } from "@/features/auth/authSlice";

/**
 * Runs once when the app opens / the page is reloaded.
 * The access token lives in memory only, so after a refresh we use the saved
 * refresh token to get a new one and to know who the user is.
 */
export default function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // already logged in during this page session (e.g. just came from /login)
      if (tokenStorage.getAccessToken()) return;

      if (!tokenStorage.getRefreshToken()) {
        dispatch(setUnauthenticated());
        return;
      }

      const result = await restoreSession();
      if (cancelled) return;

      if (result.ok) dispatch(setAuthenticated(result.user ?? undefined));
      else dispatch(setUnauthenticated());
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return null;
}
