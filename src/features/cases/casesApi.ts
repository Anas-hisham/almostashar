import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type { AddCaseNoteRequest, AddCaseTimelineEventRequest, AttachCaseDocumentRequest, CancelCaseRequest, CaseDetails, CaseSummary, CasesPage, CreateCaseRequest, GetCasesParams } from "@/features/cases/casesTypes";

const { CASES } = API_ENDPOINTS;

export const casesApi = {
  createCase: async (body: CreateCaseRequest): Promise<void> => {
    await api.post(CASES.ROOT, body);
  },

  getCases: async (params: GetCasesParams = {}): Promise<CasesPage> => {
    const { data } = await api.get<ApiResponse<CasesPage>>(CASES.ROOT, { params });
    return data.value;
  },

  getMyCases: async (): Promise<CaseSummary[]> => {
    const { data } = await api.get<ApiResponse<CaseSummary[]>>(CASES.MY_CASES);
    return data.value;
  },

  getCaseById: async (caseId: number): Promise<CaseDetails> => {
    const { data } = await api.get<ApiResponse<CaseDetails>>(CASES.BY_ID(caseId));
    return data.value;
  },

  /* ----- case lifecycle ----- */

  startCase: async (caseId: number): Promise<void> => {
    await api.put(CASES.START(caseId));
  },

  cancelCase: async (caseId: number, body: CancelCaseRequest = {}): Promise<void> => {
    await api.put(CASES.CANCEL(caseId), body);
  },

  /** Lawyer says the work is done; the client then confirms with `confirmCompletion`. */
  finishCase: async (caseId: number): Promise<void> => {
    await api.put(CASES.FINISH(caseId));
  },

  /** Client confirms the work is done. */
  confirmCompletion: async (caseId: number): Promise<void> => {
    await api.post(CASES.CONFIRM_COMPLETION(caseId));
  },

  /* ----- notes / timeline / documents ----- */

  addNote: async (caseId: number, body: AddCaseNoteRequest): Promise<void> => {
    await api.post(CASES.NOTES(caseId), body);
  },

  deleteNote: async (caseId: number, noteId: number): Promise<void> => {
    await api.delete(CASES.NOTE(caseId, noteId));
  },

  addTimelineEvent: async (caseId: number, body: AddCaseTimelineEventRequest): Promise<void> => {
    await api.post(CASES.TIMELINE(caseId), body);
  },

  attachDocument: async (caseId: number, body: AttachCaseDocumentRequest): Promise<void> => {
    await api.post(CASES.DOCUMENTS(caseId), body);
  },

  removeDocument: async (caseId: number, documentId: number): Promise<void> => {
    await api.delete(CASES.DOCUMENT(caseId, documentId));
  },
};
