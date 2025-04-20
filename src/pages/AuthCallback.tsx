
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
        console.log("Auth callback handling initiated");
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
          console.error("Session error in callback:", sessionError);
          setError(sessionError?.message || "Failed to retrieve session");
          return;
        }
        
        console.log("Session found in callback, getting user data");
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData.user) {
          // Tenter d'accéder au rôle depuis user_metadata ou la table profiles
          console.log("User found:", userData.user.id);
          let role = userData.user.user_metadata?.role;
          
          if (!role) {
            console.log("Role not found in metadata, checking profiles");
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', userData.user.id)
              .single();
              
            role = profile?.role;
            console.log("Profile role:", role);
          }
          
          if (role) {
            let redirectPath = '/client/dashboard'; // Default path
            
            switch (String(role).toLowerCase()) {
              case 'admin':
                redirectPath = '/admin/dashboard';
                break;
              case 'partner':
                redirectPath = '/partner/dashboard';
                break;
              default:
                redirectPath = '/client/dashboard';
                break;
            }
            
            console.log("Redirecting to:", redirectPath);
            navigate(redirectPath, { replace: true });
            return;
          } else {
            console.log("No role found, redirecting to default client dashboard");
          }
        } else {
          console.log("No user found in auth data");
        }
        
        // Par défaut, rediriger vers le dashboard client
        navigate('/client/dashboard', { replace: true });
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
