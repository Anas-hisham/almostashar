"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authApi } from "@/features/auth/authApi";
import { setUnauthenticated } from "@/features/auth/authSlice";
import { tokenStorage } from "@/lib/tokenStorage";
import { ROUTES } from "@/constants";
import { useAppDispatch } from "@/store/hooks";

export function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await authApi.logout(); // needs the access token, so call it before clearing
    } catch {
      // even if the server call fails, the user must be logged out locally
    } finally {
      tokenStorage.clear();
      dispatch(setUnauthenticated());
      router.replace(ROUTES.home);
      router.refresh();
    }
  }

  return { logout, loggingOut };
}
