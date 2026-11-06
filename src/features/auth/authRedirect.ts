import { ROUTES } from "@/constants";

/** Where to send a user right after login, based on their role. */
export function getHomeRoute(role: string): string {
  switch (role.toLowerCase()) {
    case "client":
      return ROUTES.clientHome;
    case "lawyer":
      return ROUTES.lawyerDashboard;
    case "admin":
      return ROUTES.adminUsers;
    default:
      return ROUTES.home;
  }
}
