
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAccessControl } from "@/hooks/useAccessControl";
import { PartnerType } from "@/components/dashboard/PartnerNavigation";
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

  // Vérifier si l'utilisateur est un partenaire
  if (!currentUser || currentUser.role !== 'partner') {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Vérifier si le type de partenaire est autorisé
  const userPartnerType = currentUser.partnerType || PartnerType.GENERAL;
  const hasAllowedType = allowedTypes.includes(userPartnerType as PartnerType);

  if (!hasAllowedType && userPartnerType !== PartnerType.GENERAL) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Si toutes les vérifications sont passées, afficher le contenu protégé
  return <>{children}</>;
};

export default PartnerTypeRoute;
