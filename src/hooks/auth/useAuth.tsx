
import { useAuthState } from "./useAuthState";
import { useAuthMethods } from "./useAuthMethods";
import { usePermissions } from "./usePermissions";

export function useAuth() {
  const { user, session, isLoading } = useAuthState();
  const { login, logout, loginWithProvider, register } = useAuthMethods();
  const { hasRole, hasPermission, hasPartnerType } = usePermissions(user);

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
    hasPartnerType
  };
}

export default useAuth;
