/* ---------- requests ---------- */

export interface UploadDocumentRequest {
  File: File;
}

export interface GetPresignedUrlRequest {
  documentId: number;
  expirationMinutes?: number;
}

export interface GetPresignedUrlByPathRequest {
  filePath: string;
  expirationMinutes?: number;
}

/* ---------- responses (best guess, see note in lookupsTypes) ---------- */

/** What upload returns. The `id` is what you send as `attachmentIds` in requests / reports / disputes. */
export interface UploadedDocument {
  id: number;
  fileName?: string | null;
  url?: string | null;
}

export interface PresignedUrl {
  url: string;
}
