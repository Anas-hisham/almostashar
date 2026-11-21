"use client";

import { useCallback, useEffect, useState } from "react";
import { feedbacksApi } from "@/features/feedbacks/feedbacksApi";
import type { Feedback } from "@/features/feedbacks/feedbacksTypes";

/** Client reviews of a lawyer: first page on mount, `loadMore` appends the next page. */
export function useLawyerReviews(lawyerId: number, pageSize = 2) {
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(
    async (cursor?: number) => {
      const page = await feedbacksApi.getFeedbacks({ lawyerId, pageSize, nextCursor: cursor });
      setReviews((prev) => (cursor ? [...prev, ...page.items] : page.items));
      setNextCursor(page.nextCursor ?? null);
    },
    [lawyerId, pageSize],
  );

  useEffect(() => {
    if (lawyerId) load().catch(() => setReviews([]));
  }, [lawyerId, load]);

  async function loadMore() {
    if (!nextCursor) return;
    setLoadingMore(true);
    try {
      await load(nextCursor);
    } finally {
      setLoadingMore(false);
    }
  }

  return { reviews, hasMore: nextCursor !== null, loadingMore, loadMore };
}
