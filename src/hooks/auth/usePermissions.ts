
import { UserRole } from "@/utils/accessControl";

export function usePermissions(user: any) {
  const hasRole = (role: UserRole) => {
    if (!user) return false;
    const userRole = user.user_metadata?.role || user.role;
    if (!userRole) return false;
    return String(userRole).toLowerCase() === String(role).toLowerCase();
  };

  const hasPartnerType = (partnerType: string) => {
    if (!user || !hasRole(UserRole.PARTNER)) return false;
    const userPartnerType = user.partner_type || user.user_metadata?.partner_type;
    return userPartnerType === partnerType;
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (hasRole(UserRole.ADMIN)) return true;
    const permissions = user.permissions || user.user_metadata?.permissions;
    if (!permissions) return false;
    return Array.isArray(permissions) && permissions.includes(permission);
  };

  return { hasRole, hasPermission, hasPartnerType };
}
