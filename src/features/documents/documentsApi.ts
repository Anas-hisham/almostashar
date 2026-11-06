import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import type { ApiResponse } from "@/features/admin/adminTypes";
import type {
  GetPresignedUrlByPathRequest,
  GetPresignedUrlRequest,
  PresignedUrl,
  UploadDocumentRequest,
  UploadedDocument,
} from "@/features/documents/documentsTypes";

export const documentsApi = {
  upload: async (body: UploadDocumentRequest): Promise<UploadedDocument> => {
    const formData = new FormData();
    formData.append("File", body.File);

    const { data } = await api.post<ApiResponse<UploadedDocument>>(
      API_ENDPOINTS.DOCUMENTS.UPLOAD,
      formData,
    );
    return data.value;
  },

  /** Temporary download link for a document you know the id of. */
  getPresignedUrl: async (body: GetPresignedUrlRequest): Promise<PresignedUrl> => {
    const { data } = await api.post<ApiResponse<PresignedUrl>>(
      API_ENDPOINTS.DOCUMENTS.PRESIGNED_URL,
      body,
    );
    return data.value;
  },

  /** Temporary download link for a stored file path (e.g. a profile photo path). */
  getPresignedUrlByPath: async (body: GetPresignedUrlByPathRequest): Promise<PresignedUrl> => {
    const { data } = await api.post<ApiResponse<PresignedUrl>>(
      API_ENDPOINTS.DOCUMENTS.PRESIGNED_URL_BY_PATH,
      body,
    );
    return data.value;
  },

  deleteDocument: async (documentId: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.DOCUMENTS.BY_ID(documentId));
  },
};
