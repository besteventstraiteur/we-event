
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BADGES, BadgeType, LOYALTY_TIERS, LoyaltyTier } from "@/models/partnerGamification";
import { Search, Filter, Award, PlusCircle, Trophy, Star, BadgeCheck, Crown, ArrowUpDown } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PartnerWithPoints {
  id: string;
  name: string;
  category: string;
  points: number;
  tier: LoyaltyTier;
  badgeCount: number;
  joinDate: string;
}

// Mock data for partner points
const mockPartnersWithPoints: PartnerWithPoints[] = [
  { id: "1", name: "Domaine du Château", category: "Domaine", points: 6500, tier: "gold", badgeCount: 8, joinDate: "15/04/2023" },
  { id: "2", name: "Fleurs Élégance", category: "Fleuriste", points: 1200, tier: "silver", badgeCount: 3, joinDate: "03/02/2023" },
  { id: "3", name: "Studio Photo Elite", category: "Photographe", points: 8200, tier: "gold", badgeCount: 6, joinDate: "21/05/2023" },
  { id: "4", name: "DJ Mix Master", category: "DJ", points: 18500, tier: "platinum", badgeCount: 12, joinDate: "10/01/2023" },
  { id: "5", name: "Pâtisserie Royale", category: "Traiteur", points: 3500, tier: "silver", badgeCount: 4, joinDate: "08/03/2023" },
  { id: "6", name: "Harmony Musique", category: "DJ", points: 750, tier: "bronze", badgeCount: 2, joinDate: "20/06/2023" },
  { id: "7", name: "Décor de Rêve", category: "Décorateur", points: 2100, tier: "silver", badgeCount: 5, joinDate: "22/06/2023" },
];

