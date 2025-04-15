
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

  // Afficher un indicateur de chargement pendant la vérification d'accès
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès...</span>
      </div>
    );
  }

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    console.log("ProtectedRoute - No current user, redirecting to:", fallbackPath);
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Si un rôle est requis, vérifier que l'utilisateur a ce rôle
  if (requiredRole) {
    // Normalize roles for comparison
    const userRoleStr = String(user.role).toLowerCase();
    const requiredRoleStr = String(requiredRole).toLowerCase();
    
    // Check role using the hasRole function
    const hasRequiredRole = hasRole(requiredRole);
    
    console.log("ProtectedRoute - Role check:", { 
      userRole: userRoleStr, 
      requiredRole: requiredRoleStr,
      hasRequiredRole 
    });
    
    if (!hasRequiredRole) {
      console.log("ProtectedRoute - User doesn't have required role:", requiredRoleStr);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si toutes les vérifications sont réussies, afficher le contenu protégé
  return <Outlet />;
};

export default ProtectedRoute;
