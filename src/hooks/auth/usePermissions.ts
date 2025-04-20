
import { UserRole } from "@/utils/accessControl";

export function usePermissions(user: any) {
  const hasRole = (role: UserRole) => {
    if (!user) return false;
    
    // Vérifier le rôle dans plusieurs emplacements possibles
    const userRole = 
      user.role || // Champ principal
      user.user_metadata?.role || // Métadonnées normalisées
      user.raw_user_meta_data?.role; // Métadonnées brutes (format Supabase)
    
    if (!userRole) return false;
    return String(userRole).toLowerCase() === String(role).toLowerCase();
  };

  const hasPartnerType = (partnerType: string) => {
    if (!user || !hasRole(UserRole.PARTNER)) return false;
    const userPartnerType = 
      user.partner_type || 
      user.user_metadata?.partner_type ||
      user.raw_user_meta_data?.partner_type;
    return userPartnerType === partnerType;
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (hasRole(UserRole.ADMIN)) return true; // Les admins ont toutes les permissions
    
    const permissions = 
      user.permissions || 
      user.user_metadata?.permissions ||
      user.raw_user_meta_data?.permissions;
      
    if (!permissions) return false;
    return Array.isArray(permissions) && permissions.includes(permission);
  };

  return { hasRole, hasPermission, hasPartnerType };
}
