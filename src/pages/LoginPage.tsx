
import React, { useEffect, useRef, useState } from "react";
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

const LoginPage = () => {
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const redirectAttempted = useRef(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  
  useEffect(() => {
    // Check authentication status once, with a slight delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      if (isAuthenticated && user && !redirectAttempted.current) {
        // Mark that we've attempted redirection to avoid loops
        redirectAttempted.current = true;
        
        // Normalize the role for comparison
        let userRole = '';
        
        // Get the user role directly from user.role
        if (typeof user.role === 'string') {
          userRole = user.role.toLowerCase().trim();
        }
        
        // Redirection based on user role
        let redirectPath;
        
        console.log("LoginPage - User is authenticated with role:", userRole);
        
        switch (userRole) {
          case 'admin':
            redirectPath = '/admin/dashboard';
            break;
          case 'partner':
            redirectPath = '/partner/dashboard';
            break;
          default:
            redirectPath = '/client/dashboard';
        }
        
        console.log("User already authenticated, redirecting to:", redirectPath);
        
        try {
          window.location.href = redirectPath;
        } catch (e) {
          console.error("Error during redirection:", e);
          // Fallback to navigate if window.location fails
          navigate(redirectPath, { replace: true });
        }
      }
      setHasCheckedAuth(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, navigate]);
  
  const {
    // State
    isLoading,
    forgotPassword,
    resetSent,
    showTwoFactor,
    authDebugInfo,
    
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

  // Show loading state while checking auth
  if (!hasCheckedAuth) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse">Vérification de l'authentification...</div>
    </div>;
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
