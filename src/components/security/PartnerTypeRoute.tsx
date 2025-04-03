
import React from "react";
import { Navigate } from "react-router-dom";
import { PartnerType, UserRole } from "@/utils/accessControl";
import { useAccessControl } from "@/hooks/useAccessControl";
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
  const { currentUser, isLoading, isPartnerType } = useAccessControl();

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
    return <Navigate to="/login" replace />;
  }

  // Vérifier que l'utilisateur est un partenaire
  if (currentUser.role !== UserRole.PARTNER) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérifier le type de partenaire
  const hasAllowedType = allowedTypes.some(type => isPartnerType(type));
  
  if (!hasAllowedType) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Si toutes les vérifications sont passées, afficher le contenu protégé
  return <>{children}</>;
};

export default PartnerTypeRoute;
