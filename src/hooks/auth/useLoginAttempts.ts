
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const useLoginAttempts = () => {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const recordLoginAttempt = useCallback((success: boolean) => {
    if (success) {
      setLoginAttempts(0);
      setLockoutUntil(null);
      return true;
    }

    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);

    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
      setLockoutUntil(lockoutTime);
      
      toast({
        title: "Trop de tentatives de connexion",
        description: `Votre compte est verrouillé pendant 15 minutes. Réessayez plus tard.`,
        variant: "destructive"
      });

      return false;
    }

    return true;
  }, [loginAttempts]);

  const canAttemptLogin = useCallback(() => {
    if (!lockoutUntil) return true;
    
    if (Date.now() > lockoutUntil) {
      setLockoutUntil(null);
      setLoginAttempts(0);
      return true;
    }

    const remainingTime = Math.ceil((lockoutUntil - Date.now()) / 60000);
    
    toast({
      title: "Compte temporairement verrouillé",
      description: `Veuillez réessayer dans ${remainingTime} minute${remainingTime > 1 ? 's' : ''}.`,
      variant: "destructive"
    });

    return false;
  }, [lockoutUntil]);

  return { recordLoginAttempt, canAttemptLogin };
};
