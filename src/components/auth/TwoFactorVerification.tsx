
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

interface TwoFactorVerificationProps {
  onVerify: (code: string) => Promise<boolean>;
  onCancel?: () => void;
  onResend?: () => Promise<void>;
}

const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({
  onVerify,
  onCancel,
  onResend,
}) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Code incomplet",
        description: "Veuillez entrer les 6 chiffres du code de vérification.",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const success = await onVerify(otp);
      if (success) {
        toast({
          title: "Vérification réussie",
          description: "Votre identité a été vérifiée avec succès.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Code incorrect",
          description: "Le code de vérification est incorrect. Veuillez réessayer.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de vérification",
        description: "Une erreur est survenue lors de la vérification. Veuillez réessayer.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!onResend) return;
    
    setIsResending(true);
    try {
      await onResend();
      toast({
        title: "Code renvoyé",
        description: "Un nouveau code de vérification a été envoyé.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: "Une erreur est survenue lors de l'envoi du code. Veuillez réessayer.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Vérification en deux étapes</CardTitle>
        <CardDescription>
          Veuillez entrer le code à 6 chiffres qui a été envoyé à votre appareil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
          <div className="text-sm text-gray-500">
            Le code expire dans 5 minutes.
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isVerifying}>
            Annuler
          </Button>
        )}
        <div className="flex space-x-2">
          {onResend && (
            <Button 
              variant="ghost" 
              onClick={handleResend} 
              disabled={isResending || isVerifying}
            >
              {isResending ? "Envoi en cours..." : "Renvoyer le code"}
            </Button>
          )}
          <Button 
            onClick={handleVerify} 
            disabled={otp.length !== 6 || isVerifying}
          >
            {isVerifying ? "Vérification..." : "Vérifier"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TwoFactorVerification;
