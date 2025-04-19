
import { Profile } from "@/lib/supabase";
import { AuthResult, LoginCredentials } from "../../types";

export function useDemoLogin(setUser: Function) {
  const handleDemoLogin = async (credentials: LoginCredentials): Promise<AuthResult> => {
    if (!credentials.email.includes("admin@") && 
        !credentials.email.includes("partner@") && 
        !credentials.email.includes("client@")) {
      return {
        success: false,
        message: "Not a demo account"
      };
    }

    if (credentials.password !== "password123") {
      return {
        success: false,
        message: "Mot de passe incorrect pour le compte de démonstration"
      };
    }

    let role = "client";
    if (credentials.email.includes("admin@")) {
      role = "admin";
    } else if (credentials.email.includes("partner@")) {
      role = "partner";
    }

    const demoUser = {
      id: `demo-${Date.now()}`,
      email: credentials.email,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      avatar_url: null,
      role: role.toUpperCase(),
      partner_type: null,
      phone: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (credentials.rememberMe) {
      localStorage.setItem("weddingPlannerEmail", credentials.email);
      localStorage.setItem("weddingPlannerRememberMe", "true");
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(demoUser);

    return {
      success: true,
      user: demoUser
    };
  };

  return { handleDemoLogin };
}
