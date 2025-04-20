
import { supabase, getUserProfile } from "@/lib/supabase";
import { AuthResult } from "../types";
import { UserRole } from "@/utils/accessControl";
import { useToast } from "@/hooks/use-toast";

export function useRegisterMethods(setUser: Function) {
  const { toast } = useToast();
  
  const register = async (userData: { 
    email: string; 
    password: string; 
    role?: UserRole; 
    name?: string 
  }): Promise<AuthResult> => {
    try {
      console.log("Registering new user:", userData.email, "with role:", userData.role || UserRole.CLIENT);
      
      // Assurer qu'un rôle est toujours défini
      const userRole = userData.role || UserRole.CLIENT;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userRole
          }
        }
      });
      
      if (error) {
        console.error("Registration error:", error);
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive"
        });
        return {
          success: false,
          message: error.message
        };
      }
      
      if (!data.user) {
        console.error("Registration failed - no user returned");
        return {
          success: false,
          message: "L'inscription a échoué"
        };
      }

      // Si l'inscription est réussie mais nécessite une confirmation par email
      if (data?.user && !data?.session) {
        console.log("Registration successful, email confirmation required");
        toast({
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte."
        });
        return {
          success: true,
          message: "Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte."
        };
      }

      console.log("Registration with auto-confirmation successful");
      
      // Mettre à jour le profil utilisateur dans la base de données
      if (data.user.id) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ 
              role: userRole,
              name: userData.name || null 
            })
            .eq('id', data.user.id);
            
          if (profileError) {
            console.error("Error updating user profile:", profileError);
          }
        } catch (profileUpdateError) {
          console.error("Failed to update profile after registration:", profileUpdateError);
        }
      }
      
      // Récupérer le profil mis à jour
      const { profile } = await getUserProfile(data.user.id);
      
      toast({
        title: "Inscription réussie",
        description: "Vous êtes maintenant connecté."
      });
      
      // Si l'inscription réussit, mettre à jour l'utilisateur
      if (profile) {
        setUser(profile);
      }
      
      return {
        success: true,
        user: profile,
        message: "Inscription réussie. Vous êtes maintenant connecté."
      };
    } catch (error) {
      console.error("Unexpected registration error:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "L'inscription a échoué",
        variant: "destructive"
      });
      return {
        success: false,
        message: error instanceof Error ? error.message : "L'inscription a échoué"
      };
    }
  };

  return { register };
}
