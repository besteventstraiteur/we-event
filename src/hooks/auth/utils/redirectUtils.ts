
import { UserRole } from "@/utils/accessControl";

export const getRedirectPathForRole = (role: string): string => {
  const normalizedRole = String(role).toLowerCase().trim();
  
  console.log("Getting redirect path for role:", normalizedRole);
  
  switch (normalizedRole) {
    case 'admin':
      return '/admin/dashboard';
    case 'partner':
      return '/partner/dashboard';
    case 'client':
    default:
      return '/client/dashboard';
  }
};
