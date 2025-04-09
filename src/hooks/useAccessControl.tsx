
import { useState, useEffect, useCallback } from "react";
import { 
  UserRole, 
  Permission, 
  AccessControlUser, 
  hasPermission as userHasPermission,
  PartnerType 
} from "@/utils/accessControl";
import { useToast } from "@/components/ui/use-toast";

// Hook pour gérer le contrôle d'accès dans les composants
export function useAccessControl(initialUser?: AccessControlUser) {
  const [currentUser, setCurrentUser] = useState<AccessControlUser | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simuler le chargement de l'utilisateur depuis le stockage local
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        // Dans une implémentation réelle, cela viendrait d'une API ou d'un contexte
        const storedUser = localStorage.getItem('currentUser');
        const storedEmail = localStorage.getItem('weddingPlannerEmail');
        
        console.log("Access Control - Stored user:", storedUser);
        console.log("Access Control - Stored email:", storedEmail);
        
        // Si nous avons un utilisateur stocké, utilisons-le
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Access Control - Using stored user:", parsedUser);
          // Vérifier et corriger le rôle si nécessaire (pour s'assurer qu'il s'agit du bon objet UserRole)
          if (typeof parsedUser.role === 'string') {
            // Convertir la chaîne de caractères en enum UserRole
            if (parsedUser.role === 'admin') {
              parsedUser.role = UserRole.ADMIN;
            } else if (parsedUser.role === 'partner') {
              parsedUser.role = UserRole.PARTNER;
            } else if (parsedUser.role === 'client') {
              parsedUser.role = UserRole.CLIENT;
            }
          }
          setCurrentUser(parsedUser);
        } else {
          // Aucun utilisateur trouvé
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des informations utilisateur:", error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Vérifier si l'utilisateur est d'un type de partenaire spécifique
  const isPartnerType = useCallback((partnerType: PartnerType): boolean => {
    if (!currentUser || currentUser.role !== UserRole.PARTNER) return false;
    return currentUser.partnerType === partnerType || currentUser.partnerType === PartnerType.GENERAL;
  }, [currentUser]);

  // Fonction pour vérifier si l'utilisateur actuel a une permission
  const hasPermission = useCallback((permission: Permission, resourceOwnerId?: string): boolean => {
    if (!currentUser) return false;
    return userHasPermission(currentUser, permission, resourceOwnerId);
  }, [currentUser]);

  // Fonction pour vérifier l'accès avec message d'erreur
  const checkAccess = useCallback((permission: Permission, resourceOwnerId?: string): boolean => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette ressource",
      });
      return false;
    }

    const hasAccess = userHasPermission(currentUser, permission, resourceOwnerId);
    
    if (!hasAccess) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous n'avez pas les permissions nécessaires pour cette action",
      });
      return false;
    }
    
    return true;
  }, [currentUser, toast]);

  // Fonction pour modifier le rôle ou les permissions d'un utilisateur (admin)
  const updateUserAccess = useCallback((userId: string, updates: Partial<AccessControlUser>): boolean => {
    // Vérifier que l'utilisateur actuel est admin
    if (currentUser?.role !== UserRole.ADMIN) {
      toast({
        variant: "destructive",
        title: "Action non autorisée",
        description: "Seuls les administrateurs peuvent modifier les droits d'accès",
      });
      return false;
    }

    // Dans une implémentation réelle, envoyer à l'API
    console.log(`Mise à jour des accès pour l'utilisateur ${userId}:`, updates);
    toast({
      title: "Accès modifiés",
      description: `Les droits d'accès de l'utilisateur ont été mis à jour`,
    });
    return true;
  }, [currentUser, toast]);

  return {
    currentUser,
    isLoading,
    hasPermission,
    checkAccess,
    updateUserAccess,
    setCurrentUser,
    isPartnerType
  };
}
