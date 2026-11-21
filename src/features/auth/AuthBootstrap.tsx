"use client";

import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clientApi } from "@/features/client/clientApi";
import { lawyersApi } from "@/features/lawyers/lawyersApi";
import { tokenStorage } from "@/lib/tokenStorage";
import { restoreSession } from "@/lib/session";
import { setAuthenticated, setUnauthenticated, updateUser } from "@/features/auth/authSlice";

/**
 * Runs once when the app opens / the page is reloaded.
 * The access token lives in memory only, so after a refresh we use the saved
 * refresh token to get a new one and to know who the user is.
 */
export default function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.auth.user?.id);
  const role = useAppSelector((s) => s.auth.user?.role);
  const syncedFor = useRef<number | null>(null);

  // after login / page refresh: put the profile saved in the database into Redux
  useEffect(() => {
    const r = role?.toLowerCase();
    if (!userId || (r !== "client" && r !== "lawyer") || syncedFor.current === userId) return;
    syncedFor.current = userId;

    const load: Promise<{
      firstName?: string;
      lastName?: string;
      email?: string;
      image?: string | null;
    }> =
      r === "client"
        ? clientApi.getProfile().then((p) => ({
            firstName: p.firstName,
            lastName: p.lastName,
            email: p.email,
            image: p.profileImage,
          }))
        : lawyersApi.getLawyerProfile(userId).then((p) => ({ image: p.profileImage }));

    load
      .then(({ image, ...rest }) =>
        dispatch(updateUser({ ...rest, ...(image ? { profileImage: image } : {}) })),
      )
      .catch(() => {
        syncedFor.current = null; // allow a retry on the next render
      });
  }, [userId, role, dispatch]);

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
