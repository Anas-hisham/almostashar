/**
 * Hands the just-registered email + password to the login form.
 * Kept in memory only (never in storage / URL) and read once.
 */
let pending: { email: string; password: string } | null = null;

export function setLoginPrefill(value: { email: string; password: string }) {
  pending = value;
}

export function takeLoginPrefill(): { email: string; password: string } | null {
  const value = pending;
  pending = null;
  return value;
}
