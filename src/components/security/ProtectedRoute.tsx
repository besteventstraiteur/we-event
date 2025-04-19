
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/utils/accessControl';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  children?: React.ReactNode;
  // Add support for multiple roles
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole,
  allowedRoles,
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

  // Check for allowed roles if provided
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => hasRole(role));
    if (!hasAllowedRole) {
      toast({
        title: "Accès non autorisé",
        description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
        variant: "destructive",
      });
      return <Navigate to="/unauthorized" replace />;
    }
    return children ? <>{children}</> : <Outlet />;
  }

  // Check for single required role if provided
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
