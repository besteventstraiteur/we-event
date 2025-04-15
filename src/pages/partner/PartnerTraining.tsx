
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Video, Play, Users } from "lucide-react";

const PartnerTraining = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Centre de Formation</h1>
          <p className="text-gray-500">
            Participez à nos sessions de formation et réunions mensuelles
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Sessions à venir</TabsTrigger>
            <TabsTrigger value="replay">Replays</TabsTrigger>
            <TabsTrigger value="monthly">Réunions mensuelles</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Formation Marketing Digital</CardTitle>
                  <CardDescription>Session en présentiel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>12 places disponibles</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span>25 Avril 2025</span>
                  </div>
                  <Button className="w-full">S'inscrire</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimisation des ventes</CardTitle>
                  <CardDescription>Session en visioconférence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Video className="h-4 w-4" />
                    <span>Illimité</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span>30 Avril 2025</span>
                  </div>
                  <Button className="w-full">S'inscrire</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="replay" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Best Practices 2025</CardTitle>
                  <CardDescription>Replay disponible</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Play className="h-4 w-4" />
                    <span>1h20min</span>
                  </div>
                  <Button className="w-full">Regarder</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Réunions Mensuelles</CardTitle>
                <CardDescription>
                  Inscrivez-vous aux prochaines réunions mensuelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button className="w-[280px]" disabled={!date}>
                    Confirmer l'inscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerTraining;
