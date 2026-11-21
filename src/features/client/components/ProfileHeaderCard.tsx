import Link from "next/link";
import { Camera, Mail, MapPin, Pencil } from "lucide-react";
import UserAvatar from "@/shared/components/ui/UserAvatar";
import { Skeleton } from "@/shared/components/ui/Skeleton";

export type ProfileHeaderData = {
  name: string;
  email?: string | null;
  image?: string | null;
  place?: string;
};

/** Photo, name, email, place and the edit button. Used by the client and lawyer profiles. */
export function ProfileHeaderCard({
  data,
  editHref,
}: {
  data: ProfileHeaderData | null;
  editHref: string;
}) {
  return (
    <section className="flex items-center gap-4 rounded-[1.25rem] bg-white p-5 sm:gap-6 sm:p-6">
      <div className="relative shrink-0">
        <div className="size-24 overflow-hidden rounded-full bg-brand sm:size-28">
          {data?.image ? (
            <UserAvatar src={data.image} alt={data.name} />
          ) : (
            <span className="flex h-full items-center justify-center text-5xl font-black text-gold-light">
              {data?.name?.[0] ?? ""}
            </span>
          )}
        </div>
        <Link
          href={editHref}
          aria-label="تغيير الصورة"
          className="absolute -bottom-1 start-0 flex size-9 items-center justify-center rounded-full bg-white text-brand shadow"
        >
          <Camera className="size-4" />
        </Link>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {data ? (
          <h2 className="truncate text-2xl font-extrabold text-black sm:text-3xl">{data.name}</h2>
        ) : (
          <Skeleton className="h-8 w-40" />
        )}

        {data?.email && (
          <p className="flex items-center gap-2 text-sm font-bold text-black/50" dir="ltr">
            <Mail className="size-4 shrink-0 text-black" />
            <span className="truncate">{data.email}</span>
          </p>
        )}
        {data?.place && (
          <p className="flex items-center gap-2 text-sm font-bold text-black/50">
            <MapPin className="size-4 shrink-0 text-black" />
            {data.place}
          </p>
        )}

        <Link
          href={editHref}
          className="mt-1 flex h-11 w-fit items-center gap-2 rounded-full border-2 border-line bg-surface px-5 text-sm font-semibold text-black"
        >
          <Pencil className="size-4" />
          تعديل الملف الشخصي
        </Link>
      </div>
    </section>
  );
}
