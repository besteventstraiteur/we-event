
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
  text?: string;
  withConfirmation?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  showIcon = true,
  text = "Déconnexion",
  withConfirmation = true,
  className,
  ...props
}) => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleLogout = () => {
    if (withConfirmation) {
      setShowConfirmDialog(true);
    } else {
      performLogout();
    }
  };

  const performLogout = () => {
    logout();
    toast({
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className={`flex items-center gap-2 ${className}`}
        onClick={handleLogout}
        {...props}
      >
        {showIcon && <LogOut className="w-4 h-4" />}
        {text}
      </Button>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la déconnexion</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={performLogout}>
              Se déconnecter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LogoutButton;
