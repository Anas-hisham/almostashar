export const ROUTES = {
  home: '/', login: '/login', register: '/register', forgotPassword: '/forgot-password', verifyEmail: '/verify-email',
  lawyers: '/lawyers', appointments: '/appointments',
  clientHome: '/client/home', lawyerDashboard: '/lawyer/dashboard',
  adminUsers: '/admin/users', legalAI: '/legal-ai',
  adminUnverifiedLawyers: '/admin/lawyers/unverified',
  adminLawyer: (id: number) => `/admin/lawyers/${id}`,
} as const;