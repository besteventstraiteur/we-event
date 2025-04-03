
import React from "react";
import { Fingerprint, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface BiometricCardProps {
  isBiometricEnabled: boolean;
  isBiometricSupported: boolean;
  onToggleBiometric: () => void;
  isNative: boolean;
  isLoading: boolean;
}

const BiometricCard: React.FC<BiometricCardProps> = ({
  isBiometricEnabled,
  isBiometricSupported,
  onToggleBiometric,
  isNative,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Fingerprint className="h-8 w-8 text-primary" />
        <div>
          <CardTitle>Authentification biométrique</CardTitle>
          <CardDescription>
            Utilisez votre empreinte digitale ou Face ID pour vous connecter
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="biometric-toggle" className="flex flex-col gap-1">
            <span>{isBiometricEnabled ? 'Activé' : 'Désactivé'}</span>
            <span className="font-normal text-sm text-muted-foreground">
              {!isBiometricSupported 
                ? "Non disponible sur votre appareil"
                : isBiometricEnabled 
                  ? "Vous pouvez vous connecter avec votre empreinte digitale ou Face ID" 
                  : "Activez pour vous connecter avec votre empreinte digitale ou Face ID"}
            </span>
          </Label>
          <Switch 
            id="biometric-toggle" 
            checked={isBiometricEnabled} 
            onCheckedChange={onToggleBiometric}
            disabled={!isBiometricSupported || isLoading}
          />
        </div>
        
        {!isBiometricSupported && isNative && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Non disponible</AlertTitle>
            <AlertDescription>
              Votre appareil ne prend pas en charge l'authentification biométrique ou 
              vous n'avez pas configuré de méthode biométrique dans les paramètres de votre appareil.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default BiometricCard;
