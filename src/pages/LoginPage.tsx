
import React from "react";
import AuthLayout from "@/components/AuthLayout";
import { Separator } from "@/components/ui/separator";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import { useDeviceType } from "@/hooks/use-mobile";

// Components
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import BiometricLoginPrompt from "@/components/auth/BiometricLoginPrompt";
import LoginDebugInfo from "@/components/auth/LoginDebugInfo";

// Custom hook
import { useLoginPageLogic } from "@/hooks/useLoginPageLogic";

const LoginPage = () => {
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  
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
    handleBiometricLogin,
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
                onBiometricLogin={handleBiometricLogin}
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
    <MobileOptimizedLayout fullHeight>
      {content}
      {/* Position the navigation outside the main content to avoid nesting issues */}
      <MobileNavigation type="guest" />
    </MobileOptimizedLayout>
  );
};

export default LoginPage;
