
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
  text?: string;
  withConfirmation?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  showIcon = true,
  text = "Déconnexion",
  withConfirmation = false,
  className,
  ...props
}) => {
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    if (withConfirmation) {
      if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter?")) {
        logout();
      }
    } else {
      logout();
      toast({
        description: "Vous avez été déconnecté avec succès",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
      onClick={handleLogout}
      {...props}
    >
      {showIcon && <LogOut className="w-4 h-4" />}
      {text}
    </Button>
  );
};

export default LogoutButton;
