
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { supabase } from '@/integrations/supabase/client';

const TokenRefresher: React.FC = () => {
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

  return null;
};

export default TokenRefresher;
