
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { UserRole } from '@/utils/accessControl';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  children?: React.ReactNode;
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
  
  console.log("ProtectedRoute - Path:", location.pathname, "IsAuthenticated:", isAuthenticated);

  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      isAuthenticated, 
      user, 
      path: location.pathname
    });
  }, [isAuthenticated, user, location.pathname]);

  // Handle not authenticated case
  if (!isAuthenticated || !user) {
    console.log("Not authenticated, redirecting to /login with path:", location.pathname);
    
    // Store the current path for redirect after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname);
    
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Handle role-based access (if roles provided)
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
  }

  // Handle single required role (if provided)
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
