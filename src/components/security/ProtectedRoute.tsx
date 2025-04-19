
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/accessControl';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole,
  children 
}) => {
  const { isAuthenticated, hasRole } = useAuth();
  const { toast } = useToast();

  if (!isAuthenticated) {
    toast({
      title: "Accès refusé",
      description: "Veuillez vous connecter pour accéder à cette page",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    toast({
      title: "Accès non autorisé",
      description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
      variant: "destructive",
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
