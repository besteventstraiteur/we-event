
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleLogout = () => {
    if (withConfirmation) {
      setShowConfirmDialog(true);
    } else {
      performLogout();
    }
  };

  const performLogout = async () => {
    try {
      toast({
        description: "Déconnexion en cours...",
      });
      
      // Déconnexion via le hook d'authentification
      await logout();
      
      // Notification de succès
      toast({
        description: "Vous avez été déconnecté avec succès",
      });
      
      // Force redirection vers la page de login
      // Cette redirection est gérée dans le hook de déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        variant: "destructive",
        description: "Erreur lors de la déconnexion. Veuillez réessayer.",
      });
    }
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
