import UserAvatar from "@/shared/components/ui/UserAvatar";

/** First letter of the name without the "د." title: "د. محمد" → "م". */
export function lawyerInitial(fullName: string) {
  return fullName.replace(/^د\.?\s*/, "").trim().charAt(0);
}

type LawyerAvatarProps = {
  fullName: string;
  image?: string | null;
  /** Size + letter size, e.g. "size-[113px] text-[43px]". */
  className: string;
};

/** Green circle with the gold initial (Figma). Shows the photo instead when the lawyer has one. */
export default function LawyerAvatar({ fullName, image, className }: LawyerAvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand font-black leading-none text-gold-light ${className}`}
    >
      {image ? <UserAvatar src={image} alt={fullName} /> : <span aria-hidden="true">{lawyerInitial(fullName)}</span>}
    </div>
  );
}
