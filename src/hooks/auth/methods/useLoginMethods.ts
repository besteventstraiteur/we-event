
import { AuthResult, LoginCredentials } from "../types";
import { useDemoLogin } from "./demo/useDemoLogin";
import { useSocialLogin } from "./social/useSocialLogin";
import { useStandardLogin } from "./standard/useStandardLogin";

export function useLoginMethods(setUser: Function) {
  const { handleDemoLogin } = useDemoLogin(setUser);
  const { handleSocialLogin } = useSocialLogin();
  const { handleStandardLogin } = useStandardLogin(setUser);

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      console.log("Attempting to log in with:", credentials.email);
      
      // First try demo login
      const demoResult = await handleDemoLogin(credentials);
      if (demoResult.success || demoResult.message !== "Not a demo account") {
        return demoResult;
      }
      
      // If not a demo account, proceed with standard login
      return await handleStandardLogin(credentials);
    } catch (error) {
      console.error("Unexpected login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed"
      };
    }
  };

  return {
    login,
    loginWithProvider: handleSocialLogin
  };
}
