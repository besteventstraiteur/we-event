
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
  const { isAuthenticated, hasRole, user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated, "user:", user, "path:", location.pathname);

  // Effect to log authentication state on mount and path change
  useEffect(() => {
    console.log("ProtectedRoute mounted/updated - Auth state:", { 
      isAuthenticated, 
      user, 
      path: location.pathname,
      hasRequiredRole: requiredRole ? hasRole(requiredRole) : true,
      hasAllowedRole: allowedRoles ? allowedRoles.some(role => hasRole(role)) : true
    });
  }, [isAuthenticated, user, location.pathname, requiredRole, allowedRoles, hasRole]);

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to /login");
    // Store the attempted URL to redirect back after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Check for allowed roles if provided
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => hasRole(role));
    if (!hasAllowedRole) {
      console.log("No allowed role found among:", allowedRoles);
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
    console.log("Required role not found:", requiredRole);
    toast({
      title: "Accès non autorisé",
      description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
      variant: "destructive",
    });
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access granted to protected route:", location.pathname);
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
