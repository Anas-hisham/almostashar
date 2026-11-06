"use client";

import { useEffect, useState } from "react";

export const MAX_LOGIN_ATTEMPTS = 3;
export const LOCK_SECONDS = 30;

/** Counts failed logins and locks the form for a short time after too many. */
export function useLoginLockout() {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function registerFailure() {
    const next = failedAttempts + 1;

    if (next >= MAX_LOGIN_ATTEMPTS) {
      setFailedAttempts(0);
      setSecondsLeft(LOCK_SECONDS);
    } else {
      setFailedAttempts(next);
    }
  }

  function reset() {
    setFailedAttempts(0);
  }

  return {
    isLocked: secondsLeft > 0,
    secondsLeft,
    failedAttempts,
    attemptsLeft: MAX_LOGIN_ATTEMPTS - failedAttempts,
    registerFailure,
    reset,
  };
}
