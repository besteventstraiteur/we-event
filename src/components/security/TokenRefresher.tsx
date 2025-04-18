
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/lib/supabase';

interface TokenRefresherProps {
  children: React.ReactNode;
}

const TokenRefresher: React.FC<TokenRefresherProps> = ({ children }) => {
  const { session, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !session) return;

    const refreshToken = async () => {
      try {
        const { error } = await supabase.auth.refreshSession();
        if (error) {
          console.error('Token refresh failed:', error);
        }
      } catch (err) {
        console.error('Unexpected error during token refresh:', err);
      }
    };

    // Refresh token 5 minutes before expiration
    const refreshInterval = setInterval(refreshToken, 25 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [isAuthenticated, session]);

  return <>{children}</>;
};

export default TokenRefresher;
