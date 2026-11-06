import Image from "next/image";

type AppLogoProps = {
  /** Image in /public. Login uses the scales logo, register uses the user-plus one. */
  src?: string;
};

export default function AppLogo({ src = "/images/logo.webp" }: AppLogoProps) {
  return <Image src={src} alt="AlMostashar" width={56} height={56} priority />;
}
