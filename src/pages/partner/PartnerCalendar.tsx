
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerAvailabilityCalendar from "@/components/partners/PartnerAvailabilityCalendar";

const PartnerCalendar = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Calendrier & Disponibilités</h1>
          <p className="text-gray-500">
            Gérez vos disponibilités et vos rendez-vous avec les clients
          </p>
        </div>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="availability">Disponibilités</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier complet</CardTitle>
              </CardHeader>
              <CardContent>
                <PartnerAvailabilityCalendar partnerId="partner-001" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gérer mes disponibilités</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-500">
                  Définissez vos plages de disponibilités pour que les clients puissent prendre rendez-vous.
                </p>
                <PartnerAvailabilityCalendar partnerId="partner-001" isEditable={true} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Vous n'avez pas de rendez-vous programmés pour le moment.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerCalendar;
