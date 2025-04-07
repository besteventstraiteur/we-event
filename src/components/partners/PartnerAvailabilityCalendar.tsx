
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityDate, AvailabilityStatus } from "@/models/partnerAvailability";
import { parse } from "date-fns";

interface PartnerAvailabilityCalendarProps {
  availability: AvailabilityDate[];
  partnerName: string;
}

const PartnerAvailabilityCalendar: React.FC<PartnerAvailabilityCalendarProps> = ({
  availability,
  partnerName
}) => {
  const getClassForDate = (date: Date) => {
    const found = availability.find(a => 
      a.date === date.toISOString().split('T')[0]
    );
    
    if (!found) return "";
    
    switch (found.status) {
      case AvailabilityStatus.AVAILABLE:
        return "bg-green-100 text-green-800";
      case AvailabilityStatus.BUSY:
        return "bg-orange-100 text-orange-800";
      case AvailabilityStatus.UNAVAILABLE:
        return "bg-red-100 text-red-800";
      case AvailabilityStatus.TENTATIVE:
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  // Convert the availability dates to Date objects for the calendar
  const availabilityDates = availability.map(a => parse(a.date, "yyyy-MM-dd", new Date()));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Disponibilités de {partnerName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Calendar 
            mode="single"
            selected={undefined}
            onSelect={() => {}}
            className="rounded-md bg-white"
            modifiers={{
              customStyles: availabilityDates
            }}
            modifiersClassNames={{
              customStyles: "availability-day" // Use a CSS class instead of a function
            }}
            disabled={{ before: new Date() }}
            readOnly
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 rounded-full mr-2"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
            <span className="text-sm">Provisoire</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-100 rounded-full mr-2"></div>
            <span className="text-sm">Occupé</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
            <span className="text-sm">Indisponible</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerAvailabilityCalendar;
