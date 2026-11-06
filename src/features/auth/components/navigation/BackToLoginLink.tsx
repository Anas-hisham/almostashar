import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default function BackToLoginLink() {
  return (
    <Link
      href={ROUTES.login}
      className="flex items-center justify-center gap-2 text-base font-bold text-brand"
    >
      <Image src="/images/icons/arrow-right.svg" alt="" width={17} height={13} />
      رجوع الي تسجيل الدخول
    </Link>
  );
}
