
import { UserRole } from "@/utils/accessControl";

export function usePermissions(user: any) {
  const hasRole = (role: UserRole | string) => {
    if (!user) return false;
    
    // Normaliser le rôle demandé pour la comparaison (en majuscules)
    const normalizedRequestedRole = String(role).toUpperCase();
    
    // Vérifier le rôle dans plusieurs emplacements possibles
    const userRole = 
      user.role || // Champ principal
      user.user_metadata?.role || // Métadonnées normalisées
      user.raw_user_meta_data?.role; // Format brut (ancien)
    
    if (!userRole) return false;
    
    // Normaliser le rôle de l'utilisateur pour la comparaison
    const normalizedUserRole = String(userRole).toUpperCase();
    
    // Comparer les rôles normalisés
    return normalizedUserRole === normalizedRequestedRole;
  };

  const hasPartnerType = (partnerType: string) => {
    if (!user || !hasRole(UserRole.PARTNER)) return false;
    
    const userPartnerType = 
      user.partner_type || 
      user.user_metadata?.partner_type ||
      user.raw_user_meta_data?.partner_type;
    
    // Comparaison insensible à la casse pour plus de robustesse
    return String(userPartnerType).toLowerCase() === String(partnerType).toLowerCase();
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
