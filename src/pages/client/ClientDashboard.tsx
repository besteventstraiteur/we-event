
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardStats from "@/components/client-dashboard/DashboardStats";
import EventCountdown from "@/components/client/EventCountdown";
import PreparationChecklist from "@/components/client-dashboard/PreparationChecklist";
import VendorChecklist from "@/components/client/VendorChecklist";
import FeatureManager from "@/components/client/FeatureManager";
import EventDateEditor from "@/components/client/EventDateEditor";
import RecentPodcasts from "@/components/client-dashboard/RecentPodcasts";
import RecommendedPartners from "@/components/client-dashboard/RecommendedPartners";

const ClientDashboard = () => {
  const [eventDate, setEventDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date;
  });
  
  const handleDateChange = (newDate: Date) => {
    setEventDate(newDate);
  };
  
  return (
    <DashboardLayout type="client">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold truncate">Bienvenue, Client VIP</h1>
          <p className="text-muted-foreground">Voici vos informations et vos avantages exclusifs</p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <EventCountdown 
              eventDate={eventDate} 
              eventName="Mon Mariage"
              eventLocation="Domaine des Roses, Paris"
            />
            <PreparationChecklist />
            <VendorChecklist />
          </div>

          <div className="space-y-6">
            <FeatureManager />
            <EventDateEditor 
              currentDate={eventDate}
              onDateChange={handleDateChange}
              eventName="Mon Mariage" 
            />
            <RecentPodcasts />
            <RecommendedPartners />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
