"use client";

import { useEffect, useState } from "react";
import { lawyersApi } from "@/features/lawyers/lawyersApi";
import type { LawyerProfile } from "@/features/lawyers/lawyersTypes";

/** Loads one public lawyer profile. `lawyerId` can be NaN/0 (bad URL) → `failed`. */
export function useLawyerProfile(lawyerId: number) {
  const [lawyer, setLawyer] = useState<LawyerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!lawyerId) {
      setFailed(true);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setFailed(false);

    lawyersApi
      .getLawyerProfile(lawyerId)
      .then((data) => !ignore && setLawyer(data))
      .catch(() => !ignore && setFailed(true))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [lawyerId]);

  return { lawyer, loading, failed };
}
