
import { Suspense } from "react";
import LawyerProfileScreen from "@/features/lawyers/components/LawyerProfileScreen";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function LawyerProfileContent({ params }: PageProps) {
  const { id } = await params;

  return <LawyerProfileScreen lawyerId={Number(id)} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading lawyer profile...</div>}>
      <LawyerProfileContent params={params} />
    </Suspense>
  );
}
