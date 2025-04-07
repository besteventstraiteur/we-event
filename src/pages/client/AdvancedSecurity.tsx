
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useTwoFactorAuth } from "@/hooks/useTwoFactorAuth";
import { useEncryption } from "@/hooks/useEncryption";
import { useAccessControl } from "@/hooks/useAccessControl";
import SecurityHeader from "@/components/security/SecurityHeader";
import TwoFactorCard from "@/components/security/TwoFactorCard";
import BiometricCard from "@/components/security/BiometricCard";
import EncryptionCard from "@/components/security/EncryptionCard";
import PasswordCard from "@/components/security/PasswordCard";
import AdvancedSecurityCard from "@/components/security/AdvancedSecurityCard";
import { UserRole, Permission } from "@/utils/accessControl";

const AdvancedSecurity: React.FC = () => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
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

  // Initialiser avec un utilisateur client pour la démo
  const { currentUser, hasPermission } = useAccessControl({
    id: "demo-user",
    role: UserRole.CLIENT
  });

  const isMobile = useIsMobile();

  // Vérifier si l'utilisateur a accès aux paramètres avancés
  const canAccessAdvancedSettings = hasPermission(Permission.MANAGE_PAYMENTS);

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <SecurityHeader />

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
          
          {canAccessAdvancedSettings && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="w-full"
              >
                {showAdvancedSettings ? "Masquer" : "Afficher"} les paramètres de sécurité avancés
              </Button>
              
              {showAdvancedSettings && (
                <AdvancedSecurityCard 
                  currentUser={currentUser}
                />
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdvancedSecurity;
