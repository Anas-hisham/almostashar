/**
 * Every backend URL in one place, grouped by feature folder (src/features/<name>).
 * Static paths are strings; paths with ids are functions.
 * NOT listed on purpose: POST /api/Payments/paymob-webhook (called by Paymob's server, never by the UI)
 * and GET / (health ping).
 */
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER_CLIENT: "/api/auth/register/client",
        REGISTER_LAWYER: "/api/auth/register/lawyer",
        LOGIN: "/api/auth/login",
        LOGOUT: "/api/auth/logout",
        REFRESH: "/api/auth/refresh",
        VERIFY_EMAIL: "/api/auth/verify-email",
        RESEND_VERIFICATION: "/api/auth/resend-verification",
        FORGOT_PASSWORD: "/api/auth/forgot-password",
        VERIFY_OTP: "/api/auth/verify-otp",
        RESET_PASSWORD: "/api/auth/reset-password",
        UPLOAD_IDENTITY_DOCUMENTS: "/api/auth/upload-identity-documents",
    },
    ADMIN: {
        REGISTER: "/api/admin/register",
        VERIFY_LAWYER: "/api/admin/lawyers/verify",
        UNVERIFIED_LAWYERS: "/api/admin/lawyers/unverified",
        LAWYER_BY_ID: (id: number) => `/api/admin/lawyers/${id}`,
        USERS: "/api/admin/users",
    },
    DISPUTES: {
        /** Admin */
        ADMIN_LIST: "/api/admin/disputes",
        ADMIN_BY_ID: (id: number) => `/api/admin/disputes/${id}`,
        ADMIN_RESOLVE: (id: number) => `/api/admin/disputes/${id}/resolve`,
        /** Client / lawyer opens a dispute on a case */
        OPEN_FOR_CASE: (caseId: number) => `/api/cases/${caseId}/disputes`,
    },
    ESCROWS: {
        /** Admin */
        ADMIN_BY_ID: (escrowId: number) => `/api/admin/escrows/${escrowId}`,
        ADMIN_RELEASE: (escrowId: number) => `/api/admin/escrows/${escrowId}/release`,
        ADMIN_REFUND: (escrowId: number) => `/api/admin/escrows/${escrowId}/refund`,
        ADMIN_MARK_DISPUTED: (escrowId: number) => `/api/admin/escrows/${escrowId}/mark-disputed`,
        /** Client */
        BY_REQUEST: (requestId: number) => `/api/client/requests/${requestId}/escrow`,
    },
    PAYMENTS: {
        ADMIN_REFUND: (paymentId: number) => `/api/admin/payments/${paymentId}/refund`,
        FINISHED: "/api/Payments/finished",
        /** Development only: marks an invoice as paid without Paymob. */
        SIMULATE_PAID: (invoiceId: number) =>
            `/api/Payments/development/invoices/${invoiceId}/simulate-paid`,
    },
    WITHDRAWALS: {
        /** Admin side of withdrawals (the lawyer side is in WALLET) */
        LIST: "/api/admin/withdrawals",
        BY_ID: (id: number) => `/api/admin/withdrawals/${id}`,
        APPROVE: (id: number) => `/api/admin/withdrawals/${id}/approve`,
        REJECT: (id: number) => `/api/admin/withdrawals/${id}/reject`,
        MARK_PAID: (id: number) => `/api/admin/withdrawals/${id}/mark-paid`,
    },
    WALLET: {
        /** Lawyer */
        WALLET: "/api/lawyer/wallet",
        TRANSACTIONS: "/api/lawyer/wallet/transactions",
        WITHDRAWALS: "/api/lawyer/wallet/withdrawals",
        CANCEL_WITHDRAWAL: (id: number) => `/api/lawyer/wallet/withdrawals/${id}/cancel`,
    },
    REPORTS: {
        CREATE: "/api/reports",
        ADMIN_LIST: "/api/reports/admin",
        ADMIN_BY_ID: (id: number) => `/api/reports/admin/${id}`,
        ADMIN_STATUS: (id: number) => `/api/reports/admin/${id}/status`,
    },
    CASES: {
        /** POST creates, GET lists (with filters) */
        ROOT: "/api/cases",
        MY_CASES: "/api/cases/my-cases",
        BY_ID: (caseId: number) => `/api/cases/${caseId}`,
        START: (caseId: number) => `/api/cases/${caseId}/start`,
        CANCEL: (caseId: number) => `/api/cases/${caseId}/cancel`,
        FINISH: (caseId: number) => `/api/cases/${caseId}/finish`,
        CONFIRM_COMPLETION: (caseId: number) => `/api/cases/${caseId}/confirm-completion`,
        NOTES: (caseId: number) => `/api/cases/${caseId}/notes`,
        NOTE: (caseId: number, noteId: number) => `/api/cases/${caseId}/notes/${noteId}`,
        TIMELINE: (caseId: number) => `/api/cases/${caseId}/timeline`,
        DOCUMENTS: (caseId: number) => `/api/cases/${caseId}/documents`,
        DOCUMENT: (caseId: number, documentId: number) =>
            `/api/cases/${caseId}/documents/${documentId}`,
    },
    CHATS: {
        LIST: "/api/Chats",
        MESSAGES: "/api/Chats/Messages",
        MARK_READ: (chatId: number, lastReadMessageId: number) =>
            `/api/Chats/${chatId}/messages/${lastReadMessageId}/mark-read`,
        START_CALL: (chatId: number) => `/api/Chats/${chatId}/call`,
        ACCEPT_CALL: (callId: number) => `/api/Chats/calls/${callId}/accept`,
        REJECT_CALL: (callId: number) => `/api/Chats/calls/${callId}/reject`,
        END_CALL: (callId: number) => `/api/Chats/calls/${callId}/end`,
    },
    CLIENT: {
        HOME_ANALYTICS: "/api/client/home/analytics",
        HOME_RECENT_UPDATES: "/api/client/home/recent-updates",
        /** GET reads, PUT updates (multipart) */
        PROFILE: "/api/client/profile",
        CHANGE_PASSWORD: "/api/client/profile/change-password",
    },
    CLIENT_REQUESTS: {
        /** GET lists the client's requests */
        ROOT: "/api/client/requests",
        CREATE_DIRECT: "/api/client/requests/direct",
        CREATE_BROADCAST: "/api/client/requests/broadcast",
        CANCEL: (id: number) => `/api/client/requests/${id}/cancel`,
        PAY_INVOICE: (invoiceId: number) => `/api/client/requests/invoices/${invoiceId}/pay`,
        OFFERS: "/api/client/requests/offers",
        ACCEPT_OFFER: (offerId: number) => `/api/client/requests/offers/${offerId}/accept`,
        REJECT_OFFER: (offerId: number) => `/api/client/requests/offers/${offerId}/reject`,
        LAWYERS_BY_SERVICE: (serviceId: number) =>
            `/api/client/requests/lawyers-by-service/${serviceId}`,
    },
    LAWYER_REQUESTS: {
        ACCEPT: (id: number) => `/api/lawyer/requests/${id}/accept`,
        REJECT: (id: number) => `/api/lawyer/requests/${id}/reject`,
        SEND_OFFER: (id: number) => `/api/lawyer/requests/${id}/offers`,
        BROADCAST_AVAILABLE: "/api/lawyer/requests/broadcast/available",
        DIRECT_INCOMING: "/api/lawyer/requests/direct/incoming",
    },
    LAWYERS: {
        /** Public directory */
        LIST: "/api/Lawyers",
        PROFILE: (lawyerId: number) => `/api/Lawyers/${lawyerId}/profile`,
        /** The logged-in lawyer */
        EDIT_PROFILE: "/api/Lawyers/edit-profile",
        HOME_ANALYTICS: "/api/Lawyers/home/analytics",
        SPECIALIZATIONS: "/api/Lawyers/specializations",
        HOME_ACTIVE_CASES: "/api/lawyer/home/active-cases",
    },
    LAWYER_SERVICES: {
        /** POST adds, GET lists the logged-in lawyer's services */
        ROOT: "/api/lawyer-services",
        BY_ID: (serviceId: number) => `/api/lawyer-services/${serviceId}`,
    },
    LEGAL_SERVICES: {
        /** POST adds (admin), GET lists the catalog */
        ROOT: "/api/legal-services",
        TYPES: "/api/legal-services/types",
    },
    LOOKUPS: {
        GOVERNORATES: "/api/lookups/governorates",
        CITIES: "/api/lookups/cities",
        SPECIALIZATIONS: "/api/specializations",
    },
    DOCUMENTS: {
        UPLOAD: "/api/documents/upload",
        PRESIGNED_URL: "/api/documents/presigned-url",
        PRESIGNED_URL_BY_PATH: "/api/documents/PreSignedUrl",
        BY_ID: (documentId: number) => `/api/documents/${documentId}`,
    },
    FEEDBACKS: {
        /** POST creates, GET lists */
        ROOT: "/api/client/feedbacks",
    },
    NOTIFICATIONS: {
        ROOT: "/api/notifications",
        FCM_TOKEN: "/api/notifications/fcm-token",
        MARK_AS_READ: "/api/notifications/mark-as-read",
    },
    LEGAL_AI: {
        CHAT: "/api/legal-ai/chat",
        INFO: "/api/legal-ai/info",
        HEALTH: "/api/legal-ai/health",
        WARMUP: "/api/legal-ai/warmup",
    },
} as const;
