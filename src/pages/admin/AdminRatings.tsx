
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle, Star, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RatingModeration from "@/components/ratings/RatingModeration";
import { Rating } from "@/types/ratingTypes";

// Mock ratings data for demonstration
const mockRatings: Rating[] = [
  {
    id: "1",
    partnerId: "1",
    clientId: "client1",
    score: 5,
    comment: "Superbe domaine ! L'équipe a été très professionnelle et attentive à nos besoins. Le cadre est magnifique et nos invités ont été conquis. Je recommande vivement !",
    date: new Date("2023-09-15"),
    status: "approved",
    categories: {
      communication: 5,
      quality: 5,
      value: 4,
      professionalism: 5,
      reliability: 5,
    },
    response: "Merci beaucoup pour votre avis ! Nous sommes ravis que votre journée ait été à la hauteur de vos attentes. C'était un plaisir de vous accueillir au Château des Merveilles."
  },
  {
    id: "2",
    partnerId: "1",
    clientId: "client2",
    score: 4,
    comment: "Très bon domaine, cadre idyllique et personnel à l'écoute. Petit bémol sur le timing de la journée qui n'a pas toujours été respecté, mais cela n'a pas impacté la qualité globale de notre événement.",
    date: new Date("2023-08-22"),
    status: "pending",
    categories: {
      communication: 4,
      quality: 5,
      value: 4,
      professionalism: 4,
      reliability: 3,
    }
  },
  {
    id: "3",
    partnerId: "2",
    clientId: "client3",
    score: 5,
    comment: "Une expérience parfaite du début à la fin ! L'équipe est disponible, réactive et force de proposition. Le lieu est sublime et nos photos sont magnifiques. Merci pour tout !",
    date: new Date("2023-07-10"),
    status: "approved",
    categories: {
      communication: 5,
      quality: 5,
      value: 5,
      professionalism: 5,
      reliability: 5,
    }
  },
  {
    id: "4",
    partnerId: "3",
    clientId: "client4",
    score: 2,
    comment: "Service très décevant. Plusieurs erreurs dans la commande et attitude peu professionnelle. Je ne recommande pas.",
    date: new Date("2023-09-05"),
    status: "pending",
    categories: {
      communication: 2,
      quality: 2,
      value: 1,
      professionalism: 2,
      reliability: 3,
    }
  },
  {
    id: "5",
    partnerId: "4",
    clientId: "client5",
    score: 1,
    comment: "Prestation catastrophique. Non-respect des engagements, retards importants et communication inexistante. À éviter absolument !",
    date: new Date("2023-09-18"),
    status: "rejected",
    categories: {
      communication: 1,
      quality: 1,
      value: 1,
      professionalism: 1,
      reliability: 1,
    }
  }
];

// Map of partner IDs to names for display
const partnerNames: Record<string, string> = {
  "1": "Château des Merveilles",
  "2": "Fleurs Élégance",
  "3": "Studio Photo Elite",
  "4": "DJ Mix Master",
  "5": "Pâtisserie Royale",
};

const AdminRatings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("moderation");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPartner, setFilterPartner] = useState<string>("all");
  const [filterScore, setFilterScore] = useState<string>("all");
  const [ratings, setRatings] = useState<Rating[]>(mockRatings);

  // Filter ratings based on search and filters
  const filteredRatings = ratings.filter(rating => {
    const matchesSearch = 
      rating.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partnerNames[rating.partnerId]?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPartner = filterPartner === "all" || rating.partnerId === filterPartner;
    
    const matchesScore = filterScore === "all" || 
      (filterScore === "high" && rating.score >= 4) ||
      (filterScore === "medium" && rating.score === 3) ||
      (filterScore === "low" && rating.score <= 2);
    
    return matchesSearch && matchesPartner && matchesScore;
  });

  const handleApproveRating = async (id: string) => {
    // In a real app, this would be an API call
    setRatings(ratings.map(rating => 
      rating.id === id ? { ...rating, status: "approved" } : rating
    ));
    
    return Promise.resolve();
  };

  const handleRejectRating = async (id: string, reason: string) => {
    // In a real app, this would be an API call
    setRatings(ratings.map(rating => 
      rating.id === id ? { ...rating, status: "rejected" } : rating
    ));
    
    return Promise.resolve();
  };

  const handleViewPartnerDetails = (partnerId: string) => {
    toast({
      description: `Affichage des détails pour: ${partnerNames[partnerId] || partnerId}`
    });
    // In a real app, navigate to partner details page
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterPartner("all");
    setFilterScore("all");
  };

  // Stats for the dashboard
  const pendingCount = ratings.filter(r => r.status === "pending").length;
  const approvedCount = ratings.filter(r => r.status === "approved").length;
  const rejectedCount = ratings.filter(r => r.status === "rejected").length;
  const totalCount = ratings.length;
  
  const averageScore = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length 
    : 0;

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Avis</h1>
          <p className="text-gray-500">
            Modérez les avis clients et suivez la réputation des prestataires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-sm text-gray-500">Total des avis</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <p className="text-sm text-gray-500">En attente</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm text-gray-500">Approuvés</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold flex items-center">
                {averageScore.toFixed(1)}
                <Star className="h-5 w-5 ml-1 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-sm text-gray-500">Note moyenne</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="moderation">Modération</TabsTrigger>
            <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="moderation">
            <Card>
              <CardHeader>
                <CardTitle>Modération des avis</CardTitle>
                <CardDescription>
                  Gérez les avis soumis par les clients et validez-les pour publication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    <Input
                      placeholder="Rechercher un avis..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-1 gap-4">
                    <Select value={filterPartner} onValueChange={setFilterPartner}>
                      <SelectTrigger>
                        <SelectValue placeholder="Prestataire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les prestataires</SelectItem>
                        {Object.entries(partnerNames).map(([id, name]) => (
                          <SelectItem key={id} value={id}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterScore} onValueChange={setFilterScore}>
                      <SelectTrigger>
                        <SelectValue placeholder="Note" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les notes</SelectItem>
                        <SelectItem value="high">4-5 ★ (Élevée)</SelectItem>
                        <SelectItem value="medium">3 ★ (Moyenne)</SelectItem>
                        <SelectItem value="low">1-2 ★ (Faible)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" size="icon" onClick={clearFilters}>
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <RatingModeration
                  ratings={filteredRatings}
                  onApprove={handleApproveRating}
                  onReject={handleRejectRating}
                  onViewPartnerDetails={handleViewPartnerDetails}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques des avis</CardTitle>
                <CardDescription>
                  Analyse de la satisfaction client et des performances des prestataires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg font-medium">Fonctionnalité à venir</p>
                  <p className="text-sm mt-2">
                    Les statistiques détaillées des avis seront disponibles prochainement
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

export default AdminRatings;
