"use client";

import { ServiceType } from "@/shared/types/enums";
import { useLawyerProfile } from "@/features/lawyers/hooks/useLawyerProfile";
import { useLawyerReviews } from "@/features/feedbacks/hooks/useLawyerReviews";
import LawyerHeaderCard from "@/features/lawyers/components/LawyerHeaderCard";
import BookingCard from "@/features/lawyers/components/BookingCard";
import ServicesReviewsCard from "@/features/lawyers/components/ServicesReviewsCard";
import TaupePage from "@/shared/components/layout/TaupePage";
import Alert from "@/shared/components/ui/feedback/Alert";
import { ProfileSkeleton } from "@/shared/components/ui/Skeleton";

/** Public lawyer profile the client sees: header, services + reviews, booking card. */
export default function LawyerProfileScreen({ lawyerId }: { lawyerId: number }) {
  const { lawyer, loading, failed } = useLawyerProfile(lawyerId);
  const { reviews, hasMore, loadingMore, loadMore } = useLawyerReviews(lawyerId);

  return (
    <TaupePage maxWidth="max-w-[1245px]">
      {loading ? (
        <ProfileSkeleton />
      ) : failed || !lawyer ? (
        <Alert title="تعذر تحميل بيانات المحامي" description="حاول مرة أخري بعد قليل." />
      ) : (
        <div className="flex flex-col gap-[33px]">
          <LawyerHeaderCard lawyer={lawyer} />

          {/* RTL: the first column is on the right → services first, booking card on the left (as in Figma) */}
          <div className="grid items-start gap-[33px] lg:grid-cols-[2043fr_1592fr]">
            <ServicesReviewsCard
              services={(lawyer.services ?? []).filter((s) => s.isActive !== false)}
              reviews={reviews}
              hasMoreReviews={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMore}
            />
            <div className="lg:sticky lg:top-6">
              <BookingCard
                lawyerId={lawyerId}
                consultation={lawyer.services?.find((s) => s.serviceType === ServiceType.Consultation)}
              />
            </div>
          </div>
        </div>
      )}
    </TaupePage>
  );
}
