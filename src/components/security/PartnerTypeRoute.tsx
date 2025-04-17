
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
  const { user, isLoading, hasRole, hasPartnerType } = useAuth();
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

  // Vérifier si l'utilisateur est partenaire en utilisant la fonction hasRole
  const isPartner = hasRole(requiredRole);
  
  console.log("PartnerTypeRoute - Role check:", { 
    userRole: user.role, 
    requiredRole: requiredRole,
    isPartner 
  });
  
  if (!isPartner) {
    console.log("PartnerTypeRoute - User is not a partner:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Si des types de partenaires spécifiques sont requis, vérifier ceux-ci
  if (allowedTypes && allowedTypes.length > 0) {
    const hasAllowedType = allowedTypes.some(type => hasPartnerType(type));
    
    console.log("PartnerTypeRoute - Partner type check:", {
      userPartnerType: user.partner_type,
      allowedTypes: allowedTypes,
      hasAllowedType
    });
    
    if (!hasAllowedType) {
      console.log("PartnerTypeRoute - Partner type not allowed:", user.partner_type);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si toutes les vérifications sont réussies, afficher le contenu protégé
  return children ? <>{children}</> : <Outlet />;
};

export default PartnerTypeRoute;
