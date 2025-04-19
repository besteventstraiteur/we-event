
import React, { useEffect } from "react";
import AuthLayout from "@/components/AuthLayout";
import { Separator } from "@/components/ui/separator";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import { useDeviceType } from "@/hooks/use-mobile";
import { useNavigate, useLocation } from "react-router-dom";

// Components
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import BiometricLoginPrompt from "@/components/auth/BiometricLoginPrompt";
import LoginDebugInfo from "@/components/auth/LoginDebugInfo";

// Custom hook
import { useLoginPageLogic } from "@/hooks/useLoginPageLogic";
import { useAuth } from "@/hooks/auth/useAuth";

const LoginPage = () => {
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  // Effect to redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("LoginPage - User is authenticated:", user);
      
      // Determine the redirect path from user role
      const userRole = String(user.role || user.user_metadata?.role || '').toLowerCase();
      let redirectPath;
      
      // First check if there's a redirect path in state or session storage
      const fromPath = location.state?.from;
      const storedPath = sessionStorage.getItem("redirectAfterLogin");
      
      if (fromPath) {
        redirectPath = fromPath;
        console.log("Using path from location state:", redirectPath);
      } else if (storedPath) {
        redirectPath = storedPath;
        sessionStorage.removeItem("redirectAfterLogin"); // Clear it after use
        console.log("Using stored redirect path:", redirectPath);
      } else {
        // Use default paths based on role
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
        console.log("Using default role-based path:", redirectPath);
      }
      
      console.log(`Redirecting to: ${redirectPath} (role: ${userRole})`);
      
      // Use a timeout to ensure state updates complete before navigation
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 800); // Increased delay for more reliable navigation
    }
  }, [isAuthenticated, user, navigate, location.state]);
  
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
