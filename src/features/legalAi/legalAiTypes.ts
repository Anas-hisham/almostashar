/* ---------- requests ---------- */

export interface LegalAiChatRequest {
  query: string;
}

/* ---------- responses ----------
 * Unlike the other features, these are declared in Swagger (snake_case, NOT wrapped in
 * `{ success, value }`), so they match the backend exactly.
 */

export interface LegalAiSource {
  law_name?: string | null;
  article_number?: string | null;
  title?: string | null;
  source_url?: string | null;
  legal_domain?: string | null;
}

export interface LegalAiLlm {
  called: boolean;
  succeeded: boolean;
  provider?: string | null;
  model?: string | null;
}

export interface LegalAiAnswerParts {
  intro?: string | null;
  section_title?: string | null;
  bullets: string[];
  legal_basis?: string | null;
  note?: string | null;
}

export interface LegalAiChatResponse {
  answer_mode?: string | null;
  final_answer?: string | null;
  warning?: string | null;
  is_legal_question: boolean;
  is_supported_by_internal_sources: boolean;
  is_out_of_internal_corpus: boolean;
  sources: LegalAiSource[];
  llm: LegalAiLlm;
  answer_parts: LegalAiAnswerParts;
}

export interface LegalAiInfoResponse {
  service?: string | null;
  app_name?: string | null;
  status?: string | null;
  description?: string | null;
  llm_provider?: string | null;
  retrieval_backend?: string | null;
  embedding_backend?: string | null;
  answer_modes: string[];
  supported_internal_domains: string[];
  out_of_internal_corpus_examples: string[];
}

export interface LegalAiHealthResponse {
  status?: string | null;
  service?: string | null;
}
