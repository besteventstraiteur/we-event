
import React, { useEffect } from "react";
import AuthLayout from "@/components/AuthLayout";
import { Separator } from "@/components/ui/separator";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import { useDeviceType } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

// Components
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import BiometricLoginPrompt from "@/components/auth/BiometricLoginPrompt";
import LoginDebugInfo from "@/components/auth/LoginDebugInfo";

// Custom hook
import { useLoginPageLogic } from "@/hooks/useLoginPageLogic";
import { useAuth } from "@/hooks/useAuth";
import { getRedirectPathForRole } from "@/hooks/auth/utils/redirectUtils";

const LoginPage = () => {
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated && user) {
      console.log("User already authenticated, redirecting:", user);
      
      // Déterminer le rôle pour une redirection appropriée
      const userRole = 
        user.role || 
        user.user_metadata?.role ||
        user.raw_user_meta_data?.role ||
        'client';
      
      console.log("Detected user role:", userRole);
      
      // Obtenir le chemin de redirection basé sur le rôle
      const redirectPath = getRedirectPathForRole(userRole);
      
      console.log("Redirecting authenticated user to:", redirectPath);
      
      // Rediriger immédiatement
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);
  
  const {
    // State
    isLoading,
    forgotPassword,
    resetSent,
    showTwoFactor,
    authDebugInfo,
    error,
    
    // Biometric
    biometricAttempt,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricLoading,
    
    // Functions
    setForgotPassword,
    handleLoginSubmit,
    handleResetPassword,
    handleVerifyOTP,
    handleSocialLoginSuccess,
    handleBiometricAuth,
  } = useLoginPageLogic();

  // Si l'utilisateur est déjà authentifié, ne pas afficher la page de connexion
  if (isAuthenticated && user) {
    return null; // Page vide pendant la redirection
  }

  const content = (
    <>
      {showTwoFactor ? (
        <AuthLayout 
          title="Vérification en deux étapes" 
          subtitle="Un code de vérification a été envoyé à votre appareil"
        >
          <TwoFactorVerification 
            onVerify={handleVerifyOTP}
            onCancel={() => setForgotPassword(false)}
            onResend={async () => {
              // This logic is kept in the component for simplicity
            }}
          />
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Pour les besoins de la démo, le code valide est: 123456</p>
          </div>
        </AuthLayout>
      ) : (
        <AuthLayout 
          title={forgotPassword ? "Récupération de mot de passe" : "Connexion"} 
          subtitle={forgotPassword ? "Nous vous enverrons un lien de récupération" : "Accédez à votre espace VIP"}
        >
          {!forgotPassword ? (
            <>
              <BiometricLoginPrompt 
                biometricAttempt={biometricAttempt}
                isBiometricEnabled={isBiometricEnabled}
                isNative={isNative}
                isMobileDevice={isMobileDevice}
                biometricError={biometricError}
                isLoading={biometricLoading}
                onBiometricLogin={handleBiometricAuth}
              />

              <SocialLoginButtons onLoginSuccess={handleSocialLoginSuccess} />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">ou</span>
                </div>
              </div>

              <LoginForm 
                onSubmit={handleLoginSubmit} 
                onForgotPassword={() => setForgotPassword(true)} 
                isLoading={isLoading}
                error={error} 
              />
            </>
          ) : (
            <PasswordResetForm 
              onSubmit={handleResetPassword}
              onCancel={() => setForgotPassword(false)}
              isLoading={isLoading}
              resetSent={resetSent}
            />
          )}
          
          <LoginDebugInfo {...authDebugInfo} />
        </AuthLayout>
      )}
    </>
  );

  return (
    <>
      <MobileOptimizedLayout fullHeight>
        {content}
      </MobileOptimizedLayout>
      
      {/* Navigation displayed outside of the MobileOptimizedLayout */}
      <MobileNavigation type="guest" />
    </>
  );
};

export default LoginPage;
