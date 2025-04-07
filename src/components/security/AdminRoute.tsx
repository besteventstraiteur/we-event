
import React from "react";
import { Navigate } from "react-router-dom";
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

  // Show loading indicator while checking access
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Vérification des accès...</span>
      </div>
    );
  }

  // Check if user is logged in
  if (!currentUser) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check if user is an admin
  if (currentUser.role !== UserRole.ADMIN) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default AdminRoute;
