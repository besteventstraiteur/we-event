
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserRole } from "@/utils/accessControl";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  fallbackPath = "/login"
}) => {
  const { user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  // Show a loading indicator while checking access
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès...</span>
      </div>
    );
  }

  // Check if user is logged in
  if (!user) {
    console.log("ProtectedRoute - No current user, redirecting to:", fallbackPath);
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // If a role is required, verify that user has this role
  if (requiredRole) {
    // Utiliser directement la fonction hasRole du context
    const hasRequiredRole = hasRole(requiredRole);
    
    console.log("ProtectedRoute - Role check:", { 
      userRole: String(user.role || '').toLowerCase(), 
      requiredRole: String(requiredRole).toLowerCase(),
      hasRequiredRole 
    });
    
    if (!hasRequiredRole) {
      console.log("ProtectedRoute - User doesn't have required role:", requiredRole);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If all checks pass, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
