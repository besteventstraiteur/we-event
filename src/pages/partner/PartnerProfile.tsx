
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileInfoForm from "@/components/partner/profile/ProfileInfoForm";
import ProfileGallery from "@/components/partner/profile/ProfileGallery";
import ProfileServices from "@/components/partner/profile/ProfileServices";
import ProfilePricing from "@/components/partner/profile/ProfilePricing";
import { usePartnerProfile } from "@/hooks/usePartnerProfile";
import { PartnerProfile } from "@/models/partnerProfile";
import { useToast } from "@/hooks/use-toast";

const PartnerProfilePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  const { profile, updateProfile, isLoading } = usePartnerProfile();
  
  const handleSaveSuccess = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout type="partner">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vip-gold"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-vip-gray-400">Personnalisez votre profil visible par les clients</p>
        </div>

        <Card className="bg-white border-vip-gray-200">
          <CardHeader>
            <CardTitle>Personnalisation de la fiche</CardTitle>
            <CardDescription>
              Modifiez les informations de votre profil qui seront visibles sur votre page vitrine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="gallery">Galerie</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="pricing">Tarification</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <ProfileInfoForm 
                  initialData={profile} 
                  onSave={(data) => {
                    updateProfile(data);
                    handleSaveSuccess();
                  }}
                />
              </TabsContent>

              <TabsContent value="gallery">
                <ProfileGallery 
                  images={profile?.images || []} 
                  onUpdate={(images) => {
                    updateProfile({ ...profile, images });
                    handleSaveSuccess();
                  }}
                />
              </TabsContent>

              <TabsContent value="services">
                <ProfileServices 
                  services={profile?.services || []}
                  onUpdate={(services) => {
                    updateProfile({ ...profile, services });
                    handleSaveSuccess();
                  }}
                />
              </TabsContent>

              <TabsContent value="pricing">
                <ProfilePricing 
                  pricing={profile?.pricing}
                  onUpdate={(pricing) => {
                    updateProfile({ ...profile, pricing });
                    handleSaveSuccess();
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerProfilePage;
