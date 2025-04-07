
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
    
    // Check localStorage directly as a backup
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("AdminRoute - Stored User:", parsedUser);
      
      // If we have an admin user in localStorage but not in currentUser (might be a timing issue)
      if (!currentUser && parsedUser.role === UserRole.ADMIN) {
        console.log("AdminRoute - Admin found in localStorage but not in currentUser");
      }
    }
  }, [currentUser, isLoading]);

  // Show loading indicator while checking access
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès administrateur...</span>
      </div>
    );
  }

  // Check if user is logged in
  if (!currentUser) {
    console.log("AdminRoute - No current user, redirecting to:", fallbackPath);
    return <Navigate to={fallbackPath} state={{ from: location.pathname }} replace />;
  }

  // Check if user is an admin
  if (currentUser.role !== UserRole.ADMIN) {
    console.log("AdminRoute - User is not admin:", currentUser.role);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("AdminRoute - Admin access granted");
  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default AdminRoute;
