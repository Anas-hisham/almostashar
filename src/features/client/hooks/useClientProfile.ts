"use client";

import { useCallback, useEffect, useState } from "react";
import { clientApi } from "../clientApi";
import type { ClientProfile } from "../clientTypes";

/** Loads the logged-in client's profile once; `reload` refetches it. */
export function useClientProfile() {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      setProfile(await clientApi.getProfile());
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { profile, loading, failed, reload: load };
}
