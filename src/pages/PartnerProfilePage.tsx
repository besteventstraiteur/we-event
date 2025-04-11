
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePartnerProfile } from "@/hooks/usePartnerProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GoldButton from "@/components/GoldButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Phone, Mail, Globe, MapPin, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useDeviceType } from "@/hooks/use-mobile";
import HomeHeader from "@/components/home/HomeHeader";
import PartnersFooter from "@/components/partners/PartnersFooter";

const PartnerProfilePage = () => {
  const { id } = useParams();
  const { profile, isLoading } = usePartnerProfile();
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactDialog, setShowContactDialog] = useState(false);
  const { toast } = useToast();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Dans une application réelle, vous récupéreriez les données du prestataire en fonction de l'ID
  useEffect(() => {
    console.log(`Chargement du profil partenaire ID: ${id}`);
    // Simulation d'un appel API avec l'ID du partenaire
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="mt-4 text-amber-600">Chargement du profil...</p>
      </div>
    );
  }

  const handleContact = () => {
    // Dans une application réelle, vous géreriez le formulaire de contact ici
    setShowContactDialog(true);
  };

  const handleBookAppointment = () => {
    toast({
      title: "Demande de rendez-vous",
      description: "Votre demande de rendez-vous a été envoyée. Le prestataire vous contactera prochainement.",
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HomeHeader />

      <main className={`flex-1 container ${isMobile ? 'py-3 px-3' : 'py-8'}`}>
        {profile && (
          <>
            {/* En-tête du profil */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {profile.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{profile.name}</h1>
                    <Badge className="bg-amber-500 hover:bg-amber-600 self-start">{profile.category}</Badge>
                    {profile.discount && (
                      <Badge className="bg-green-500 hover:bg-green-600 self-start">
                        Réduction VIP: {profile.discount}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <span className="ml-1 text-gray-700 font-medium">4.8/5</span>
                    <span className="ml-2 text-gray-500">(24 avis)</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <GoldButton onClick={handleBookAppointment} className="gap-2">
                    <Calendar size={16} />
                    Prendre RDV
                  </GoldButton>
                  <GoldButton onClick={handleContact} variant="outline" className="border-amber-200 hover:bg-amber-50 gap-2">
                    <Phone size={16} />
                    Contacter
                  </GoldButton>
                </div>
              </div>
            </div>

            {/* Onglets */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  Présentation
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio" 
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                >
                  Avis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">À propos</h3>
                    <p className="text-gray-700">{profile.description}</p>
                    
                    {profile.pricing && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Tarifs</h3>
                        <p className="text-gray-700 font-medium">{profile.pricing.basePrice}</p>
                        
                        {profile.pricing.packages && profile.pricing.packages.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {profile.pricing.packages.map((pkg) => (
                              <Card key={pkg.id} className="bg-gray-50 border-gray-200">
                                <CardContent className="p-4">
                                  <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                                  <p className="text-amber-600 font-semibold mt-1">{pkg.price}</p>
                                  <p className="text-sm text-gray-600 mt-2">{pkg.description}</p>
                                  <ul className="mt-3 space-y-1">
                                    {pkg.features.map((feature, index) => (
                                      <li key={index} className="text-sm flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Coordonnées</h3>
                    
                    {profile.contact && (
                      <div className="space-y-3">
                        {profile.contact.email && (
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-500 mr-3" />
                            <span>{profile.contact.email}</span>
                          </div>
                        )}
                        
                        {profile.contact.phone && (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-500 mr-3" />
                            <span>{profile.contact.phone}</span>
                          </div>
                        )}
                        
                        {profile.contact.website && (
                          <div className="flex items-center">
                            <Globe className="h-5 w-5 text-gray-500 mr-3" />
                            <a href={`https://${profile.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                              {profile.contact.website}
                            </a>
                          </div>
                        )}
                        
                        {profile.contact.address && (
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                            <span>{profile.contact.address}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Nos services</h3>
                    
                    {profile.services && profile.services.length > 0 ? (
                      <ul className="space-y-2">
                        {profile.services.map((service, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">Aucun service précisé</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Portfolio</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {profile.images.filter(img => img.type === 'gallery').map((image) => (
                        <div key={image.id} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={image.url} 
                            alt={image.alt || "Image de portfolio"} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      
                      {profile.images.filter(img => img.type === 'gallery').length === 0 && (
                        <p className="text-gray-500 italic col-span-3">Aucune image dans le portfolio</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Avis clients</h3>
                    
                    <div className="space-y-4">
                      {/* Exemple d'avis - Dans une vraie application, ces données viendraient d'une API */}
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= 5 ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-700 font-medium">5.0</span>
                        </div>
                        <p className="mt-2 text-gray-800">"Service exceptionnel ! Je recommande vivement ce prestataire pour son professionnalisme et sa qualité de service."</p>
                        <p className="mt-1 text-sm text-gray-500">Sophie M. • 23/04/2023</p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[1, 2, 3, 4].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= 4 ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
                              />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="ml-2 text-gray-700 font-medium">4.0</span>
                        </div>
                        <p className="mt-2 text-gray-800">"Très bonne prestation, à l'écoute de nos besoins. Seul petit bémol sur le timing, sinon parfait !"</p>
                        <p className="mt-1 text-sm text-gray-500">Thomas D. • 15/03/2023</p>
                      </div>
                      
                      <div className="text-center mt-4">
                        <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                          Voir plus d'avis
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      <PartnersFooter />

      {/* Dialog de contact */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contacter {profile?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-gray-700">
              Pour contacter ce prestataire directement, veuillez vous connecter ou créer un compte client.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <GoldButton onClick={() => window.location.href = "/login"}>
                Se connecter
              </GoldButton>
              <GoldButton variant="outline" onClick={() => window.location.href = "/register-client"}>
                Créer un compte
              </GoldButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerProfilePage;
