
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface TwoFactorVerificationProps {
  onVerify: (code: string) => Promise<boolean>;
  onCancel?: () => void;
  onResend?: () => Promise<void>;
  codeLength?: number;
  maxAttempts?: number;
}

const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({
  onVerify,
  onCancel,
  onResend,
  codeLength = 6,
  maxAttempts = 3,
}) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [isExpired, setIsExpired] = useState(false);
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handleVerify = async () => {
    if (otp.length !== codeLength) {
      toast({
        variant: "destructive",
        title: "Code incomplet",
        description: `Veuillez entrer les ${codeLength} chiffres du code de vérification.`,
      });
      return;
    }

    if (isExpired) {
      toast({
        variant: "destructive",
        title: "Code expiré",
        description: "Le code de vérification a expiré. Veuillez demander un nouveau code.",
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
        setAttempts((prev) => prev + 1);
        
        if (attempts + 1 >= maxAttempts) {
          toast({
            variant: "destructive",
            title: "Trop de tentatives",
            description: "Vous avez atteint le nombre maximum de tentatives. Veuillez demander un nouveau code.",
          });
          setOtp("");
          if (onResend) {
            await onResend();
            setAttempts(0);
            setTimeLeft(300);
            setIsExpired(false);
          }
        } else {
          toast({
            variant: "destructive",
            title: "Code incorrect",
            description: `Le code de vérification est incorrect. Il vous reste ${maxAttempts - attempts - 1} tentative(s).`,
          });
        }
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
      setOtp("");
      setAttempts(0);
      setTimeLeft(300);
      setIsExpired(false);
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
          Veuillez entrer le code à {codeLength} chiffres qui a été envoyé à votre appareil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <InputOTP
            maxLength={codeLength}
            value={otp}
            onChange={(value) => setOtp(value)}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
            disabled={isVerifying || isExpired}
          />
          <div className={`text-sm ${isExpired ? 'text-red-500' : 'text-gray-500'}`}>
            {isExpired 
              ? "Le code a expiré, veuillez demander un nouveau code." 
              : `Le code expire dans ${formatTime(timeLeft)}.`}
          </div>
          {attempts > 0 && (
            <div className="text-sm text-amber-600">
              Tentatives: {attempts}/{maxAttempts}
            </div>
          )}
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
              disabled={isResending || isVerifying || (!isExpired && timeLeft > 240)} // Disable resend until less than 1 minute left
            >
              {isResending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> 
                  Envoi en cours...
                </>
              ) : (
                "Renvoyer le code"
              )}
            </Button>
          )}
          <Button 
            onClick={handleVerify} 
            disabled={otp.length !== codeLength || isVerifying || isExpired || attempts >= maxAttempts}
          >
            {isVerifying ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> 
                Vérification...
              </>
            ) : (
              "Vérifier"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TwoFactorVerification;
