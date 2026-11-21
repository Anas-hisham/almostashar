"use client";

import { useSearchParams } from "next/navigation";
import { useLawyerProfile } from "@/features/lawyers/hooks/useLawyerProfile";
import BookingForm from "@/features/clientRequests/components/BookingForm";
import TaupePage from "@/shared/components/layout/TaupePage";
import Alert from "@/shared/components/ui/feedback/Alert";
import { ProfileSkeleton } from "@/shared/components/ui/Skeleton";

/** /booking?lawyerId=1&serviceId=2 — loads the lawyer, then shows the form. */
export default function BookingScreen() {
  const params = useSearchParams();
  const { lawyer, loading, failed } = useLawyerProfile(Number(params.get("lawyerId")));
  const serviceId = Number(params.get("serviceId")) || undefined;

  return (
    <TaupePage>
      {loading ? (
        <ProfileSkeleton />
      ) : failed || !lawyer ? (
        <Alert title="تعذر تحميل بيانات المحامي" description="ارجع لصفحة المحامي وحاول مرة أخري." />
      ) : (
        <BookingForm lawyer={lawyer} initialServiceId={serviceId} />
      )}
    </TaupePage>
  );
}
