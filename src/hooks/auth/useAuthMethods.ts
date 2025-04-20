
import { useLoginMethods } from './methods/useLoginMethods';
import { useLogoutMethods } from './methods/useLogoutMethods';
import { useRegisterMethods } from './methods/useRegisterMethods';

export function useAuthMethods() {
  // Destructurer les méthodes des hooks sous-jacents
  const setUser = (user: any) => {
    if (user) {
      // Stocker l'utilisateur dans localStorage pour les comptes de démo
      if (user.id?.toString().startsWith('demo-')) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('weddingPlannerAdminUser');
    }
  };

  const { login, loginWithProvider } = useLoginMethods(setUser);
  const { logout } = useLogoutMethods(setUser);
  const { register } = useRegisterMethods(setUser);

  return {
    login,
    logout,
    loginWithProvider,
    register
  };
}
