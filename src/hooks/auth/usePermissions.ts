
import { Profile } from "@/lib/supabase";
import { UserRole, Permission } from "@/utils/accessControl";

export function usePermissions(user: Profile | null) {
  // Vérification si l'utilisateur a un certain rôle
  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    
    // Normalisation des rôles pour la comparaison
    const userRole = String(user.role || "").toUpperCase();
    const requiredRole = String(role).toUpperCase();
    
    console.log("Role check:", { userRole, requiredRole });
    
    return userRole === requiredRole;
  };

  // Vérification si l'utilisateur a une certaine permission
  const hasPermission = (permission: Permission): boolean => {
    // Les administrateurs ont toutes les permissions
    if (hasRole(UserRole.ADMIN)) return true;
    
    // Implémentation de base - à étendre si nécessaire avec une vraie gestion des permissions
    switch (permission) {
      case Permission.VIEW_DASHBOARD:
        return !!user;
      case Permission.MANAGE_GUESTS:
        return hasRole(UserRole.CLIENT) || hasRole(UserRole.ADMIN);
      case Permission.MANAGE_REQUESTS:
        return hasRole(UserRole.PARTNER) || hasRole(UserRole.ADMIN);
      case Permission.MANAGE_CLIENTS:
      case Permission.MANAGE_PARTNERS:
      case Permission.MANAGE_ADMINS:
      case Permission.ACCESS_ADVANCED_SECURITY:
      case Permission.MANAGE_SYSTEM:
        return hasRole(UserRole.ADMIN);
      default:
        return false;
    }
  };

  // Vérification si le partenaire est d'un certain type
  const hasPartnerType = (partnerType: string): boolean => {
    if (!user) return false;
    if (!hasRole(UserRole.PARTNER)) return false;
    
    // Si l'utilisateur est partenaire, vérifier son type
    return user.partner_type === partnerType;
  };

  return {
    hasRole,
    hasPermission,
    hasPartnerType
  };
}
