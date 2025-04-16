
import { useCallback } from "react";
import { Profile } from "@/lib/supabase";
import { UserRole } from "@/utils/accessControl";

export function usePermissions(user: Profile | null) {
  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    
    const userRoleStr = String(user.role || '').toLowerCase();
    const checkRoleStr = String(role || '').toLowerCase();
    
    console.log("useAuth hasRole - Comparing roles:", userRoleStr, checkRoleStr, userRoleStr === checkRoleStr);
    
    return userRoleStr === checkRoleStr;
  }, [user]);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    
    // Les administrateurs ont toutes les permissions
    if (String(user.role).toLowerCase() === 'admin') return true;
    
    return false;
  }, [user]);

  return {
    hasRole,
    hasPermission
  };
}
