
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoConferenceList from "@/components/video-conference/VideoConferenceList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Video, Clock } from "lucide-react";

const ClientLiveStreaming = () => {
  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Vidéo & Streaming en Direct</h1>
          <p className="text-vip-gray-400">
            Retrouvez ici toutes vos visioconférences avec vos prestataires et invités
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-vip-gray-400" />
                Planifiées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4 text-vip-gray-400" />
                Prochaine réunion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">Jeudi, 15h30</p>
              <p className="text-xs text-vip-gray-400">Planification florale</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Video className="mr-2 h-4 w-4 text-vip-gray-400" />
                Talkshows en direct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1</p>
              <p className="text-xs text-vip-gray-400">Ce weekend</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="mr-2 h-4 w-4 text-vip-gray-400" />
                Points invités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">24/56</p>
              <p className="text-xs text-vip-gray-400">Ont rejoint une visio</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="past">Passées</TabsTrigger>
            <TabsTrigger value="talkshows">Talkshows en direct</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <VideoConferenceList 
              title="Visioconférences à venir"
              currentUserId="client-001" // Dans une app réelle, ce serait l'ID du client connecté
            />
          </TabsContent>
          
          <TabsContent value="past">
            <VideoConferenceList 
              title="Visioconférences passées" 
              currentUserId="client-001"
            />
          </TabsContent>
          
          <TabsContent value="talkshows">
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Talkshows en direct</h2>
              
              <p className="text-vip-gray-400">
                Rejoignez des talkshows en direct avec nos experts du mariage.
                Posez vos questions et obtenez des conseils en temps réel !
              </p>
              
              <VideoConferenceList 
                title="Talkshows programmés"
                relatedType="talkshow"
                currentUserId="client-001"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientLiveStreaming;
