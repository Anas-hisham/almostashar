"use client";

import { useEffect, useState } from "react";

/** Counts down from `seconds` to 0 as soon as it mounts. `restart()` starts over. */
export function useCountdown(seconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return {
    secondsLeft,
    isRunning: secondsLeft > 0,
    restart: () => setSecondsLeft(seconds),
  };
}
