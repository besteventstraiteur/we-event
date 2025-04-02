
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PartnerRequestCard from "@/components/partner/PartnerRequestCard";
import { useToast } from "@/components/ui/use-toast";

// Données fictives de demandes
const dummyRequests = [
  { 
    id: "req1", 
    clientName: "Sophie et Thomas", 
    date: "2023-06-12", 
    message: "Nous serions intéressés par vos services pour notre mariage le 15 juin 2024. Pouvez-vous nous envoyer plus d'informations sur vos prestations et tarifs ?", 
    status: "pending" as const
  },
  { 
    id: "req2", 
    clientName: "Julie et Marc", 
    date: "2023-06-10", 
    message: "Nous recherchons un prestataire pour notre événement le 10 juillet 2024. Votre profil correspond à ce que nous recherchons. Pouvons-nous échanger plus en détail ?", 
    status: "accepted" as const 
  },
  { 
    id: "req3", 
    clientName: "Émilie et Pierre", 
    date: "2023-06-08", 
    message: "Bonjour, nous avons vu votre profil et nous sommes intéressés par vos services pour notre mariage en août 2024. Êtes-vous disponible à cette période ?", 
    status: "rejected" as const 
  },
  { 
    id: "req4", 
    clientName: "Claire et Antoine", 
    date: "2023-06-05", 
    message: "Nous organisons un événement d'entreprise et nous aimerions faire appel à vos services. Pouvez-vous nous proposer un devis ?", 
    status: "pending" as const 
  },
];

const PartnerRequests = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState(dummyRequests);
  const { toast } = useToast();
  
  const handleAcceptRequest = (id: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: "accepted" as const } : req
      )
    );
    
    const request = requests.find(req => req.id === id);
    if (request) {
      toast({
        title: "Demande acceptée",
        description: `Vous avez accepté la demande de ${request.clientName}`,
      });
    }
  };
  
  const handleRejectRequest = (id: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: "rejected" as const } : req
      )
    );
    
    const request = requests.find(req => req.id === id);
    if (request) {
      toast({
        title: "Demande rejetée",
        description: `Vous avez rejeté la demande de ${request.clientName}`,
        variant: "destructive",
      });
    }
  };
  
  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || req.status === activeTab;
    return matchesSearch && matchesTab;
  });
  
  const pendingCount = requests.filter(req => req.status === "pending").length;
  const acceptedCount = requests.filter(req => req.status === "accepted").length;
  const rejectedCount = requests.filter(req => req.status === "rejected").length;
  
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Demandes des Clients</h1>
          <p className="text-gray-500">
            Gérez les demandes reçues de la part des clients
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          <Input
            type="search"
            placeholder="Rechercher dans les demandes..."
            className="pl-9 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              En attente ({pendingCount})
            </TabsTrigger>
            <TabsTrigger 
              value="accepted" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Acceptées ({acceptedCount})
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Rejetées ({rejectedCount})
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Toutes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <PartnerRequestCard
                    key={request.id}
                    id={request.id}
                    clientName={request.clientName}
                    date={new Date(request.date).toLocaleDateString('fr-FR')}
                    message={request.message}
                    status={request.status}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-md border border-gray-200">
                  <p className="text-gray-500">Aucune demande trouvée dans cette catégorie</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerRequests;
