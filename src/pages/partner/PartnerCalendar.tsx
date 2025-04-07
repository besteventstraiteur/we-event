
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePartnerAvailability } from "@/hooks/usePartnerAvailability";
import { AvailabilityStatus } from "@/models/partnerAvailability";
import { format } from "date-fns";
import AvailabilityCalendar from "@/components/calendar/AvailabilityCalendar";
import AvailabilityEditor from "@/components/calendar/AvailabilityEditor";
import UpcomingAvailability from "@/components/calendar/UpcomingAvailability";

const PartnerCalendar = () => {
  const { availability, updateAvailability, getDateAvailability } = usePartnerAvailability();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<AvailabilityStatus>(AvailabilityStatus.AVAILABLE);
  const [notes, setNotes] = useState<string>("");
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Check if date already has status
      const dateStr = format(date, "yyyy-MM-dd");
      const existingAvailability = availability.find(a => a.date === dateStr);
      
      if (existingAvailability) {
        setCurrentStatus(existingAvailability.status);
        setNotes(existingAvailability.note || "");
      } else {
        setCurrentStatus(AvailabilityStatus.AVAILABLE);
        setNotes("");
      }
    }
  };

  const handleUpdateAvailability = () => {
    if (selectedDate) {
      updateAvailability(selectedDate, currentStatus, notes);
      setSelectedDate(undefined);
    }
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion de votre calendrier</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <AvailabilityCalendar
                availability={availability}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                getDateAvailability={getDateAvailability}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Mise à jour - ${format(selectedDate, "dd/MM/yyyy")}`
                  : "Sélectionner une date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AvailabilityEditor
                selectedDate={selectedDate}
                currentStatus={currentStatus}
                notes={notes}
                setCurrentStatus={setCurrentStatus}
                setNotes={setNotes}
                handleUpdateAvailability={handleUpdateAvailability}
              />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Vos disponibilités à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingAvailability availability={availability} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerCalendar;
