
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import GoldButton from "@/components/GoldButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PartnerRequests = () => {
  const { toast } = useToast();
  const [replyText, setReplyText] = useState("");
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulation de demandes clients
  const [requests, setRequests] = useState([
    {
      id: 1,
      clientName: "Emma Bernard",
      title: "Recherche d'un château pour mariage",
      description: "Nous cherchons un château pouvant accueillir 150 personnes pour notre mariage en août 2023.",
      category: "Lieu",
      budget: "15000",
      deadline: "2023-06-30",
      status: "pending",
      createdAt: "2023-01-15",
      messages: [
        { id: 1, sender: "system", content: "Nouvelle demande client", date: "2023-01-15" }
      ]
    },
    {
      id: 2,
      clientName: "Thomas Legrand",
      title: "Photographe pour baptême",
      description: "Nous recherchons un photographe pour le baptême de notre fille le 5 mars 2023. L'événement aura lieu à Paris et durera environ 3 heures (cérémonie + vin d'honneur).",
      category: "Photographie",
      budget: "800",
      deadline: "2023-02-20",
      status: "in_progress",
      createdAt: "2023-01-20",
      messages: [
        { id: 1, sender: "system", content: "Nouvelle demande client", date: "2023-01-20" },
        { id: 2, sender: "partner", content: "Bonjour, je serais disponible pour votre événement. Pouvez-vous me préciser le lieu exact et l'heure de début?", date: "2023-01-21" },
        { id: 3, sender: "client", content: "Bonjour, merci pour votre réponse. La cérémonie aura lieu à l'église Saint-Sulpice à 14h et le vin d'honneur se tiendra au restaurant Le Procope à partir de 15h30.", date: "2023-01-22" }
      ]
    },
    {
      id: 3,
      clientName: "Julie Martin",
      title: "DJ pour soirée d'entreprise",
      description: "Recherche DJ expérimenté pour soirée d'entreprise de 100 personnes.",
      category: "Animation",
      budget: "1200",
      deadline: "2023-04-15",
      status: "completed",
      createdAt: "2023-01-10",
      messages: [
        { id: 1, sender: "system", content: "Nouvelle demande client", date: "2023-01-10" },
        { id: 2, sender: "partner", content: "Bonjour, je suis disponible pour votre événement. Puis-je avoir plus de détails?", date: "2023-01-11" },
        { id: 3, sender: "client", content: "Bonjour, la soirée aura lieu au Palais des Congrès à partir de 19h.", date: "2023-01-12" },
        { id: 4, sender: "partner", content: "Parfait, je vous propose mes services pour 1100€ tout compris. Cela inclut 5h de prestation, mon matériel complet et une playlist personnalisée.", date: "2023-01-13" },
        { id: 5, sender: "client", content: "Proposition acceptée, je vous contacte par email pour finaliser les détails.", date: "2023-01-14" }
      ]
    }
  ]);

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSendReply = (requestId) => {
    if (!replyText.trim()) {
      toast({
        variant: "destructive",
        title: "Message vide",
        description: "Veuillez écrire un message avant d'envoyer."
      });
      return;
    }

    setIsLoading(true);

    // Simulation d'envoi de réponse
    setTimeout(() => {
      const updatedRequests = requests.map(request => {
        if (request.id === requestId) {
          const newMessageId = Math.max(...request.messages.map(m => m.id)) + 1;
          const newMessage = {
            id: newMessageId,
            sender: "partner",
            content: replyText,
            date: new Date().toISOString().split('T')[0]
          };
          
          // Si le statut est "pending", le passer à "in_progress"
          const newStatus = request.status === "pending" ? "in_progress" : request.status;
          
          return {
            ...request,
            status: newStatus,
            messages: [...request.messages, newMessage]
          };
        }
        return request;
      });
      
      setRequests(updatedRequests);
      setReplyText("");
      setIsLoading(false);
      
      toast({
        title: "Réponse envoyée",
        description: "Votre réponse a été envoyée au client avec succès."
      });
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-amber-500">Nouvelle</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">En discussion</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Finalisée</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Annulée</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const handleMarkAsComplete = (requestId) => {
    setIsLoading(true);
    
    // Simulation de marquer comme complété
    setTimeout(() => {
      const updatedRequests = requests.map(request => {
        if (request.id === requestId) {
          return {
            ...request,
            status: "completed"
          };
        }
        return request;
      });
      
      setRequests(updatedRequests);
      setIsLoading(false);
      
      toast({
        title: "Demande complétée",
        description: "La demande a été marquée comme finalisée."
      });
    }, 1000);
  };

  // Filtrer les demandes par statut
  const pendingRequests = requests.filter(r => r.status === "pending");
  const inProgressRequests = requests.filter(r => r.status === "in_progress");
  const completedRequests = requests.filter(r => r.status === "completed");

  return (
    <DashboardLayout type="partner">
      <h1 className="text-2xl font-bold mb-6">Demandes Clients</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Toutes ({requests.length})</TabsTrigger>
          <TabsTrigger value="pending">Nouvelles ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="in_progress">En discussion ({inProgressRequests.length})</TabsTrigger>
          <TabsTrigger value="completed">Finalisées ({completedRequests.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {requests.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucune demande client pour le moment</p>
          ) : (
            requests.map(request => renderRequestCard(request))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          {pendingRequests.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucune nouvelle demande</p>
          ) : (
            pendingRequests.map(request => renderRequestCard(request))
          )}
        </TabsContent>
        
        <TabsContent value="in_progress" className="space-y-6">
          {inProgressRequests.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucune demande en discussion</p>
          ) : (
            inProgressRequests.map(request => renderRequestCard(request))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          {completedRequests.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucune demande finalisée</p>
          ) : (
            completedRequests.map(request => renderRequestCard(request))
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );

  function renderRequestCard(request) {
    return (
      <Card key={request.id} className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-vip-white">{request.title}</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Client: {request.clientName} • Créée le {request.createdAt} • Catégorie: {request.category}
              </CardDescription>
            </div>
            {getStatusBadge(request.status)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-vip-gray-300 mb-4">{request.description}</p>
          <div className="flex gap-4 text-sm text-vip-gray-400">
            <span>Budget: {request.budget}€</span>
            <span>Échéance: {request.deadline}</span>
          </div>
          
          <div className="mt-6 border-t border-vip-gray-800 pt-4">
            <h4 className="text-vip-gold font-semibold mb-3">Messages ({request.messages.length})</h4>
            <div className="space-y-3">
              {request.messages.map(message => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg ${
                    message.sender === "partner" 
                      ? "bg-vip-gold/10 ml-8" 
                      : message.sender === "client" 
                        ? "bg-vip-gray-800 mr-8" 
                        : "bg-vip-gray-800/50 text-vip-gray-400 text-sm"
                  }`}
                >
                  <div className="flex justify-between text-xs text-vip-gray-400 mb-1">
                    <span>
                      {message.sender === "partner" 
                        ? "Vous" 
                        : message.sender === "client" 
                          ? "Client" 
                          : "Système"}
                    </span>
                    <span>{message.date}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>

            {request.status !== "completed" && (
              <div className="mt-4">
                <label htmlFor={`reply-${request.id}`} className="block text-sm font-medium text-vip-gray-300 mb-2">
                  Votre réponse
                </label>
                <Textarea
                  id={`reply-${request.id}`}
                  placeholder="Écrivez votre réponse au client..."
                  className="bg-vip-gray-800 border-vip-gray-700 h-24 mb-2"
                  value={activeRequestId === request.id ? replyText : ""}
                  onChange={handleReplyChange}
                  onFocus={() => setActiveRequestId(request.id)}
                />
                <div className="flex justify-between gap-2">
                  <GoldButton
                    onClick={() => handleSendReply(request.id)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Envoi..." : "Envoyer"}
                  </GoldButton>
                  
                  {request.status === "in_progress" && (
                    <GoldButton
                      variant="outline"
                      onClick={() => handleMarkAsComplete(request.id)}
                      disabled={isLoading}
                      className="w-full"
                    >
                      Marquer comme finalisée
                    </GoldButton>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default PartnerRequests;
