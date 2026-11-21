"use client";

import { useParams } from "next/navigation";
import ReportScreen from "@/features/reports/components/ReportScreen";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <ReportScreen lawyerId={Number(id)} />;
}
