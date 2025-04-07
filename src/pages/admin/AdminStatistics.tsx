
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, CreditCard, Users, Calendar, Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Importation du composant de graphique des recommandations
import RecommendationsStats from "./admin/recommendations/RecommendationsStats";

// Données simulées pour les graphiques
import { monthlyStats, categoryStats, statusStats, topPartners } from "./admin/recommendations/mockData";

const AdminStatistics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast({
      title: "Chargement des données",
      description: `Chargement des statistiques pour ${value === "overview" ? "l'aperçu général" : value === "revenue" ? "les revenus" : value === "partners" ? "les partenaires" : "les recommandations"}`,
    });
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <p className="text-vip-gray-400">Analyse complète des performances de la plateforme</p>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Revenus
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Partenaires
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Recommandations
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <CreditCard size={18} /> Revenus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">43 250 €</p>
                  <p className="text-sm text-vip-gray-400">Total des revenus</p>
                  <p className="text-xs text-vip-gold mt-2">+12% vs trimestre précédent</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <Users size={18} /> Partenaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">48</p>
                  <p className="text-sm text-vip-gray-400">Partenaires actifs</p>
                  <p className="text-xs text-vip-gold mt-2">+5 ce trimestre</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <MessageSquare size={18} /> Recommandations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">342</p>
                  <p className="text-sm text-vip-gray-400">Total recommandations</p>
                  <p className="text-xs text-vip-gold mt-2">+24% vs trimestre précédent</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <Calendar size={18} /> Événements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">78</p>
                  <p className="text-sm text-vip-gray-400">Événements planifiés</p>
                  <p className="text-xs text-vip-gold mt-2">+8 ce trimestre</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart size={18} className="text-vip-gold" /> Revenus mensuels
                  </CardTitle>
                  <CardDescription>Évolution des revenus sur les 12 derniers mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-vip-gray-400">
                      Graphique d'évolution des revenus
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart size={18} className="text-vip-gold" /> Croissance des utilisateurs
                  </CardTitle>
                  <CardDescription>Nouveaux utilisateurs par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-vip-gray-400">
                      Graphique de croissance des utilisateurs
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Revenus */}
          <TabsContent value="revenue" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <CreditCard size={18} /> CA Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">126 850 €</p>
                  <p className="text-sm text-vip-gray-400">Chiffre d'affaires total</p>
                  <p className="text-xs text-vip-gold mt-2">Depuis le lancement</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <CreditCard size={18} /> CA Mensuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">8 430 €</p>
                  <p className="text-sm text-vip-gray-400">Mois en cours</p>
                  <p className="text-xs text-vip-gold mt-2">+1 245 € vs mois précédent</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <Star size={18} /> CA par partenaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">175 €</p>
                  <p className="text-sm text-vip-gray-400">Moyenne mensuelle</p>
                  <p className="text-xs text-vip-gold mt-2">+12% vs trimestre précédent</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <PieChart size={18} /> Prévisions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">11 200 €</p>
                  <p className="text-sm text-vip-gray-400">Prochains 30 jours</p>
                  <p className="text-xs text-vip-gold mt-2">Basé sur les tendances actuelles</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <CardTitle>Répartition des revenus</CardTitle>
                  <CardDescription>Par catégorie de partenaire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-vip-gray-400">
                      Graphique de répartition des revenus
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Partenaires */}
          <TabsContent value="partners" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <Users size={18} /> Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">48</p>
                  <p className="text-sm text-vip-gray-400">Partenaires actifs</p>
                  <p className="text-xs text-vip-gold mt-2">23 premium, 25 standard</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <Star size={18} /> Note moyenne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">4.7/5</p>
                  <p className="text-sm text-vip-gray-400">Sur 342 évaluations</p>
                  <p className="text-xs text-vip-gold mt-2">+0.2 vs trimestre précédent</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <MessageSquare size={18} /> Recommandations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">342</p>
                  <p className="text-sm text-vip-gray-400">Entre partenaires</p>
                  <p className="text-xs text-vip-gold mt-2">7.1 recommandations par partenaire</p>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-vip-gold flex items-center gap-2">
                    <Calendar size={18} /> Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-vip-white">68%</p>
                  <p className="text-sm text-vip-gray-400">Taux de conversion</p>
                  <p className="text-xs text-vip-gold mt-2">+3% vs trimestre précédent</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <CardTitle>Distribution par catégorie</CardTitle>
                  <CardDescription>Nombre de partenaires par type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-vip-gray-400">
                      Graphique de distribution des partenaires
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <CardTitle>Performance des partenaires</CardTitle>
                  <CardDescription>Top 10 des partenaires les mieux notés</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-vip-gray-400">
                      Tableau des top partenaires
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Recommandations */}
          <TabsContent value="recommendations" className="mt-0">
            <RecommendationsStats 
              monthlyStats={monthlyStats}
              categoryStats={categoryStats}
              statusStats={statusStats}
              topPartners={topPartners}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminStatistics;
