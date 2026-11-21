import type { ReactNode } from "react";
import type { LawyerProfile } from "@/features/lawyers/lawyersTypes";
import LawyerAvatar from "@/features/lawyers/components/LawyerAvatar";
import { BriefcaseIcon, LicenseIcon, PinIcon, StarIcon } from "@/shared/components/ui/figmaIcons";

function Stat({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-base font-medium text-black/50">
      {icon}
      <span>{children}</span>
    </li>
  );
}

const gold = "shrink-0 text-gold-light";

/** Top card of the public lawyer profile (Figma "Frame 218"). */
export default function LawyerHeaderCard({ lawyer }: { lawyer: LawyerProfile }) {
  const specialization = lawyer.specializations?.map((s) => s.arabicTitle).join("، ");
  const about = lawyer.bio ?? lawyer.about;
  const place = lawyer.city ?? lawyer.governorate;
  const years = lawyer.yearsOfExperience;

  return (
    <section className="flex flex-col items-center gap-10 rounded-xl bg-white px-6 py-[18px] md:flex-row md:px-[49px]">
      <LawyerAvatar
        fullName={lawyer.fullName}
        image={lawyer.profileImage}
        className="size-[113px] text-[43px]"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-4 text-center md:text-start">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[32px] font-extrabold leading-normal text-black">{lawyer.fullName}</h1>
          {specialization && (
            <p className="text-[21px] font-medium leading-normal text-black/70">{specialization}</p>
          )}
        </div>

        {about && <p className="text-base font-medium leading-normal text-black/70">{about}</p>}

        <ul className="flex flex-wrap items-center justify-center gap-x-[46px] gap-y-3 md:justify-start">
          {place && <Stat icon={<PinIcon className={`h-[21px] w-[17px] ${gold}`} />}>{place}</Stat>}
          {years != null && (
            <Stat icon={<BriefcaseIcon className={`size-[18px] ${gold}`} />}>{years} سنة خبرة</Stat>
          )}
          {lawyer.licenseNumber && (
            <Stat icon={<LicenseIcon className={`h-[21px] w-[17px] ${gold}`} />}>
              ترخيص #{lawyer.licenseNumber}
            </Stat>
          )}
          {lawyer.rating != null && (
            <Stat icon={<StarIcon className={`h-[17px] w-[18px] ${gold}`} />}>
              <span className="font-inter">{lawyer.rating.toFixed(1)}</span>
            </Stat>
          )}
        </ul>
      </div>
    </section>
  );
}
