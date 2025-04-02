
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import { Shield, Smartphone, Mail, Key } from "lucide-react";

const TwoFactorSetup: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<"email" | "app">("email");
  const { toast } = useToast();

  // Simuler l'activation/désactivation du 2FA
  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      // Demander confirmation avant de désactiver
      if (window.confirm("Êtes-vous sûr de vouloir désactiver l'authentification à deux facteurs ? Cela réduira la sécurité de votre compte.")) {
        // Logique de désactivation (simulée)
        setTimeout(() => {
          setIs2FAEnabled(false);
          toast({
            title: "2FA désactivé",
            description: "L'authentification à deux facteurs a été désactivée.",
          });
        }, 500);
      }
    } else {
      // Activer le processus de configuration
      setShowVerification(true);
    }
  };

  // Simuler la vérification du code OTP
  const handleVerifyOTP = async (code: string): Promise<boolean> => {
    console.log("Code OTP:", code);
    
    // Simuler une vérification réussie si le code est 123456 (pour démonstration)
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = code === "123456";
        if (isValid) {
          setIs2FAEnabled(true);
          setShowVerification(false);
        }
        resolve(isValid);
      }, 1000);
    });
  };

  // Simuler l'envoi d'un nouveau code
  const handleResendCode = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Nouveau code envoyé à", verificationMethod);
        resolve();
      }, 1000);
    });
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sécurité du compte</h1>
          <p className="text-muted-foreground">
            Configurez les paramètres de sécurité de votre compte pour vous protéger contre les accès non autorisés.
          </p>
        </div>

        {showVerification ? (
          <>
            <div className="mb-4">
              <Button variant="outline" onClick={() => setShowVerification(false)}>
                Retour aux paramètres
              </Button>
            </div>
            <TwoFactorVerification 
              onVerify={handleVerifyOTP} 
              onCancel={() => setShowVerification(false)}
              onResend={handleResendCode}
            />
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Pour les besoins de la démo, le code valide est: 123456</p>
            </div>
          </>
        ) : (
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Authentification à deux facteurs</CardTitle>
                  <CardDescription>
                    Une couche de sécurité supplémentaire pour votre compte
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="2fa-toggle" className="flex flex-col gap-1">
                    <span>{is2FAEnabled ? 'Activé' : 'Désactivé'}</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      {is2FAEnabled 
                        ? "Votre compte est protégé par une vérification en deux étapes." 
                        : "Activez cette option pour renforcer la sécurité de votre compte."}
                    </span>
                  </Label>
                  <Switch 
                    id="2fa-toggle" 
                    checked={is2FAEnabled} 
                    onCheckedChange={handleToggle2FA} 
                  />
                </div>
              </CardContent>
              {is2FAEnabled && (
                <CardFooter className="flex-col items-start gap-4 border-t px-6 py-4">
                  <h4 className="text-sm font-medium">Méthode de vérification</h4>
                  <div className="grid w-full gap-2">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={verificationMethod === "email" ? "default" : "outline"} 
                        className="w-full justify-start"
                        onClick={() => setVerificationMethod("email")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={verificationMethod === "app" ? "default" : "outline"} 
                        className="w-full justify-start"
                        onClick={() => setVerificationMethod("app")}
                      >
                        <Smartphone className="mr-2 h-4 w-4" />
                        Application d'authentification
                      </Button>
                    </div>
                  </div>
                  {is2FAEnabled && (
                    <div className="text-sm text-muted-foreground mt-2">
                      Dernière vérification: aujourd'hui à {new Date().toLocaleTimeString()}
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Key className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Mot de passe et sécurité</CardTitle>
                  <CardDescription>
                    Gérez votre mot de passe et les options de récupération
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Changer de mot de passe</h4>
                      <p className="text-sm text-muted-foreground">
                        Mettez à jour régulièrement votre mot de passe pour plus de sécurité
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Email de récupération</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilisé pour réinitialiser votre mot de passe
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TwoFactorSetup;
