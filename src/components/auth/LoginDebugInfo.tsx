
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoginDebugInfoProps {
  email?: string;
  userType?: string;
  redirectPath?: string;
  redirectAttempted?: boolean;
}

const LoginDebugInfo: React.FC<LoginDebugInfoProps> = ({
  email, 
  userType,
  redirectPath, 
  redirectAttempted
}) => {
  const navigate = useNavigate();

  if (!redirectAttempted) return null;

  return (
    <div className="mt-4 p-3 border border-amber-200 bg-amber-50 rounded-md text-sm">
      <p><strong>Debug:</strong> Redirection tentée pour {email} ({userType}) vers {redirectPath}</p>
      <p className="mt-1 text-xs">Si vous voyez toujours cette page, veuillez essayer de cliquer manuellement sur le lien ci-dessous:</p>
      <div className="mt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => navigate(redirectPath || '/admin/dashboard', { replace: true })}
        >
          Aller vers {redirectPath}
        </Button>
      </div>
    </div>
  );
};

export default LoginDebugInfo;
