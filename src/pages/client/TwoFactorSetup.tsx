import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import { Shield, Smartphone, Mail, Key, Fingerprint, AlertTriangle, Info, Eye, EyeOff } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { isBiometricAvailable, setupBiometricAuth, disableBiometricAuth } from "@/utils/biometricAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const TwoFactorSetup: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<"email" | "app">("email");
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [showEncryptionDetails, setShowEncryptionDetails] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Vérifier si l'application s'exécute dans un environnement natif
    const nativePlatform = Capacitor.isNativePlatform();
    setIsNative(nativePlatform);

    // Vérifier si la biométrie est prise en charge
    const checkBiometricSupport = async () => {
      if (nativePlatform) {
        const isSupported = await isBiometricAvailable();
        setIsBiometricSupported(isSupported);
      }
    };

    // Vérifier si la biométrie est activée
    const checkBiometricEnabled = () => {
      const enabled = localStorage.getItem('biometric_enabled') === 'true';
      setIsBiometricEnabled(enabled);
    };

    // Vérifier si 2FA est activé
    const check2FAEnabled = () => {
      const enabled = localStorage.getItem('2fa_enabled') === 'true';
      setIs2FAEnabled(enabled);
    };

    checkBiometricSupport();
    checkBiometricEnabled();
    check2FAEnabled();
  }, []);

  // Simuler l'activation/désactivation du 2FA
  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      // Demander confirmation avant de désactiver
      if (window.confirm("Êtes-vous sûr de vouloir désactiver l'authentification à deux facteurs ? Cela réduira la sécurité de votre compte.")) {
        // Logique de désactivation
        setIsLoading(true);
        setTimeout(() => {
          setIs2FAEnabled(false);
          localStorage.setItem('2fa_enabled', 'false');
          setIsLoading(false);
          toast({
            title: "2FA désactivé",
            description: "L'authentification à deux facteurs a été désactivée."
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
          localStorage.setItem('2fa_enabled', 'true');
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
        toast({
          title: "Code envoyé",
          description: `Un nouveau code a été envoyé via ${verificationMethod === 'email' ? 'email' : 'application d\'authentification'}.`
        });
        resolve();
      }, 1000);
    });
  };

  // Gérer l'activation/désactivation de la biométrie
  const handleToggleBiometric = async () => {
    if (!isNative || !isBiometricSupported) {
      toast({
        variant: "destructive",
        title: "Non disponible",
        description: "L'authentification biométrique n'est pas disponible sur cet appareil."
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (isBiometricEnabled) {
        // Désactiver la biométrie
        const success = await disableBiometricAuth();
        if (success) {
          setIsBiometricEnabled(false);
          toast({
            title: "Biométrie désactivée",
            description: "L'authentification biométrique a été désactivée."
          });
        } else {
          throw new Error("Erreur lors de la désactivation");
        }
      } else {
        // Activer la biométrie
        const userId = `user_${Date.now()}`; // En production, utiliser l'ID réel de l'utilisateur
        const success = await setupBiometricAuth(userId);
        if (success) {
          setIsBiometricEnabled(true);
          toast({
            title: "Biométrie activée",
            description: "L'authentification biométrique a été activée avec succès."
          });
        } else {
          throw new Error("Erreur lors de l'activation");
        }
      }
    } catch (error) {
      console.error("Erreur biométrie:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer."
      });
    } finally {
      setIsLoading(false);
    }
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
              maxAttempts={5}
            />
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Pour les besoins de la démo, le code valide est: 123456</p>
            </div>
          </>
        ) : (
          <div className="grid gap-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Votre sécurité est notre priorité</AlertTitle>
              <AlertDescription>
                Nous vous recommandons d'activer l'authentification à deux facteurs et, si disponible, 
                l'authentification biométrique pour une sécurité optimale.
              </AlertDescription>
            </Alert>

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
                    disabled={isLoading}
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

            {(isNative || isMobile) && (
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
                      onCheckedChange={handleToggleBiometric}
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
            )}

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Key className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Chiffrement des données</CardTitle>
                  <CardDescription>
                    Protection de vos données sensibles
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="encryption-toggle" className="flex flex-col gap-1">
                      <span>Chiffrement des données</span>
                      <span className="font-normal text-sm text-muted-foreground">
                        Le chiffrement renforcé protège vos données sensibles
                      </span>
                    </Label>
                    <Switch 
                      id="encryption-toggle" 
                      checked={encryptionEnabled} 
                      onCheckedChange={setEncryptionEnabled}
                      disabled={true} // Toujours activé
                    />
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between" 
                    onClick={() => setShowEncryptionDetails(!showEncryptionDetails)}
                  >
                    Détails du chiffrement
                    {showEncryptionDetails ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>

                  {showEncryptionDetails && (
                    <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">Notre système utilise:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Chiffrement SSL/TLS pour toutes les communications</li>
                        <li>Chiffrement AES-256 pour les données stockées</li>
                        <li>Hachage bcrypt avec sel aléatoire pour les mots de passe</li>
                        <li>Isolation des données par compte</li>
                        <li>Surveillance active des accès anormaux</li>
                      </ul>
                      <p>Les données sensibles comme les informations de paiement sont chiffrées avec des clés spécifiques à chaque utilisateur.</p>
                    </div>
                  )}
                </div>
              </CardContent>
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
