import type { ReactNode } from "react";
import type { LawyerServiceItem } from "@/features/lawyerServices/lawyerServicesTypes";
import type { Feedback } from "@/features/feedbacks/feedbacksTypes";
import Price from "@/features/lawyers/components/Price";
import { ClockIcon, StarIcon } from "@/shared/components/ui/figmaIcons";

/** Heading with the gold bar on its start side. */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-[11px] text-[21px] font-semibold leading-normal text-black">
      <span aria-hidden="true" className="h-9 w-[6px] bg-gold-light" />
      {children}
    </h2>
  );
}

/** "3 أيام": the number is drawn in Inter like the design. */
function Duration({ text }: { text: string }) {
  const match = text.match(/^(\d+)(.*)$/);
  return match ? (
    <>
      <span className="font-inter">{match[1]}</span>
      {match[2]}
    </>
  ) : (
    <>{text}</>
  );
}

function ServiceRow({ service }: { service: LawyerServiceItem }) {
  return (
    <li className="flex min-h-[71px] items-center justify-between gap-4 rounded-xl border border-line px-[11px] py-2 text-black">
      <div className="flex min-w-0 flex-col gap-[6px] leading-normal">
        <p className="text-base font-semibold">{service.title}</p>
        {service.duration ? (
          <p className="flex items-center gap-[9px] text-xs font-medium text-black/60">
            <ClockIcon className="size-3 shrink-0 text-black/60" />
            <span>
              <Duration text={service.duration} />
            </span>
          </p>
        ) : (
          service.description && <p className="text-xs font-medium text-black/60">{service.description}</p>
        )}
      </div>
      <span className="text-base">
        <Price amount={service.price} />
      </span>
    </li>
  );
}

/** Five stars, filled from the start side. */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex shrink-0" role="img" aria-label={`${filled} من 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} className={`h-[17px] w-[18px] ${n <= filled ? "text-gold-light" : "text-[#c5c6c3]"}`} />
      ))}
    </div>
  );
}

type ServicesReviewsCardProps = {
  services: LawyerServiceItem[];
  reviews: Feedback[];
  hasMoreReviews: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
};

/** "الخدمات والأسعار" + "آراء العملاء" (Figma "Frame 273"). */
export default function ServicesReviewsCard({
  services,
  reviews,
  hasMoreReviews,
  loadingMore,
  onLoadMore,
}: ServicesReviewsCardProps) {
  return (
    <section className="flex flex-col gap-[21px] rounded-xl bg-white px-[21px] pb-6 pt-[30px]">
      <div className="flex flex-col gap-[19px]">
        <SectionTitle>الخدمات والأسعار</SectionTitle>
        {services.length > 0 ? (
          <ul className="flex flex-col gap-[15px]">
            {services.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </ul>
        ) : (
          <p className="py-4 text-center text-base font-medium text-black/50">لا توجد خدمات متاحة حاليًا.</p>
        )}
      </div>

      <hr className="border-line" />

      <div className="flex flex-col gap-[25px]">
        <SectionTitle>آراء العملاء</SectionTitle>

        {reviews.length === 0 && (
          <p className="py-4 text-center text-base font-medium text-black/50">لا توجد آراء بعد.</p>
        )}

        {reviews.length > 0 && (
          <ul className="divide-y divide-line border-t border-line">
            {reviews.map((review) => (
              <li key={review.id} className="flex items-center justify-between gap-6 py-[15px]">
                <div className="flex min-w-0 flex-col gap-[5px] text-base leading-normal">
                  <p className="font-semibold text-black">{review.clientName}</p>
                  {review.content && <p className="font-medium text-black/60">{review.content}</p>}
                </div>
                <Stars rating={review.rating} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasMoreReviews && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={loadingMore}
          className="self-center text-base font-medium text-black/40 disabled:opacity-60"
        >
          عرض المزيد.......
        </button>
      )}
    </section>
  );
}
