
import { Permission, UserRole, PartnerType } from "@/utils/accessControl";

export function usePermissions(user: any) {
  const hasRole = (role: string): boolean => {
    if (!user) return false;
    
    // Get user role from metadata or direct property
    const userRole = typeof user.role === 'string' 
      ? user.role.toLowerCase() 
      : typeof user.user_metadata?.role === 'string' 
        ? user.user_metadata.role.toLowerCase() 
        : '';
        
    console.log("Checking role:", role, "against user role:", userRole);
    return userRole === role.toLowerCase();
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    // Admins have all permissions
    if (hasRole(UserRole.ADMIN)) return true;
    
    // Check in user permissions if available
    const userPermissions = user.permissions || user.user_metadata?.permissions;
    return userPermissions ? userPermissions.includes(permission) : false;
  };
  
  const hasPartnerType = (partnerType: PartnerType): boolean => {
    if (!user) return false;
    if (!hasRole(UserRole.PARTNER)) return false;
    
    const userPartnerType = user.partner_type || user.user_metadata?.partner_type;
    return userPartnerType === partnerType;
  };

  return {
    hasRole,
    hasPermission,
    hasPartnerType
  };
}
