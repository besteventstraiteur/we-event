
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoConferenceList from "@/components/video-conference/VideoConferenceList";
import VideoConferenceForm from "@/components/video-conference/VideoConferenceForm";

const PartnerLiveStreaming = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Vidéo & Streaming en Direct</h1>
          <p className="text-vip-gray-400">
            Créez et gérez vos visioconférences et talkshows en direct avec les mariés et invités
          </p>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid grid-cols-3 sm:grid-cols-4 w-full">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="past">Passées</TabsTrigger>
            <TabsTrigger value="manage">Gérer</TabsTrigger>
            <TabsTrigger value="create">Créer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <VideoConferenceList 
              title="Visioconférences à venir"
              currentUserId="partner-001" // Dans une app réelle, ce serait l'ID du partenaire connecté
              isAdmin={true}
            />
          </TabsContent>
          
          <TabsContent value="past">
            <VideoConferenceList 
              title="Visioconférences passées" 
              currentUserId="partner-001"
              isAdmin={true}
            />
          </TabsContent>
          
          <TabsContent value="manage">
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Gérer les visioconférences</h2>
              
              <div className="bg-vip-gray-800 p-6 rounded-lg border border-vip-gray-700 space-y-4">
                <h3 className="text-lg font-medium">Conseils pour les visioconférences</h3>
                <ul className="list-disc list-inside space-y-2 text-vip-gray-300">
                  <li>Assurez-vous d'avoir une connexion Internet stable</li>
                  <li>Utilisez un microphone externe pour une meilleure qualité audio</li>
                  <li>Préparez votre environnement : éclairage, arrière-plan, etc.</li>
                  <li>Faites un test avant la diffusion avec un collègue</li>
                  <li>Envoyez les invitations au moins 24h à l'avance</li>
                  <li>Préparez votre contenu et vos supports visuels</li>
                </ul>
              </div>
              
              <div className="bg-vip-gray-800 p-6 rounded-lg border border-vip-gray-700">
                <h3 className="text-lg font-medium mb-4">Statistiques des visioconférences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-vip-gray-900 p-4 rounded-lg">
                    <p className="text-lg font-medium">12</p>
                    <p className="text-sm text-vip-gray-400">Visioconférences créées</p>
                  </div>
                  <div className="bg-vip-gray-900 p-4 rounded-lg">
                    <p className="text-lg font-medium">87</p>
                    <p className="text-sm text-vip-gray-400">Participants total</p>
                  </div>
                  <div className="bg-vip-gray-900 p-4 rounded-lg">
                    <p className="text-lg font-medium">4.8/5</p>
                    <p className="text-sm text-vip-gray-400">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="create">
            <VideoConferenceForm 
              onSuccess={(conferenceId) => {
                // Rediriger vers l'onglet "À venir"
                const upcomingTab = document.querySelector('[data-state="inactive"][value="upcoming"]') as HTMLElement;
                if (upcomingTab) {
                  upcomingTab.click();
                }
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerLiveStreaming;
