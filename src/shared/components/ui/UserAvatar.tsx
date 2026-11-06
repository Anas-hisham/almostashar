"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/constants/appUrl";

/** Backend may return a relative path ("uploads/a.jpg") — make it a full URL. */
function resolveImageUrl(src?: string | null): string | null {
  if (!src || !src.trim()) return null;
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  return `${API_BASE_URL}/${src.replace(/^\/+/, "")}`;
}

/**
 * Inline SVG of the "unknown user" avatar (same artwork as
 * /public/images/icons/user.svg). Inline = no file path, no next/image,
 * no 404 — it always renders.
 */
export function DefaultAvatarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#0f382c"
        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10s10-4.49 10-10S17.51 2 12 2m0 5c1.73 0 3 1.27 3 3s-1.27 3-3 3s-3-1.27-3-3s1.27-3 3-3m0 13a7.98 7.98 0 0 1-5.48-2.18C7.33 16.16 9.03 15 11 15h2c1.97 0 3.66 1.16 4.47 2.82A7.94 7.94 0 0 1 12 20"
      />
    </svg>
  );
}

interface UserAvatarProps {
  /** profile image from the user object; empty/missing → default avatar */
  src?: string | null;
  alt?: string;
}

/** Fills its parent box: profile photo, or the default avatar if missing / broken. */
export default function UserAvatar({ src, alt = "" }: UserAvatarProps) {
  const url = resolveImageUrl(src);
  // remember which URL failed, so a new URL gets a fresh try
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  if (!url || failedUrl === url) {
    return <DefaultAvatarIcon className="h-full w-full p-[3px]" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote host unknown, avoids next/image domain config
    <img
      src={url}
      alt={alt}
      onError={() => setFailedUrl(url)}
      className="h-full w-full object-cover"
    />
  );
}
