
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "@/utils/accessControl";
import { useAccessControl } from "@/hooks/useAccessControl";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  fallbackPath = "/login"
}) => {
  const { currentUser, isLoading } = useAccessControl();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Debug info
    console.log("AdminRoute - Current User:", currentUser);
    console.log("AdminRoute - Is Loading:", isLoading);
    
    // Si toujours en cours de chargement ou si l'utilisateur est déjà un admin, ne rien faire
    if (isLoading || (currentUser && currentUser.role === UserRole.ADMIN)) {
      return;
    }
    
    // Si pas d'utilisateur actuel après chargement, vérification supplémentaire
    if (!currentUser) {
      // Vérifier localStorage directement comme solution de secours
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("AdminRoute - Stored User:", parsedUser);
          
          // Si nous avons un admin dans localStorage mais pas dans currentUser (peut-être un problème de timing)
          if (parsedUser.role === UserRole.ADMIN || parsedUser.role === 'admin') {
            console.log("AdminRoute - Admin found in localStorage but not in currentUser");
            
            // Forcer un rechargement complet pour récupérer l'utilisateur du localStorage
            window.location.reload();
            return;
          }
        } catch (error) {
          console.error("AdminRoute - Error parsing stored user:", error);
        }
      }
    }
  }, [currentUser, isLoading, navigate, location.pathname]);

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
  if (!currentUser) {
    console.log("AdminRoute - No current user, redirecting to:", fallbackPath);
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Vérifier si l'utilisateur est administrateur
  if (currentUser.role !== UserRole.ADMIN) {
    console.log("AdminRoute - User is not admin:", currentUser.role);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("AdminRoute - Admin access granted");
  // Si toutes les vérifications sont réussies, afficher le contenu protégé
  return <>{children}</>;
};

export default AdminRoute;
