import { Suspense } from "react";
import BookingScreen from "@/features/clientRequests/components/BookingScreen";

export default function Page() {
  // useSearchParams needs a Suspense boundary
  return (
    <Suspense>
      <BookingScreen />
    </Suspense>
  );
}
