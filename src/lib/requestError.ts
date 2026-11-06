import { isAxiosError } from "axios";

export const NETWORK_ERROR = "تعذر الاتصال بالخادم، حاول مرة أخري";

/** Message to show for a failed request: "no connection" if the server was unreachable, else `fallback`. */
export function getRequestError(error: unknown, fallback: string): string {
  return isAxiosError(error) && !error.response ? NETWORK_ERROR : fallback;
}
