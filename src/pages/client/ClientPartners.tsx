
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import PartnerDirectory from "@/components/partners/PartnerDirectory";
import MyPartners from "@/components/partners/MyPartners";
import ContactDialog from "@/components/partners/ContactDialog";
import AppointmentDialog from "@/components/partners/AppointmentDialog";
import { partnerCategories, allPartners, myPartners } from "@/components/partners/data";

const ClientPartners = () => {
  const [activeTab, setActiveTab] = useState("directory");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleContact = (partner: any) => {
    setSelectedPartner(partner);
    setContactDialogOpen(true);
  };

  const handleScheduleAppointment = (partner: any) => {
    setSelectedPartner(partner);
    setAppointmentDialogOpen(true);
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>Prestataires</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Découvrez nos prestataires exclusifs et gérez vos collaborations
          </p>
        </div>

        <Tabs defaultValue="directory" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger 
              value="directory" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Annuaire VIP
            </TabsTrigger>
            <TabsTrigger 
              value="my-partners" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Mes Prestataires
            </TabsTrigger>
          </TabsList>

          {/* Onglet Annuaire VIP */}
          <TabsContent value="directory" className="mt-4">
            <PartnerDirectory 
              partners={allPartners}
              partnerCategories={partnerCategories}
              onContactPartner={handleContact}
            />
          </TabsContent>

          {/* Onglet Mes Prestataires */}
          <TabsContent value="my-partners" className="mt-4">
            <MyPartners 
              partners={myPartners}
              partnerCategories={partnerCategories}
              onContactPartner={handleContact}
              onScheduleAppointment={handleScheduleAppointment}
              onBrowseDirectory={() => setActiveTab("directory")}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <ContactDialog 
        isOpen={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        partner={selectedPartner}
      />

      <AppointmentDialog 
        isOpen={appointmentDialogOpen}
        onClose={() => setAppointmentDialogOpen(false)}
        partner={selectedPartner}
      />
    </DashboardLayout>
  );
};

export default ClientPartners;
