"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { lawyersApi } from "../lawyersApi";
import type { LawyerProfile } from "../lawyersTypes";

/** Loads the logged-in lawyer's own profile from the backend. */
export function useMyLawyerProfile() {
  const lawyerId = useAppSelector((s) => s.auth.user?.id);
  const [profile, setProfile] = useState<LawyerProfile | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    if (!lawyerId) return;
    setFailed(false);
    try {
      setProfile(await lawyersApi.getLawyerProfile(lawyerId));
    } catch {
      setFailed(true);
    }
  }, [lawyerId]);

  useEffect(() => {
    load();
  }, [load]);

  return { profile, failed, reload: load };
}
