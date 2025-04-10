
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserRole, PartnerType } from "@/utils/accessControl";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface PartnerTypeRouteProps {
  requiredRole?: UserRole.PARTNER;
  fallbackPath?: string;
  allowedTypes?: PartnerType[];
  children?: React.ReactNode;
}

const PartnerTypeRoute: React.FC<PartnerTypeRouteProps> = ({
  requiredRole = UserRole.PARTNER,
  fallbackPath = "/login",
  allowedTypes,
  children
}) => {
  const { user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification d'accès
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès partenaire...</span>
      </div>
    );
  }

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    console.log("PartnerTypeRoute - No current user, redirecting to:", fallbackPath);
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Vérifier si l'utilisateur est partenaire
  if (!hasRole(requiredRole)) {
    console.log("PartnerTypeRoute - User is not a partner:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }
  
  // If specific partner types are required, check for those
  if (allowedTypes && allowedTypes.length > 0) {
    // Assuming user has a partnerType property
    const hasAllowedType = user.partnerType && allowedTypes.includes(user.partnerType);
    if (!hasAllowedType) {
      console.log("PartnerTypeRoute - Partner type not allowed:", user.partnerType);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si toutes les vérifications sont réussies, afficher le contenu protégé
  return children ? <>{children}</> : <Outlet />;
};

export default PartnerTypeRoute;
