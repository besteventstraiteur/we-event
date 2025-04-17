
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Briefcase, FileText, ShoppingBag, BarChart3, Mail, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const CrmDashboard = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace de gestion de la relation client
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contacts
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Aucun contact pour l'instant
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Opportunités
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0€</div>
              <p className="text-xs text-muted-foreground">
                Aucune opportunité pour l'instant
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Devis/Factures
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0€</div>
              <p className="text-xs text-muted-foreground">
                Aucun document pour l'instant
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produits/Services
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Aucun produit pour l'instant
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Contacts
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Opportunités
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Devis/Factures
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Produits
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Rapports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contacts clients</CardTitle>
                <CardDescription>
                  Gérez votre liste de contacts clients et prospects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun contact pour l'instant</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez à ajouter des contacts pour construire votre base clients
                  </p>
                  <a href="/crm/contacts" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                    Ajouter un contact
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Opportunités commerciales</CardTitle>
                <CardDescription>
                  Gérez vos opportunités et votre pipeline commercial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune opportunité pour l'instant</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez à ajouter des opportunités pour suivre votre pipeline commercial
                  </p>
                  <a href="/crm/opportunities" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                    Ajouter une opportunité
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quotes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Devis et Factures</CardTitle>
                <CardDescription>
                  Gérez vos documents commerciaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun document pour l'instant</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez à créer des devis et factures pour vos clients
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <a href="/crm/quotes" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                      Créer un devis
                    </a>
                    <a href="/crm/invoices" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2">
                      Créer une facture
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produits et Services</CardTitle>
                <CardDescription>
                  Gérez votre catalogue de produits et services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun produit pour l'instant</h3>
                  <p className="text-muted-foreground mb-4">
                    Commencez à ajouter des produits et services à votre catalogue
                  </p>
                  <a href="/crm/products" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                    Ajouter un produit
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports</CardTitle>
                <CardDescription>
                  Consultez les rapports et statistiques de votre activité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-8 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Les rapports seront générés lorsque vous aurez des données dans votre CRM
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rappels récents</CardTitle>
              <CardDescription>
                Vos derniers rappels et notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun rappel pour l'instant</h3>
                <p className="text-muted-foreground">
                  Les rappels apparaîtront ici lorsque vous en créerez
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emails récents</CardTitle>
              <CardDescription>
                Vos derniers emails envoyés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-8 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun email pour l'instant</h3>
                <p className="text-muted-foreground">
                  Les emails envoyés apparaîtront ici
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CrmDashboard;
