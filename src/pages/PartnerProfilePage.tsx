import React, { useState, Suspense } from "react";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { MediaLoadingFallback } from "@/components/shared/MediaLoadingFallback";
import { useParams } from "react-router-dom";
import { usePartnerProfile } from "@/hooks/usePartnerProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GoldButton from "@/components/GoldButton";
import { Star, Phone, Mail, Globe, MapPin, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useDeviceType } from "@/hooks/use-mobile";
import HomeHeader from "@/components/home/HomeHeader";
import PartnersFooter from "@/components/partners/PartnersFooter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const PartnerProfilePage = () => {
  const { id } = useParams();
  const { profile, isLoading } = usePartnerProfile();
  const [showContactDialog, setShowContactDialog] = useState(false);
  const { toast } = useToast();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const handleContact = () => {
    setShowContactDialog(true);
  };

  const handleBookAppointment = () => {
    toast({
      title: "Demande de rendez-vous envoyée",
      description: "Le prestataire vous contactera prochainement.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="mt-4 text-amber-600">Chargement du profil...</p>
      </div>
    );
  }

  const galleryImages = profile?.images.filter(img => img.type === 'gallery') || [];
  const featuredImages = galleryImages.filter(img => img.featured);
  const regularImages = galleryImages.filter(img => !img.featured);
  const sortedImages = [...featuredImages, ...regularImages];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HomeHeader />

      <main className={`flex-1 container ${isMobile ? 'py-3 px-3' : 'py-8'}`}>
        {profile && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-amber-500">{profile.category}</Badge>
                        {profile.discount && (
                          <Badge className="bg-green-500">
                            Réduction VIP: {profile.discount}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <span className="font-semibold">4.8/5</span>
                      <span className="text-gray-500">(24 avis vérifiés)</span>
                    </div>

                    <p className="text-gray-600 mt-2">{profile.shortDescription}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {profile.pricing?.basePrice && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-amber-800 font-semibold">{profile.pricing.basePrice}</p>
                    </div>
                  )}
                  <GoldButton onClick={handleBookAppointment} className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Vérifier les disponibilités
                  </GoldButton>
                  <GoldButton onClick={handleContact} variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Contacter
                  </GoldButton>
                </div>
              </div>
            </div>

            {sortedImages.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Galerie photos</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {sortedImages.map((image) => (
                      <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                          <Suspense fallback={<MediaLoadingFallback />}>
                            <OptimizedImage
                              src={image.url}
                              alt={image.alt || "Image de galerie"}
                              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                            />
                          </Suspense>
                          {image.featured && (
                            <Badge className="absolute bottom-2 left-2 bg-amber-500">
                              Photo mise en avant
                            </Badge>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">À propos</h2>
                    <p className="text-gray-600 whitespace-pre-wrap">{profile.description}</p>

                    {profile.services && profile.services.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Services proposés</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {profile.services.map((service, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600">
                              <Star className="h-4 w-4 text-amber-500" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6">Coordonnées</h2>
                    {profile.contact && (
                      <div className="space-y-4">
                        {profile.contact.address && (
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-amber-500 mt-1" />
                            <span className="text-gray-600">{profile.contact.address}</span>
                          </div>
                        )}
                        {profile.contact.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-amber-500" />
                            <span className="text-gray-600">{profile.contact.phone}</span>
                          </div>
                        )}
                        {profile.contact.email && (
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-amber-500" />
                            <span className="text-gray-600">{profile.contact.email}</span>
                          </div>
                        )}
                        {profile.contact.website && (
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-amber-500" />
                            <a 
                              href={`https://${profile.contact.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-600 hover:underline"
                            >
                              {profile.contact.website}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {profile.pricing?.packages && profile.pricing.packages.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Formules et tarifs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.pricing.packages.map((pkg) => (
                    <Card key={pkg.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                        <p className="text-2xl font-bold text-amber-600 mb-4">{pkg.price}</p>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Star className="h-4 w-4 text-amber-500 mt-1" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <PartnersFooter />

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
