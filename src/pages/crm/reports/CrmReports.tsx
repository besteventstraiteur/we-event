
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, PieChart, TrendingUp, CalendarRange, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const CrmReports = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Rapports et analyses</h1>
          <p className="text-muted-foreground">
            Consultez les performances de votre activité
          </p>
        </div>
        
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Ventes
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Clients
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Produits
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4" /> Mensuel
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des ventes</CardTitle>
                <CardDescription>
                  Performance de vos ventes sur la période
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Les graphiques s'afficheront ici lorsque vous aurez des données de vente
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Autres onglets de rapports avec contenu similaire */}
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse clients</CardTitle>
                <CardDescription>
                  Répartition et activité de votre base clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Les analyses clients s'afficheront ici lorsque vous aurez des données
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performances produits</CardTitle>
                <CardDescription>
                  Analyse des ventes par produit et service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Les analyses produits s'afficheront ici lorsque vous aurez des données de vente
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports mensuels</CardTitle>
                <CardDescription>
                  Performance mensuelle de votre activité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <CalendarRange className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Les rapports mensuels s'afficheront ici lorsque vous aurez des données
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CrmReports;
