
import { useState } from "react";
import { AvailabilityDate, AvailabilityStatus } from "@/models/partnerAvailability";
import { format, parse, isEqual } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function usePartnerAvailability(initialData: AvailabilityDate[] = []) {
  const [availability, setAvailability] = useState<AvailabilityDate[]>(initialData);
  const { toast } = useToast();

  const updateAvailability = (date: Date, status: AvailabilityStatus, note?: string) => {
    const dateString = format(date, "yyyy-MM-dd");
    const existingIndex = availability.findIndex(
      a => isEqual(parse(a.date, "yyyy-MM-dd", new Date()), date)
    );

    if (existingIndex >= 0) {
      const newAvailability = [...availability];
      newAvailability[existingIndex] = { date: dateString, status, note };
      setAvailability(newAvailability);
    } else {
      setAvailability([...availability, { date: dateString, status, note }]);
    }

    toast({
      title: "Disponibilité mise à jour",
      description: `Votre disponibilité pour le ${format(date, "dd/MM/yyyy")} a été mise à jour.`,
    });

    // In a real app, this would save to the backend
    console.log("Saving availability:", { date: dateString, status, note });
  };

  const getDateAvailability = (date: Date): AvailabilityStatus | undefined => {
    const found = availability.find(a => 
      isEqual(parse(a.date, "yyyy-MM-dd", new Date()), date)
    );
    return found?.status;
  };

  const getAvailabilityDates = (status?: AvailabilityStatus) => {
    if (!status) return availability;
    return availability.filter(a => a.status === status);
  };

  return {
    availability,
    updateAvailability,
    getDateAvailability,
    getAvailabilityDates,
  };
}
