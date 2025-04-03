import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, MessageSquare, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PartnerRatingForm from "@/components/ratings/PartnerRatingForm";
import PartnerRatings from "@/components/ratings/PartnerRatings";
import RatingBadges, { predefinedRatingBadges } from "@/components/ratings/RatingBadges";
import { Rating, RatingSummary } from "@/types/ratingTypes";

// Mock data - In a real app, this would come from an API
const mockPartner = {
  id: "1",
  name: "Château des Merveilles",
  category: "Domaine",
  description: "Un domaine d'exception niché dans un parc de 5 hectares avec une vue imprenable sur la vallée. Capacité de 200 personnes assises.",
  address: "15 Route des Vignes, 33000 Bordeaux",
  contact: {
    email: "contact@chateaumerveilles.com",
    phone: "05 56 12 34 56"
  },
  discount: "15%",
  badges: [
    {
      ...predefinedRatingBadges[0], // top-rated
      dateAwarded: "2023-05-15"
    },
    {
      ...predefinedRatingBadges[1], // quick-response
      dateAwarded: "2023-03-10"
    },
    predefinedRatingBadges[2], // not awarded
    {
      ...predefinedRatingBadges[3], // reliable-partner
      dateAwarded: "2023-07-22"
    },
    predefinedRatingBadges[4], // not awarded
    {
      ...predefinedRatingBadges[5], // veteran-partner
      dateAwarded: "2023-01-05"
    },
    predefinedRatingBadges[6] // not awarded
  ]
};

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
    status: "approved",
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
    partnerId: "1",
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
  }
];

const mockRatingSummary: RatingSummary = {
  averageScore: 4.7,
  totalRatings: 3,
  distribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 2
  },
  categoryAverages: {
    communication: 4.7,
    quality: 5,
    value: 4.3,
    professionalism: 4.7,
    reliability: 4.3
  }
};

const ClientPartnerRatings = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reviews");
  const [ratings, setRatings] = useState<Rating[]>(mockRatings);
  const [ratingSummary, setRatingSummary] = useState<RatingSummary>(mockRatingSummary);
  const [hasRated, setHasRated] = useState(false);

  // In a real app, you would fetch the partner data and ratings based on the partnerId
  const partner = mockPartner;

  const handleBack = () => {
    navigate("/client/partners");
  };

  const handleSubmitRating = async (ratingData: any) => {
    // In a real app, this would be an API call
    const newRating: Rating = {
      id: `${Date.now()}`,
      partnerId: partner.id,
      clientId: "currentClientId", // This would come from auth state
      score: ratingData.score,
      comment: ratingData.comment,
      date: new Date(),
      status: "pending", // New ratings are pending until approved
      categories: ratingData.categories
    };
    
    // Add the new rating to the list
    setRatings(prev => [newRating, ...prev]);
    
    // In a real app, you would refetch the summary after adding a new rating
    // For now, we'll just leave the mock summary unchanged
    
    setHasRated(true);
    setActiveTab("reviews");
    
    return Promise.resolve();
  };

  const handleReportReview = (reviewId: string) => {
    toast({
      title: "Avis signalé",
      description: "Merci pour votre signalement. Notre équipe va l'examiner."
    });
  };

  const handleLikeReview = (reviewId: string) => {
    toast({
      description: "Merci d'avoir trouvé cet avis utile !"
    });
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{partner.name}</h1>
            <p className="text-gray-500">
              {partner.category} • {partner.address}
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="font-medium text-lg mb-2">À propos</div>
                <p className="text-gray-600">{partner.description}</p>
                
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{partner.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Téléphone:</span>
                    <span>{partner.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Réduction Club VIP:</span>
                    <span className="text-amber-600 font-bold">{partner.discount}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 md:border-l md:pl-6">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-amber-500">{ratingSummary.averageScore.toFixed(1)}</div>
                  <div className="flex justify-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= Math.round(ratingSummary.averageScore)
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-500">
                    Basé sur {ratingSummary.totalRatings} avis
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => setActiveTab("write")}
                    className="bg-amber-500 hover:bg-amber-600"
                    disabled={hasRated}
                  >
                    {hasRated ? "Avis déjà soumis" : "Écrire un avis"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Avis ({ratings.length})
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </TabsTrigger>
            {!hasRated && (
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Écrire un avis
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="reviews">
            <PartnerRatings
              ratings={ratings}
              summary={ratingSummary}
              onReportReview={handleReportReview}
              onLikeReview={handleLikeReview}
            />
          </TabsContent>
          
          <TabsContent value="badges">
            <RatingBadges badges={partner.badges} partnerId={partner.id} />
          </TabsContent>
          
          <TabsContent value="write">
            {!hasRated ? (
              <PartnerRatingForm
                partnerId={partner.id}
                partnerName={partner.name}
                onSubmit={handleSubmitRating}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Avis déjà soumis</CardTitle>
                  <CardDescription>
                    Vous avez déjà évalué ce prestataire. Merci pour votre contribution !
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientPartnerRatings;
