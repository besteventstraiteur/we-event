
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserRole } from "@/utils/accessControl";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  allowedRoles?: UserRole[]; // Added this property to match usage in ClientRoutes.tsx
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  allowedRoles,
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

  // Si un rôle spécifique est requis, vérifier que l'utilisateur a ce rôle
  if (requiredRole && !hasRole(requiredRole)) {
    console.log("ProtectedRoute - User doesn't have required role:", requiredRole);
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Si une liste de rôles autorisés est fournie, vérifier que l'utilisateur a l'un de ces rôles
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => hasRole(role));
    
    console.log("ProtectedRoute - Role check for allowed roles:", { 
      userRole: user.role, 
      allowedRoles,
      hasAllowedRole 
    });
    
    if (!hasAllowedRole) {
      console.log("ProtectedRoute - User doesn't have any of the allowed roles:", allowedRoles);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si toutes les vérifications passent, afficher le contenu protégé
  return <Outlet />;
};

export default ProtectedRoute;
