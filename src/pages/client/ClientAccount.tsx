
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { User, Shield, Key } from "lucide-react";
import PasswordCard from "@/components/security/PasswordCard";
import TwoFactorCard from "@/components/security/TwoFactorCard";
import BiometricCard from "@/components/security/BiometricCard";
import EncryptionCard from "@/components/security/EncryptionCard";
import { useTwoFactorAuth } from "@/hooks/useTwoFactorAuth";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useEncryption } from "@/hooks/useEncryption";

const ClientAccount = () => {
  // Two-factor authentication
  const {
    is2FAEnabled,
    handleToggle2FA,
    verificationMethod,
    setVerificationMethod,
    isLoading: is2FALoading
  } = useTwoFactorAuth();

  // Biometric authentication
  const {
    isBiometricEnabled,
    isBiometricSupported,
    isNativeApp,
    toggleBiometricAuth,
    isLoading: isBiometricLoading
  } = useBiometricAuth();

  // Encryption
  const {
    isEncryptionEnabled,
    setEncryptionEnabled,
    showEncryptionDetails,
    setShowEncryptionDetails
  } = useEncryption();

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mon compte</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et vos préférences de sécurité
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Préférences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User className="w-12 h-12 text-gray-500" />
                      <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="firstName">Prénom</label>
                          <input 
                            id="firstName" 
                            className="w-full p-2 rounded-md border border-gray-300" 
                            defaultValue="Sophie" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="lastName">Nom</label>
                          <input 
                            id="lastName" 
                            className="w-full p-2 rounded-md border border-gray-300" 
                            defaultValue="Martin" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="email">Email</label>
                          <input 
                            id="email" 
                            className="w-full p-2 rounded-md border border-gray-300" 
                            defaultValue="sophie.martin@example.com" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="phone">Téléphone</label>
                          <input 
                            id="phone" 
                            className="w-full p-2 rounded-md border border-gray-300" 
                            defaultValue="+33 6 12 34 56 78" 
                          />
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-md">
                        Enregistrer les modifications
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <PasswordCard />
            <TwoFactorCard 
              is2FAEnabled={is2FAEnabled}
              onToggle2FA={handleToggle2FA}
              verificationMethod={verificationMethod}
              setVerificationMethod={setVerificationMethod}
              isLoading={is2FALoading}
            />
            <BiometricCard 
              isBiometricEnabled={isBiometricEnabled}
              isBiometricSupported={isBiometricSupported}
              onToggleBiometric={toggleBiometricAuth}
              isNative={isNativeApp}
              isLoading={isBiometricLoading}
            />
            <EncryptionCard 
              encryptionEnabled={isEncryptionEnabled}
              setEncryptionEnabled={setEncryptionEnabled}
              showEncryptionDetails={showEncryptionDetails}
              setShowEncryptionDetails={setShowEncryptionDetails}
            />
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Préférences et notifications</h2>
                  <p className="text-muted-foreground">
                    Personnalisez vos préférences de communication et vos notifications
                  </p>
                  
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications par email</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des mises à jour sur votre mariage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications SMS</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des alertes importantes par SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Newsletters</h3>
                        <p className="text-sm text-muted-foreground">Recevoir des conseils et inspirations pour votre mariage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Langue</h3>
                        <p className="text-sm text-muted-foreground">Choisissez votre langue préférée</p>
                      </div>
                      <select className="border border-gray-300 rounded-md p-2">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>
                  
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
                    Enregistrer les préférences
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientAccount;
