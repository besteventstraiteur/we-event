
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extract hash parameters from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (!accessToken) {
          // Check if this is an error response
          const errorDescription = hashParams.get('error_description');
          
          if (errorDescription) {
            setError(errorDescription);
            return;
          }
          
          // If not an error and no access token, something unexpected happened
          setError("No access token found in the callback URL");
          return;
        }
        
        // Exchange the hash params for a session
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (data.session) {
          // Get user profile
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', userData.user.id)
              .single();
              
            // Redirect based on user role
            if (profile && profile.role) {
              switch (profile.role) {
                case 'ADMIN':
                  navigate('/admin/dashboard');
                  break;
                case 'PARTNER':
                  navigate('/partner/dashboard');
                  break;
                default:
                  navigate('/client/dashboard');
                  break;
              }
              return;
            }
          }
          
          // Default redirect if no specific role was found
          navigate('/client/dashboard');
        }
      } catch (err) {
        console.error('Error during authentication callback:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred during authentication');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-vip-gray-900">
      {error ? (
        <div className="text-center p-6 bg-vip-gray-800 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold text-red-400 mb-2">Erreur d'authentification</h1>
          <p className="text-vip-gray-400 mb-4">{error}</p>
          <button
            className="bg-vip-gold hover:bg-vip-gold/90 text-white px-4 py-2 rounded"
            onClick={() => navigate('/login')}
          >
            Retourner à la page de connexion
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-vip-gold mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-vip-white mb-2">Authentication en cours...</h1>
          <p className="text-vip-gray-400">Veuillez patienter pendant que nous vous connectons</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallback;
