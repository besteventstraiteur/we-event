
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAccessControl } from "@/hooks/useAccessControl";
import { PartnerType } from "@/utils/accessControl";
import { Loader2 } from "lucide-react";

interface PartnerTypeRouteProps {
  children: React.ReactNode;
  allowedTypes: PartnerType[];
  fallbackPath?: string;
}

const PartnerTypeRoute: React.FC<PartnerTypeRouteProps> = ({
  children,
  allowedTypes,
  fallbackPath = "/partner/dashboard"
}) => {
  const { currentUser, isLoading } = useAccessControl();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification de l'accès...</span>
      </div>
    );
  }

  // Pour le débogage, vérifions ce que nous recevons réellement
  console.log("PartnerTypeRoute - currentUser:", currentUser);
  console.log("PartnerTypeRoute - allowedTypes:", allowedTypes);
  
  // Vérifier si l'utilisateur est connecté et est un partenaire
  if (!currentUser || currentUser.role !== 'partner') {
    console.log("PartnerTypeRoute - Redirection vers login - Utilisateur non connecté ou non partenaire");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Vérifier si le type de partenaire est autorisé
  const userPartnerType = currentUser.partnerType || PartnerType.GENERAL;
  console.log("PartnerTypeRoute - userPartnerType:", userPartnerType);
  
  const hasAllowedType = allowedTypes.includes(userPartnerType);
  console.log("PartnerTypeRoute - hasAllowedType:", hasAllowedType);

  if (!hasAllowedType && userPartnerType !== PartnerType.GENERAL) {
    console.log("PartnerTypeRoute - Redirection vers fallback - Type de partenaire non autorisé");
    return <Navigate to={fallbackPath} replace />;
  }

  // Si toutes les vérifications sont passées, afficher le contenu protégé
  return <>{children}</>;
};

export default PartnerTypeRoute;
