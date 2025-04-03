
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/utils/accessControl";

// Fake menu data
const MENUS = [
  {
    id: "menu1",
    clientId: "client1",
    clientName: "Sophie & Thomas",
    eventDate: "2025-06-18",
    status: "pending",
    guestCount: 85,
    menuType: "Gastronomique",
    updatedAt: "2025-03-15T14:30:00Z"
  },
  {
    id: "menu2",
    clientId: "client2",
    clientName: "Marie & Jean",
    eventDate: "2025-07-12",
    status: "approved",
    guestCount: 120,
    menuType: "Buffet",
    updatedAt: "2025-03-10T09:15:00Z"
  },
  {
    id: "menu3",
    clientId: "client3",
    clientName: "Camille & Lucas",
    eventDate: "2025-08-05",
    status: "modified",
    guestCount: 65,
    menuType: "Cocktail",
    updatedAt: "2025-03-18T16:45:00Z"
  }
];

const PartnerMenus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const filteredMenus = MENUS.filter(menu => {
    // Filter by search query
    const matchesSearch = 
      menu.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      menu.menuType.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by tab
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "pending" && menu.status === "pending") ||
      (activeTab === "approved" && menu.status === "approved") ||
      (activeTab === "modified" && menu.status === "modified");
      
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="flex items-center gap-1"><Clock size={12} /> En attente</Badge>;
      case "approved":
        return <Badge className="bg-green-600 flex items-center gap-1"><CheckCircle2 size={12} /> Approuvé</Badge>;
      case "modified":
        return <Badge variant="secondary" className="flex items-center gap-1"><AlertCircle size={12} /> Modifié</Badge>;
      default:
        return null;
    }
  };

  const handleMenuAction = (menuId: string, action: string) => {
    toast({
      title: "Action effectuée",
      description: `Action "${action}" sur le menu ${menuId}`
    });
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Menus Clients</h1>
          <Button className="bg-vip-gold hover:bg-amber-600 text-white">
            <PlusCircle size={16} className="mr-2" />
            Nouveau Menu
          </Button>
        </div>
        <p className="text-gray-600">
          Gérez les menus validés par vos clients et mettez-les à jour selon les besoins de l'événement.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un menu..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="approved">Approuvés</TabsTrigger>
            <TabsTrigger value="modified">Modifiés</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredMenus.length > 0 ? (
                filteredMenus.map((menu) => (
                  <Card key={menu.id} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{menu.clientName}</CardTitle>
                        {getStatusBadge(menu.status)}
                      </div>
                      <CardDescription>
                        {new Date(menu.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm mb-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Type de menu:</span>
                          <span className="font-medium">{menu.menuType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Nombre d'invités:</span>
                          <span className="font-medium">{menu.guestCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Dernière mise à jour:</span>
                          <span className="font-medium">{new Date(menu.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleMenuAction(menu.id, "voir")}
                        >
                          Voir détails
                        </Button>
                        <Button 
                          className="flex-1 bg-vip-gold hover:bg-amber-600 text-white"
                          onClick={() => handleMenuAction(menu.id, "modifier")}
                        >
                          Modifier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full">
                  <Card className="text-center p-6">
                    <p className="mb-4 text-gray-500">Aucun menu trouvé</p>
                    <Button>Créer un nouveau menu</Button>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Wrap the component with the PartnerTypeRoute to restrict access
const ProtectedPartnerMenus = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.CATERER, PartnerType.GENERAL]}>
    <PartnerMenus />
  </PartnerTypeRoute>
);

export default ProtectedPartnerMenus;
