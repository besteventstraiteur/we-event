
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTwoFactorAuth } from "@/hooks/useTwoFactorAuth";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useEncryption } from "@/hooks/useEncryption";
import SecurityHeader from "@/components/security/SecurityHeader";
import TwoFactorCard from "@/components/security/TwoFactorCard";
import BiometricCard from "@/components/security/BiometricCard";
import EncryptionCard from "@/components/security/EncryptionCard";
import PasswordCard from "@/components/security/PasswordCard";

const TwoFactorSetup: React.FC = () => {
  const {
    is2FAEnabled,
    showVerification,
    setShowVerification,
    verificationMethod,
    setVerificationMethod,
    isLoading: is2FALoading,
    handleToggle2FA,
    handleVerifyOTP,
    handleResendCode,
  } = useTwoFactorAuth();

  const {
    isBiometricEnabled,
    isBiometricSupported,
    isNative,
    isLoading: isBiometricLoading,
    handleToggleBiometric
  } = useBiometricAuth();

  const {
    encryptionEnabled,
    setEncryptionEnabled,
    showEncryptionDetails,
    setShowEncryptionDetails
  } = useEncryption();

  const isMobile = useIsMobile();

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <SecurityHeader />

        {showVerification ? (
          <>
            <div className="mb-4">
              <Button variant="outline" onClick={() => setShowVerification(false)}>
                Retour aux paramètres
              </Button>
            </div>
            <TwoFactorVerification 
              onVerify={handleVerifyOTP} 
              onCancel={() => setShowVerification(false)}
              onResend={handleResendCode}
              maxAttempts={5}
            />
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Pour les besoins de la démo, le code valide est: 123456</p>
            </div>
          </>
        ) : (
          <div className="grid gap-6">
            <TwoFactorCard 
              is2FAEnabled={is2FAEnabled}
              onToggle2FA={handleToggle2FA}
              verificationMethod={verificationMethod}
              setVerificationMethod={setVerificationMethod}
              isLoading={is2FALoading}
            />

            {(isNative || isMobile) && (
              <BiometricCard 
                isBiometricEnabled={isBiometricEnabled}
                isBiometricSupported={isBiometricSupported}
                onToggleBiometric={handleToggleBiometric}
                isNative={isNative}
                isLoading={isBiometricLoading}
              />
            )}

            <EncryptionCard 
              encryptionEnabled={encryptionEnabled}
              setEncryptionEnabled={setEncryptionEnabled}
              showEncryptionDetails={showEncryptionDetails}
              setShowEncryptionDetails={setShowEncryptionDetails}
            />

            <PasswordCard />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TwoFactorSetup;
