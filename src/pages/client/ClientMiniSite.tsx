
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
              
              <p className="text-center text-sm text-muted-foreground mt-2 mb-4">
                Utilisez l'onglet "Programme" dans le générateur de mini-site pour configurer votre planning.
              </p>
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="gap-2" 
                  onClick={() => document.querySelector('[value="generator"]')?.dispatchEvent(new Event('click'))}
                >
                  <GalleryHorizontal className="h-4 w-4" />
                  Aller au Générateur
                </Button>
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

function Button({ variant, className, onClick, children }) {
  const variantClasses = variant === 'outline' 
    ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' 
    : 'bg-primary text-primary-foreground hover:bg-primary/90';
  
  return (
    <button 
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
