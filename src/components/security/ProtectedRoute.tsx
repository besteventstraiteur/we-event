
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Permission, UserRole, AccessControlUser } from "@/utils/accessControl";
import { useAccessControl } from "@/hooks/useAccessControl";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  allowedRoles?: UserRole[];
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  allowedRoles,
  fallbackPath = "/login"
}) => {
  const { currentUser, isLoading, hasPermission } = useAccessControl();
  const location = useLocation();

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
  if (!currentUser) {
    // Rediriger vers la page de connexion tout en enregistrant la page actuelle
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Vérifier les rôles si spécifiés
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.includes(currentUser.role);
    if (!hasAllowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Vérifier la permission si spécifiée
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si toutes les vérifications sont passées, afficher le contenu protégé
  return <>{children}</>;
};

export default ProtectedRoute;