const AdminPartnerGamification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filterPartners = (partners: PartnerWithPoints[]) => {
    if (!searchTerm) return partners;
    return partners.filter(partner => 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      partner.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTierBadge = (tier: LoyaltyTier) => {
    switch (tier) {
      case 'platinum':
        return <Badge className="bg-[#E5E4E2] text-gray-800">Platine</Badge>;
      case 'gold':
        return <Badge className="bg-[#FFD700] text-gray-800">Or</Badge>;
      case 'silver':
        return <Badge className="bg-[#C0C0C0] text-gray-800">Argent</Badge>;
      default:
        return <Badge className="bg-[#CD7F32] text-gray-800">Bronze</Badge>;
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Programme de Fidélité Partenaires</h1>
          <p className="text-vip-gray-400">Gérez le système de points, badges et niveaux des prestataires</p>
        </div>

        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="partners" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Classement des prestataires
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Badges et récompenses
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Paramètres du programme
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="partners" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Classement des prestataires</CardTitle>
                <CardDescription>Liste des prestataires par points et niveau de fidélité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
                    <Input
                      type="search"
                      placeholder="Rechercher un prestataire..."
                      className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px] bg-vip-gray-900 border-vip-gray-800">
                        <SelectValue placeholder="Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les niveaux</SelectItem>
                        <SelectItem value="platinum">Platine</SelectItem>
                        <SelectItem value="gold">Or</SelectItem>
                        <SelectItem value="silver">Argent</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-2 border-vip-gray-800 text-vip-gray-400 hover:text-vip-white">
                      <Filter size={16} /> Filtrer
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-vip-gray-800 hover:bg-transparent">
                        <TableHead className="text-vip-gray-400">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                            Prestataire <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead className="text-vip-gray-400">Catégorie</TableHead>
                        <TableHead className="text-vip-gray-400">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                            Points <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead className="text-vip-gray-400">Niveau</TableHead>
                        <TableHead className="text-vip-gray-400">Badges</TableHead>
                        <TableHead className="text-vip-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterPartners(mockPartnersWithPoints).map((partner) => (
                        <TableRow key={partner.id} className="border-b-vip-gray-800">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white">
                                {partner.name.charAt(0)}
                              </div>
                              <span className="font-medium text-vip-white">{partner.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-vip-gray-400">{partner.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-vip-gold font-medium">
                              <Trophy size={14} /> {partner.points}
                            </div>
                          </TableCell>
                          <TableCell>{getTierBadge(partner.tier)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Award size={14} className="text-vip-gray-400" /> 
                              <span>{partner.badgeCount}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                                Détails
                              </Button>
                              <GoldButton size="sm" className="h-8 gap-1">
                                <PlusCircle size={14} /> Ajouter des points
                              </GoldButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filterPartners(mockPartnersWithPoints).length === 0 && (
                    <p className="text-center py-8 text-vip-gray-400">Aucun résultat trouvé</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="badges" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Badges et récompenses</CardTitle>
                <CardDescription>Gérez les badges et les récompenses du programme de fidélité</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-6">
                  <GoldButton className="gap-2">
                    <PlusCircle size={16} /> Créer un nouveau badge
                  </GoldButton>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Object.entries(BADGES).map(([key, badge]) => {
                    // Get the icon component
                    const IconComponent = 
                      key === 'speed' ? Award :
                      key === 'quality' ? Star :
                      key === 'verified' ? BadgeCheck : 
                      key === 'featured' ? Crown : Trophy;
                    
                    return (
                      <Card key={key} className="bg-vip-gray-800 border-vip-gray-700">
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vip-gold to-yellow-600 flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-vip-black" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-vip-white font-medium">{badge.name}</h3>
                              <p className="text-sm text-vip-gray-400">{badge.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <Badge variant="outline" className="border-vip-gold text-vip-gold">
                                  +{badge.points} points
                                </Badge>
                                <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                                  Modifier
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Paramètres du programme</CardTitle>
                <CardDescription>Configurez les paramètres du programme de fidélité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-vip-white mb-4">Niveaux de fidélité</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(LOYALTY_TIERS).map(([key, tier]) => (
                      <Card key={key} className="bg-vip-gray-800 border-vip-gray-700">
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: tier.color }}>
                              <Trophy className="h-6 w-6 text-vip-black" />
                            </div>
                            <h3 className="mt-2 text-vip-white font-medium">{tier.name}</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-vip-gray-400">Points requis:</span>
                              <span className="text-vip-white">{tier.minPoints}+</span>
                            </div>
                            <div className="text-xs text-vip-gray-400 mt-2">
                              <span className="text-vip-white text-sm">Avantages:</span>
                              <ul className="mt-1 space-y-1">
                                {tier.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-xs mt-0.5">•</span> {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="w-full mt-4 text-vip-gray-400 hover:text-vip-white">
                            Modifier
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-vip-white mb-4">Points par action</h3>
                  <Card className="bg-vip-gray-800 border-vip-gray-700">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-vip-gray-400">Réponse à une demande</label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              defaultValue="10" 
                              className="bg-vip-gray-900 border-vip-gray-700 text-vip-white" 
                            />
                            <span className="text-vip-gray-400">pts</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-vip-gray-400">Réponse rapide (&lt; 2h)</label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              defaultValue="15" 
                              className="bg-vip-gray-900 border-vip-gray-700 text-vip-white" 
                            />
                            <span className="text-vip-gray-400">pts</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-vip-gray-400">Événement complété</label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              defaultValue="200" 
                              className="bg-vip-gray-900 border-vip-gray-700 text-vip-white" 
                            />
                            <span className="text-vip-gray-400">pts</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-vip-gray-400">Avis positif reçu</label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              defaultValue="50" 
                              className="bg-vip-gray-900 border-vip-gray-700 text-vip-white" 
                            />
                            <span className="text-vip-gray-400">pts</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-vip-gray-400">Recommandation</label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              defaultValue="20" 
                              className="bg-vip-gray-900 border-vip-gray-700 text-vip-white" 
                            />
                            <span className="text-vip-gray-400">pts</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-vip-gray-400">Récurrence (mensuel)</label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              defaultValue="50" 
                              className="bg-vip-gray-900 border-vip-gray-700 text-vip-white" 
                            />
                            <span className="text-vip-gray-400">pts</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-6">
                        <GoldButton>Sauvegarder les changements</GoldButton>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminPartnerGamification;
