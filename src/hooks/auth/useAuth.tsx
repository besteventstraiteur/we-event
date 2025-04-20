
import { useAuthState } from "./useAuthState";
import { useAuthMethods } from "./useAuthMethods";
import { usePermissions } from "./usePermissions";
import { AuthContextType } from "./types/authContext.types";

export const useAuth = (): AuthContextType => {
  const { user, session, isLoading } = useAuthState();
  const { login, logout, loginWithProvider, register } = useAuthMethods();
  const { hasRole, hasPermission, hasPartnerType } = usePermissions(user);

  const updateUser = async (updatedFields: any): Promise<void> => {
    if (!user) return;
    
    try {
      console.log('Updating user profile:', updatedFields);
      // For this implementation, just update the user object in memory
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    loginWithProvider,
    register,
    hasRole,
    hasPermission,
    hasPartnerType,
    updateUser
  };
};

export default useAuth;
