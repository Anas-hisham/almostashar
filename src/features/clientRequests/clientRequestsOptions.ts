import { CommunicationMethod, RequestUrgency } from "@/shared/types/enums";
import type { LawyerProfile } from "@/features/lawyers/lawyersTypes";
import type { CreateDirectRequest } from "@/features/clientRequests/clientRequestsTypes";

/** How the client wants the lawyer to answer (the three cards of the booking form). */
export type ResponseMethod = "Video" | "Office" | "Text";

/** In the order the cards appear (right to left). */
export const RESPONSE_METHODS: { value: ResponseMethod; label: string }[] = [
  { value: "Video", label: "مكالمة أونلاين" },
  { value: "Office", label: "زيارة المكتب" },
  { value: "Text", label: "رد مكتوب" },
];

/**
 * The backend knows Video / Voice / Text only. "Office visit" is sent as Voice and the real choice
 * travels in `requestDetails.responseMethod` — change here if the backend adds an office option.
 */
const COMMUNICATION: Record<ResponseMethod, CommunicationMethod> = {
  Video: CommunicationMethod.Video,
  Office: CommunicationMethod.Voice,
  Text: CommunicationMethod.Text,
};

type BookingValues = {
  serviceId: number;
  method: ResponseMethod;
  summary: string;
  deadline?: string;
  attachmentIds: number[];
};

/** Maps the booking form to the POST /api/client/requests/direct body. */
export function buildDirectRequest(
  lawyer: LawyerProfile,
  serviceTitle: string | null | undefined,
  legalServiceId: number,
  values: BookingValues,
): CreateDirectRequest {
  return {
    lawyerId: lawyer.id,
    legalServiceId,
    title: serviceTitle ?? undefined,
    problemDetails: values.summary,
    // The form has no place fields: the request uses the lawyer's governorate / city.
    governorateId: lawyer.governorateId ?? 0,
    cityId: lawyer.cityId ?? 0,
    clientDeadline: values.deadline ? new Date(values.deadline).toISOString() : undefined,
    preferredCommunicationMethod: COMMUNICATION[values.method],
    urgency: RequestUrgency.Normal,
    requestDetails: { responseMethod: values.method },
    attachmentIds: values.attachmentIds,
  };
}
