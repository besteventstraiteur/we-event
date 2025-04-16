
import { useCallback } from "react";
import { Profile } from "@/lib/supabase";
import { UserRole } from "@/utils/accessControl";

export function usePermissions(user: Profile | null) {
  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    
    // Standardiser les deux valeurs pour la comparaison
    const userRoleStr = String(user.role || '').toLowerCase().trim();
    const checkRoleStr = String(role || '').toLowerCase().trim();
    
    console.log("usePermissions hasRole - Comparing roles:", userRoleStr, checkRoleStr, userRoleStr === checkRoleStr);
    
    return userRoleStr === checkRoleStr;
  }, [user]);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    
    // Les administrateurs ont toutes les permissions
    if (String(user.role).toLowerCase().trim() === 'admin') return true;
    
    // Ajouter ici la logique pour vérifier d'autres permissions spécifiques
    
    return false;
  }, [user]);

  return {
    hasRole,
    hasPermission
  };
}
