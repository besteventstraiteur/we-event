
import { useState, useEffect } from 'react';
import { 
  AccessControlUser, 
  Permission, 
  UserRole, 
  PartnerType, 
  hasPermission 
} from '@/utils/accessControl';

export const useAccessControl = () => {
  const [currentUser, setCurrentUser] = useState<AccessControlUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation: Charger l'utilisateur actuel depuis le localStorage ou une source
    const loadUser = () => {
      try {
        // Vérifier d'abord s'il y a un utilisateur complet stocké
        const storedUser = localStorage.getItem('currentUser');
        console.log("useAccessControl - Checking localStorage for currentUser:", storedUser);
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Vérifier et corriger le rôle si nécessaire (pour s'assurer qu'il s'agit du bon objet UserRole)
          if (typeof parsedUser.role === 'string') {
            // S'assurer que le rôle est correct en utilisant l'enum UserRole
            if (parsedUser.role === 'admin') {
              parsedUser.role = UserRole.ADMIN;
            } else if (parsedUser.role === 'partner') {
              parsedUser.role = UserRole.PARTNER;
            } else if (parsedUser.role === 'client') {
              parsedUser.role = UserRole.CLIENT;
            } else if (parsedUser.role === 'guest') {
              parsedUser.role = UserRole.GUEST;
            } else {
              parsedUser.role = UserRole.UNREGISTERED;
            }
          }
          
          console.log("useAccessControl - Using stored user with role:", parsedUser.role);
          setCurrentUser(parsedUser);
          setIsLoading(false);
          return;
        }
        
        // Si pas d'utilisateur stocké, vérifiez l'email
        const storedEmail = localStorage.getItem('weddingPlannerEmail');
        
        if (!storedEmail) {
          console.log("useAccessControl - No user data found");
          setCurrentUser(null);
          setIsLoading(false);
          return;
        }
        
        // Créer un utilisateur basé sur l'email
        if (storedEmail.includes('admin')) {
          setCurrentUser({
            id: 'admin-1',
            role: UserRole.ADMIN,
            permissions: Object.values(Permission),
            email: storedEmail,
            name: 'Admin Test'
          });
        } else if (storedEmail.includes('partner')) {
          // Déterminer le type de partenaire (pour la démo)
          let partnerType = PartnerType.GENERAL;
          
          if (storedEmail.includes('photo')) partnerType = PartnerType.PHOTOGRAPHER;
          else if (storedEmail.includes('dj')) partnerType = PartnerType.DJ;
          else if (storedEmail.includes('catering')) partnerType = PartnerType.CATERER;
          else if (storedEmail.includes('venue')) partnerType = PartnerType.VENUE;
          
          setCurrentUser({
            id: 'partner-1',
            role: UserRole.PARTNER,
            partnerType: partnerType,
            permissions: [
              Permission.VIEW_DASHBOARD,
              Permission.MANAGE_REQUESTS
            ],
            email: storedEmail,
            name: 'Partenaire Test'
          });
        } else if (storedEmail.includes('client')) {
          setCurrentUser({
            id: 'client-1',
            role: UserRole.CLIENT,
            permissions: [
              Permission.VIEW_DASHBOARD,
              Permission.MANAGE_GUESTS
            ],
            email: storedEmail,
            name: 'Client Test'
          });
        } else {
          // Utilisateur par défaut pour la démonstration
          setCurrentUser({
            id: 'demo-user',
            role: UserRole.CLIENT,
            permissions: [Permission.VIEW_DASHBOARD],
            email: storedEmail,
            name: 'Utilisateur Démo'
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur:", error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return {
    currentUser,
    isLoading,
    hasPermission: (permission: Permission) => hasPermission(currentUser, permission),
    isLoggedIn: !!currentUser,
    isAdmin: currentUser?.role === UserRole.ADMIN,
    isPartner: currentUser?.role === UserRole.PARTNER,
    isClient: currentUser?.role === UserRole.CLIENT,
  };
};
