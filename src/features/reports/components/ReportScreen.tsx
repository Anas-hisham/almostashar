"use client";

import { useLawyerProfile } from "@/features/lawyers/hooks/useLawyerProfile";
import ReportForm from "@/features/reports/components/ReportForm";
import TaupePage from "@/shared/components/layout/TaupePage";
import Alert from "@/shared/components/ui/feedback/Alert";
import { ProfileSkeleton } from "@/shared/components/ui/Skeleton";

export default function ReportScreen({ lawyerId }: { lawyerId: number }) {
  const { lawyer, loading, failed } = useLawyerProfile(lawyerId);

  return (
    <TaupePage maxWidth="max-w-[597px]">
      {loading ? (
        <ProfileSkeleton />
      ) : failed || !lawyer ? (
        <Alert title="تعذر تحميل بيانات المحامي" description="ارجع لصفحة المحامي وحاول مرة أخري." />
      ) : (
        <ReportForm lawyerId={lawyerId} lawyerName={lawyer.fullName} />
      )}
    </TaupePage>
  );
}
