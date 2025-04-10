
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Permission, UserRole } from "@/utils/accessControl";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  allowedRoles?: UserRole[];
  role?: UserRole;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  allowedRoles,
  role,
  fallbackPath = "/login"
}) => {
  const { user, isLoading, hasPermission, hasRole } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - allowedRoles:", allowedRoles);
  
  // Afficher un indicateur de chargement pendant la vérification
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
    console.log("ProtectedRoute - User not authenticated, redirecting to:", fallbackPath);
    // Rediriger vers la page de connexion tout en enregistrant la page actuelle
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Si un rôle spécifique est requis
  if (role && user.role !== role) {
    console.log("ProtectedRoute - User doesn't have required role:", role);
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifier les rôles si spécifiés
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(allowedRole => hasRole(allowedRole));
    console.log("ProtectedRoute - hasAllowedRole:", hasAllowedRole, "user role:", user.role);
    if (!hasAllowedRole) {
      console.log("ProtectedRoute - User doesn't have any of the allowed roles");
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Vérifier la permission si spécifiée
  if (requiredPermission && !hasPermission(requiredPermission)) {
    console.log("ProtectedRoute - User doesn't have required permission:", requiredPermission);
    return <Navigate to="/unauthorized" replace />;
  }

  // Si toutes les vérifications sont passées, afficher le contenu protégé
  console.log("ProtectedRoute - All checks passed, showing protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
