
import { useLoginMethods } from "./methods/useLoginMethods";
import { useLogoutMethod } from "./methods/useLogoutMethod";
import { useRegisterMethod } from "./methods/useRegisterMethod";

export function useAuthMethods(setUser: Function) {
  const { login, loginWithProvider } = useLoginMethods(setUser);
  const logout = useLogoutMethod(setUser);
  const register = useRegisterMethod();

  return {
    login,
    loginWithProvider,
    logout,
    register
  };
}
