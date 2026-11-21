/** The backend may call the image field avatarUrl / profileImage / photo ...: take the first image-like string. */
export function pickImage(raw: Record<string, unknown>): string | null {
  const key = Object.keys(raw).find(
    (k) => /image|photo|avatar|picture/i.test(k) && typeof raw[k] === "string" && raw[k],
  );
  return key ? (raw[key] as string) : null;
}

/** First non-empty string field whose name matches `pattern` (the backend's field names are not documented). */
export function pickByName(raw: Record<string, unknown>, pattern: RegExp): string | null {
  const key = Object.keys(raw).find((k) => pattern.test(k) && typeof raw[k] === "string" && raw[k]);
  return key ? (raw[key] as string) : null;
}
