
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GoldButton from "@/components/GoldButton";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ClientRequests = () => {
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simulation de demandes existantes
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Recherche d'un château pour mariage",
      description: "Nous cherchons un château pouvant accueillir 150 personnes pour notre mariage en août 2023.",
      category: "Lieu",
      budget: "15000",
      deadline: "2023-06-30",
      status: "pending",
      createdAt: "2023-01-15",
      messages: [
        { id: 1, sender: "system", content: "Votre demande a été envoyée à 3 partenaires.", date: "2023-01-15" }
      ]
    },
    {
      id: 2,
      title: "DJ pour soirée d'entreprise",
      description: "Recherche DJ expérimenté pour soirée d'entreprise de 100 personnes.",
      category: "Animation",
      budget: "1200",
      deadline: "2023-04-15",
      status: "completed",
      createdAt: "2023-01-10",
      messages: [
        { id: 1, sender: "system", content: "Votre demande a été envoyée à 2 partenaires.", date: "2023-01-10" },
        { id: 2, sender: "partner", content: "Bonjour, je suis disponible pour votre événement. Puis-je avoir plus de détails?", date: "2023-01-11" },
        { id: 3, sender: "client", content: "Bonjour, la soirée aura lieu au Palais des Congrès à partir de 19h.", date: "2023-01-12" }
      ]
    }
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewRequest(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setNewRequest(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de l'envoi d'une nouvelle demande
    setTimeout(() => {
      const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
      const request = {
        id: newId,
        ...newRequest,
        status: "pending",
        createdAt: new Date().toISOString().split('T')[0],
        messages: [
          { id: 1, sender: "system", content: "Votre demande a été envoyée aux partenaires concernés.", date: new Date().toISOString().split('T')[0] }
        ]
      };
      
      setRequests(prev => [request, ...prev]);
      setNewRequest({
        title: "",
        description: "",
        category: "",
        budget: "",
        deadline: ""
      });
      
      toast({
        title: "Demande envoyée",
        description: "Votre demande a été envoyée avec succès aux partenaires."
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-amber-500">En attente</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">En cours</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Complété</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Annulé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  // Fonction pour naviguer vers l'onglet "new"
  const navigateToNewTab = () => {
    const newTabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
    if (newTabTrigger) {
      newTabTrigger.click();
    }
  };

  return (
    <DashboardLayout type="client">
      <h1 className="text-2xl font-bold mb-6">Mes Demandes</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Mes demandes</TabsTrigger>
          <TabsTrigger value="new">Nouvelle demande</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {requests.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-vip-gray-400 mb-4">Vous n'avez pas encore de demandes</p>
              <GoldButton onClick={navigateToNewTab}>
                Créer ma première demande
              </GoldButton>
            </div>
          ) : (
            requests.map(request => (
              <Card key={request.id} className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-vip-white">{request.title}</CardTitle>
                      <CardDescription className="text-vip-gray-400">
                        Créée le {request.createdAt} • Catégorie: {request.category}
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
                            message.sender === "client" 
                              ? "bg-vip-gold/10 ml-8" 
                              : message.sender === "partner" 
                                ? "bg-vip-gray-800 mr-8" 
                                : "bg-vip-gray-800/50 text-vip-gray-400 text-sm"
                          }`}
                        >
                          <div className="flex justify-between text-xs text-vip-gray-400 mb-1">
                            <span>
                              {message.sender === "client" 
                                ? "Vous" 
                                : message.sender === "partner" 
                                  ? "Partenaire" 
                                  : "Système"}
                            </span>
                            <span>{message.date}</span>
                          </div>
                          <p>{message.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <GoldButton variant="outline" className="w-full">
                    Répondre
                  </GoldButton>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="new">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle className="text-vip-white">Nouvelle demande</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Décrivez votre besoin pour recevoir des propositions de nos partenaires VIP
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Titre de votre demande
                  </label>
                  <Input 
                    id="title"
                    placeholder="Ex: Recherche DJ pour mariage"
                    className="bg-vip-gray-800 border-vip-gray-700"
                    value={newRequest.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-vip-gray-300 mb-1">
                      Catégorie
                    </label>
                    <Select 
                      value={newRequest.category} 
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                        <SelectItem value="Lieu">Lieu</SelectItem>
                        <SelectItem value="Traiteur">Traiteur</SelectItem>
                        <SelectItem value="Animation">Animation</SelectItem>
                        <SelectItem value="Photographie">Photographie</SelectItem>
                        <SelectItem value="Décoration">Décoration</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-vip-gray-300 mb-1">
                      Budget (€)
                    </label>
                    <Input 
                      id="budget"
                      type="number"
                      placeholder="Votre budget"
                      className="bg-vip-gray-800 border-vip-gray-700"
                      value={newRequest.budget}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-vip-gray-300 mb-1">
                      Date limite
                    </label>
                    <Input 
                      id="deadline"
                      type="date"
                      className="bg-vip-gray-800 border-vip-gray-700"
                      value={newRequest.deadline}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Description détaillée
                  </label>
                  <Textarea 
                    id="description"
                    placeholder="Décrivez votre besoin en détail..."
                    className="bg-vip-gray-800 border-vip-gray-700 min-h-[150px]"
                    value={newRequest.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <GoldButton type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
                </GoldButton>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClientRequests;
