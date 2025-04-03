
import React, { useState } from "react";
import { WeddingPackage, PackageService } from "@/models/weddingPackage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Music, Utensils, Paintbrush, Video, Car, MapPin, ShoppingCart, Check, Info, Plus } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { useCart } from "@/contexts/CartContext";

interface PackageDetailProps {
  package: WeddingPackage;
}

const PackageDetail: React.FC<PackageDetailProps> = ({ package: pkg }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    pkg.services.filter(s => s.included).map(s => s.id)
  );
  
  const { addPackageToCart, addServiceToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };
  
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'photography': return <Camera size={20} />;
      case 'videography': return <Video size={20} />;
      case 'dj': return <Music size={20} />;
      case 'catering': return <Utensils size={20} />;
      case 'decoration': return <Paintbrush size={20} />;
      case 'venue': return <MapPin size={20} />;
      case 'car': return <Car size={20} />;
      default: return null;
    }
  };
  
  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };
  
  // Calculer le prix total en fonction des services sélectionnés
  const calculateTotal = () => {
    const servicesTotal = pkg.services
      .filter(service => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
    
    // Appliquer la réduction seulement si le prix total est égal ou supérieur au prix original du pack
    if (servicesTotal >= pkg.originalPrice) {
      return servicesTotal - (servicesTotal * (pkg.discount / 100));
    }
    
    return servicesTotal;
  };
  
  const totalPrice = calculateTotal();

  const handleAddCustomPackage = () => {
    // Create a custom package with selected services
    const customPkg = {
      ...pkg,
      services: pkg.services.filter(service => selectedServices.includes(service.id)),
      totalPrice: totalPrice,
    };
    addPackageToCart(customPkg);
  };

  return (
    <div className="space-y-6 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="services">
            <TabsList>
              <TabsTrigger value="services">Services inclus</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Avis clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.services.map((service) => (
                    <div 
                      key={service.id} 
                      className={`p-4 rounded-lg border flex items-start gap-4 ${
                        selectedServices.includes(service.id)
                          ? 'border-vip-gold bg-vip-black/20'
                          : 'border-vip-gray-800 bg-vip-gray-900'
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        {getServiceIcon(service.type)}
                      </div>
                      <div className="flex-grow space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{service.vendorName}</h4>
                            <p className="text-sm text-vip-gray-400">{service.description}</p>
                          </div>
                          <div className="text-vip-gold font-bold">
                            {formatPrice(service.price)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {service.canBeRemoved && (
                            <div className="flex items-center">
                              <Checkbox 
                                id={`service-${service.id}`}
                                checked={selectedServices.includes(service.id)}
                                onCheckedChange={(checked) => 
                                  handleServiceToggle(service.id, checked as boolean)
                                }
                                disabled={service.included && !service.canBeRemoved}
                              />
                              <Label 
                                htmlFor={`service-${service.id}`}
                                className="ml-2 cursor-pointer"
                              >
                                Inclure dans mon pack
                              </Label>
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-vip-gray-700 text-vip-gray-400 hover:bg-vip-gray-800"
                            onClick={() => addServiceToCart(service, pkg.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Ajouter
                          </Button>
                        </div>
                        {service.included && !service.canBeRemoved && (
                          <div className="flex items-center text-sm text-vip-gray-400">
                            <Info size={14} className="mr-1" />
                            <span>Ce service est obligatoire dans ce pack</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="description" className="pt-4">
              <div className="space-y-4">
                <p>{pkg.description}</p>
                <p>
                  Ce pack vous offre un ensemble complet de services pour rendre votre mariage inoubliable.
                  Tous nos prestataires sont sélectionnés pour leur professionnalisme et la qualité de leurs services.
                </p>
                <p>
                  En choisissant ce pack, vous bénéficiez d'une coordination simplifiée et d'un suivi personnalisé
                  pour tous les prestataires inclus.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                <p className="text-vip-gray-400">
                  Ce pack a une note moyenne de {pkg.rating.toFixed(1)}/5 basée sur {pkg.reviewCount} avis.
                </p>
                <p>
                  Les avis détaillés seront disponibles prochainement.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <div className="bg-vip-gray-800/50 p-4 rounded-lg space-y-4">
            <h3 className="font-bold text-lg">Récapitulatif de votre pack</h3>
            
            <div className="space-y-2">
              {selectedServices.length === 0 ? (
                <p className="text-vip-gray-400">Aucun service sélectionné</p>
              ) : (
                pkg.services
                  .filter(service => selectedServices.includes(service.id))
                  .map(service => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span>{service.vendorName}</span>
                      </div>
                      <span>{formatPrice(service.price)}</span>
                    </div>
                  ))
              )}
            </div>
            
            <div className="border-t border-vip-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-vip-gray-400">
                <span>Sous-total</span>
                <span>{formatPrice(pkg.services
                  .filter(service => selectedServices.includes(service.id))
                  .reduce((sum, service) => sum + service.price, 0))}
                </span>
              </div>
              
              {totalPrice < pkg.services
                .filter(service => selectedServices.includes(service.id))
                .reduce((sum, service) => sum + service.price, 0) && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Réduction pack</span>
                  <span>-{pkg.discount}%</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span className="text-vip-gold">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <GoldButton className="w-full" onClick={handleAddCustomPackage}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Ajouter ce pack au panier
            </GoldButton>
            
            <p className="text-sm text-vip-gray-400 text-center">
              Paiement sécurisé et facilité pour l'ensemble des prestataires
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
