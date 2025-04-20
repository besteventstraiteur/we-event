
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  className?: string;
  showIcon?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'default',
  className = '',
  showIcon = false,
  ...props
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: 'destructive',
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion",
      });
    }
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant={variant} 
      className={className}
      {...props}
    >
      {showIcon && <LogOutIcon className="mr-2 h-4 w-4" />}
      Se déconnecter
    </Button>
  );
};

export default LogoutButton;
