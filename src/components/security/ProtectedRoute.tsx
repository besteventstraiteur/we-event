
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
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
  const { isAuthenticated, hasRole, user, isLoading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated, "user:", user, "isLoading:", isLoading);

  useEffect(() => {
    // Log additional details when authentication state changes
    if (!isLoading) {
      console.log("Auth state resolved - isAuthenticated:", isAuthenticated, "user present:", !!user);
    }
  }, [isLoading, isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading authentication state...</div>;
  }

  if (!isAuthenticated || !user) {
    console.log("Not authenticated, redirecting to login from:", location.pathname);
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
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
