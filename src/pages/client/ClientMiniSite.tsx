
import React from "react";
import MiniSiteGenerator from "@/components/mini-site/MiniSiteGenerator";
import GuestBook from "@/components/guests/GuestBook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryHorizontal, MessageSquare, CalendarRange, MapPin, Users } from "lucide-react";

const ClientMiniSite = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <GalleryHorizontal className="h-4 w-4" />
            Générateur
          </TabsTrigger>
          <TabsTrigger value="guestbook" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Livre d'or
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4" />
            Programme
          </TabsTrigger>
          <TabsTrigger value="guests" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Invités
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <MiniSiteGenerator />
        </TabsContent>
        
        <TabsContent value="guestbook">
          <Card>
            <CardContent className="pt-6">
              <GuestBook />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <CalendarRange className="h-5 w-5 text-amber-500" />
                Programme du mariage
              </h2>
              <p className="text-muted-foreground mb-6">
                Définissez le programme détaillé de votre journée de mariage que vos invités pourront consulter sur le mini-site.
              </p>
              
              <div className="text-center p-12 border-2 border-dashed rounded-md">
                Fonctionnalité à venir
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guests">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-500" />
                Gestion des accès invités
              </h2>
              <p className="text-muted-foreground mb-6">
                Gérez qui peut accéder à votre mini-site et quelles fonctionnalités sont disponibles pour vos invités.
              </p>
              
              <div className="text-center p-12 border-2 border-dashed rounded-md">
                Fonctionnalité à venir
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientMiniSite;
