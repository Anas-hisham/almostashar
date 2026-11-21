import Link from "next/link";
import type { LawyerServiceItem } from "@/features/lawyerServices/lawyerServicesTypes";
import Price from "@/features/lawyers/components/Price";
import { buttonStyles } from "@/shared/components/ui/Button";
import { CalendarPlusIcon, FlagIcon } from "@/shared/components/ui/figmaIcons";
import { ROUTES } from "@/constants";

type BookingCardProps = {
  lawyerId: number;
  /** The lawyer's consultation service (gives the fee and pre-selects it in the booking form). */
  consultation?: LawyerServiceItem;
};

/** "حجز استشارة" side card of the public lawyer profile (Figma "Frame 242"). */
export default function BookingCard({ lawyerId, consultation }: BookingCardProps) {
  return (
    <aside className="flex flex-col items-center gap-[37px] rounded-xl bg-white px-[33px] py-[22px]">
      <div className="flex w-full flex-col gap-[31px]">
        <h2 className="flex items-center gap-[22px] text-[25px] font-bold leading-normal text-black">
          <CalendarPlusIcon className="size-[27px] shrink-0 text-gold-light" />
          حجز استشارة
        </h2>

        <div className="flex flex-col gap-[19px]">
          {consultation && (
            <div className="flex h-[79px] items-center justify-between rounded-[15px] border border-line bg-surface px-[34px] text-[21px] text-black">
              <span className="font-semibold">رسوم الاستشارة</span>
              <Price amount={consultation.price} />
            </div>
          )}

          <Link href={ROUTES.bookLawyer(lawyerId, consultation?.serviceId)} className={buttonStyles("primary", "lg")}>
            <CalendarPlusIcon className="size-[23px] shrink-0 text-gold-light" />
            احجز استشارة
          </Link>
        </div>
      </div>

      <Link href={ROUTES.bookLawyer(lawyerId)} className={buttonStyles("secondary", "lg")}>
        اطلب خدمة أخري
      </Link>

      <Link
        href={ROUTES.lawyerReport(lawyerId)}
        className="flex items-center gap-[10px] text-[21px] font-semibold leading-normal text-muted"
      >
        <FlagIcon className="h-[27px] w-[22px] shrink-0" />
        الإبلاغ عن هذا المحامي
      </Link>
    </aside>
  );
}
