
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
  const userRoleStr = String(user.role || '').toLowerCase().trim();
  const requiredRoleStr = String(requiredRole).toLowerCase().trim();
  const isPartner = userRoleStr === requiredRoleStr;
  
  console.log("PartnerTypeRoute - Role check:", { 
    userRole: userRoleStr, 
    requiredRole: requiredRoleStr,
    isPartner 
  });
  
  if (!isPartner) {
    console.log("PartnerTypeRoute - User is not a partner:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Si des types de partenaires spécifiques sont requis, vérifier ceux-ci
  if (allowedTypes && allowedTypes.length > 0) {
    // Utiliser partner_type au lieu de partnerType pour correspondre au type Profile
    const userPartnerType = String(user.partner_type || '').toLowerCase().trim();
    const hasAllowedType = allowedTypes.some(type => 
      String(type).toLowerCase().trim() === userPartnerType
    );
    
    console.log("PartnerTypeRoute - Partner type check:", {
      userPartnerType,
      allowedTypes: allowedTypes.map(t => String(t).toLowerCase().trim()),
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
