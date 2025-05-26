
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function useDemoLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginAsDemo = (role: 'client' | 'partner' | 'admin') => {
    const demoUser = {
      id: `demo-${role}-${Date.now()}`,
      email: `demo-${role}@weevent.fr`,
      role: role.toUpperCase(),
      user_metadata: { 
        role: role.toUpperCase(),
        name: `Utilisateur Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`
      },
      created_at: new Date().toISOString()
    };

    // Stocker l'utilisateur de démo
    localStorage.setItem('currentUser', JSON.stringify(demoUser));
    localStorage.setItem('weddingPlannerEmail', demoUser.email);

    // Redirection selon le rôle
    const redirectPath = `/${role}/dashboard`;
    
    toast({
      title: "Connexion démo réussie",
      description: `Accès en tant que ${role}`,
    });

    navigate(redirectPath, { replace: true });
    
    // Recharger la page pour s'assurer que l'état est mis à jour
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return { loginAsDemo };
}
