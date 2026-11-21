
"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ReportScreen from "@/features/reports/components/ReportScreen";

function ReportPageContent() {
  const { id } = useParams<{ id: string }>();

  return <ReportScreen lawyerId={Number(id)} />;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading report...</p>}>
      <ReportPageContent />
    </Suspense>
  );
}
