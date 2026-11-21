export const ROUTES = {
  home: '/', login: '/login', register: '/register', forgotPassword: '/forgot-password', verifyEmail: '/verify-email',
  lawyers: '/lawyers', appointments: '/appointments', booking: '/booking', clientRequests: '/client/requests',
  lawyer: (id: number) => `/lawyers/${id}`,
  lawyerReport: (id: number) => `/lawyers/${id}/report`,
  /** Booking form of one lawyer; `serviceId` pre-selects a service. */
  bookLawyer: (lawyerId: number, serviceId?: number) =>
    `/booking?lawyerId=${lawyerId}${serviceId ? `&serviceId=${serviceId}` : ''}`,
  clientHome: '/client/home',
  clientProfile: '/client/profile', clientProfileEdit: '/client/profile/edit', clientSecurity: '/client/profile/security',
  notifications: '/notifications', help: '/help', lawyerDashboard: '/lawyer/dashboard',
  lawyerProfile: '/lawyer/profile', lawyerProfileEdit: '/lawyer/profile/edit',
  adminUsers: '/admin/users', legalAI: '/legal-ai',
  adminUnverifiedLawyers: '/admin/lawyers/unverified',
  adminLawyer: (id: number) => `/admin/lawyers/${id}`,
} as const;