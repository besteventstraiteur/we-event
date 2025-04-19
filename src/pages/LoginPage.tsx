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
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    console.log("LoginPage - Auth state:", { 
      isAuthenticated, 
      user,
      locationState: location.state,
      storedRedirect: sessionStorage.getItem("redirectAfterLogin")
    });
    
    if (isAuthenticated && user) {
      // Normaliser le rôle pour la comparaison
      const userRoleStr = String(user.role || user.user_metadata?.role || '').toLowerCase().trim();
      
      console.log("LoginPage - User role detected:", userRoleStr);
      
      // Get the redirect path in order of priority:
      // 1. From state (direct navigation attempt)
      // 2. From session storage (saved by ProtectedRoute)
      // 3. Default based on user role
      let redirectPath;
      
      if (location.state?.from) {
        redirectPath = location.state.from;
        console.log("Using redirect path from location state:", redirectPath);
      } else if (sessionStorage.getItem("redirectAfterLogin")) {
        redirectPath = sessionStorage.getItem("redirectAfterLogin");
        console.log("Using stored redirect path:", redirectPath);
      } else {
        // Fallback to role-based dashboard
        switch (userRoleStr) {
          case 'admin':
            redirectPath = '/admin/dashboard';
            break;
          case 'partner':
            redirectPath = '/partner/dashboard';
            break;
          default:
            redirectPath = '/client/dashboard';
        }
        console.log("Using default role-based redirect:", redirectPath);
      }
      
      console.log("User is authenticated, will redirect to:", redirectPath, "Role:", userRoleStr);
      
      // Use a slight delay to ensure state updates before navigation
      setTimeout(() => {
        // Clear stored redirect
        sessionStorage.removeItem("redirectAfterLogin");
        
        // Navigate with replace to avoid back-button issues
        navigate(redirectPath, { replace: true });
      }, 500);
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
