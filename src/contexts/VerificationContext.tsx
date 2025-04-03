
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface VerificationContextType {
  // State
  otp: string;
  isVerifying: boolean;
  isResending: boolean;
  attempts: number;
  timeLeft: number;
  isExpired: boolean;
  hasReachedMaxAttempts: boolean;
  codeLength: number;
  
  // Actions
  setOtp: (value: string) => void;
  handleVerify: () => void;
  handleResend: () => void;
  handleCancel: () => void;
}

interface VerificationProviderProps {
  children: ReactNode;
  onVerify: (code: string) => Promise<boolean>;
  onCancel?: () => void;
  onResend?: () => Promise<void>;
  codeLength?: number;
  maxAttempts?: number;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const VerificationProvider: React.FC<VerificationProviderProps> = ({
  children,
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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const value = {
    otp,
    isVerifying,
    isResending,
    attempts,
    timeLeft,
    isExpired,
    hasReachedMaxAttempts: attempts >= maxAttempts,
    codeLength,
    setOtp,
    handleVerify,
    handleResend,
    handleCancel
  };

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = (): VerificationContextType => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error("useVerification must be used within a VerificationProvider");
  }
  return context;
};
