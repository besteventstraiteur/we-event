
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Check, MapPin, MenuSquare, User, Gift, Heart } from "lucide-react";
import Logo from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuestBook from "@/components/guests/GuestBook";
import GiftFund from "@/components/guests/GiftFund";

const GuestDashboard = () => {
  const { eventId, guestId } = useParams();
  const [attending, setAttending] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  // Mock data - in a real app, this would be fetched from an API
  const eventDetails = {
    title: "Mariage de Sophie & Thomas",
    date: "15 juin 2024",
    location: "Château de Versailles, Versailles",
    description: "Nous sommes heureux de vous convier à notre mariage. Merci de confirmer votre présence et de choisir votre menu.",
    menuSelection: true,
    menuDeadline: "01 juin 2024"
  };

  const handleAttendance = (value: boolean) => {
    setAttending(value);
    // In a real app, we would post this to an API
    console.log(`Guest ${guestId} will ${value ? 'attend' : 'not attend'} event ${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="medium" />
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">Invité</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6 max-w-4xl">
        <Card className="mb-6 border-amber-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-2">
            <CardTitle className="text-center text-vip-gold text-xl md:text-2xl">
              {eventDetails.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="info" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Informations
                </TabsTrigger>
                <TabsTrigger value="guestbook" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> Livre d'or
                </TabsTrigger>
                <TabsTrigger value="giftfund" className="flex items-center gap-1">
                  <Gift className="h-4 w-4" /> Cagnotte
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="pt-4">
                <p className="text-center text-gray-700 mb-4">
                  {eventDetails.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-vip-gold" />
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{eventDetails.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-vip-gold" />
                    <div>
                      <div className="text-sm text-gray-500">Lieu</div>
                      <div className="font-medium">{eventDetails.location}</div>
                    </div>
                  </div>
                </div>

                {attending === null ? (
                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-vip-gold mb-2">Confirmer votre présence</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Merci de nous indiquer si vous serez présent à cet événement.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => handleAttendance(true)}
                        className="bg-vip-gold hover:bg-vip-gold/90 text-white"
                      >
                        Je serai présent
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleAttendance(false)}
                        className="border-vip-gold text-vip-gold hover:bg-vip-gold/10"
                      >
                        Je ne pourrai pas venir
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
                    <div className="flex items-center gap-2">
                      {attending ? (
                        <Badge variant="success">Présent(e)</Badge>
                      ) : (
                        <Badge variant="destructive">Absent(e)</Badge>
                      )}
                      <p className="text-sm text-gray-600">
                        {attending 
                          ? "Vous avez confirmé votre présence à cet événement." 
                          : "Vous avez indiqué que vous ne pourrez pas assister à cet événement."}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setAttending(null)}
                        className="ml-auto text-xs"
                      >
                        Modifier
                      </Button>
                    </div>
                  </div>
                )}

                {attending && eventDetails.menuSelection && (
                  <>
                    <Separator className="my-4" />
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <MenuSquare className="h-5 w-5 text-vip-gold" />
                          <h3 className="font-medium">Choix de menu</h3>
                        </div>
                        <Badge variant="outline" className="text-gray-600">
                          Date limite : {eventDetails.menuDeadline}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Veuillez sélectionner votre menu pour cet événement
                      </p>
                      <Link to={`/guest/menu/${eventId || "event"}/${guestId || "guest"}`}>
                        <Button className="w-full bg-vip-gold hover:bg-vip-gold/90 text-white">
                          Choisir mon menu
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="guestbook" className="pt-4">
                <GuestBook />
              </TabsContent>
              
              <TabsContent value="giftfund" className="pt-4">
                <GiftFund />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Si vous avez des questions, n'hésitez pas à contacter les organisateurs</p>
        </div>
      </main>
    </div>
  );
};

export default GuestDashboard;
