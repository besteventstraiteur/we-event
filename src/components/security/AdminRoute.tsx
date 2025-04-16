
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserRole } from "@/utils/accessControl";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminRouteProps {
  fallbackPath?: string;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  fallbackPath = "/login"
}) => {
  const { user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification d'accès
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès administrateur...</span>
      </div>
    );
  }

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    console.log("AdminRoute - No current user, redirecting to:", fallbackPath);
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Vérifier si l'utilisateur est administrateur en utilisant hasRole
  const isAdmin = hasRole(UserRole.ADMIN);
  console.log("AdminRoute - User role check:", user.role, "Is admin:", isAdmin);
  
  if (!isAdmin) {
    console.log("AdminRoute - User is not admin:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("AdminRoute - Admin access granted");
  // Si toutes les vérifications sont réussies, afficher le contenu protégé
  return <Outlet />;
};

export default AdminRoute;
