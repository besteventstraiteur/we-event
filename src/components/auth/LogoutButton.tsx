
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
  text?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  showIcon = true,
  text = "Déconnexion",
  className,
  ...props
}) => {
  const { logout } = useAuth();

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
      onClick={logout}
      {...props}
    >
      {showIcon && <LogOut className="w-4 h-4" />}
      {text}
    </Button>
  );
};

export default LogoutButton;
