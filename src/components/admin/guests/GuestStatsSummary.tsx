
import React from "react";
import { Users, UserCheck, UserX, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Guest } from "@/types/floorPlanTypes";

interface GuestStatsSummaryProps {
  guests: Guest[];
}

const GuestStatsSummary: React.FC<GuestStatsSummaryProps> = ({ guests }) => {
  // Calculate statistics
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.ceremonie || guest.vin || guest.repas).length;
  const pendingGuests = totalGuests - confirmedGuests;
  const mealGuests = guests.filter(guest => guest.repas).length;
  
  const totalAttendees = guests.reduce((total, guest) => {
    let count = 0;
    if (guest.ceremonie || guest.vin || guest.repas) {
      count += 1; // The guest
      if (guest.conjoint) count += 1; // Their partner
      count += guest.enfants; // Their children
    }
    return total + count;
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total invités</p>
            <h3 className="text-2xl font-bold">{totalGuests}</h3>
            <p className="text-xs text-gray-500">
              Total participants: {totalAttendees}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Confirmés</p>
            <h3 className="text-2xl font-bold">{confirmedGuests}</h3>
            <p className="text-xs text-gray-500">
              {totalGuests > 0 
                ? `${Math.round((confirmedGuests / totalGuests) * 100)}% des invités` 
                : "0% des invités"}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <UserX className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">En attente</p>
            <h3 className="text-2xl font-bold">{pendingGuests}</h3>
            <p className="text-xs text-gray-500">
              {totalGuests > 0 
                ? `${Math.round((pendingGuests / totalGuests) * 100)}% des invités` 
                : "0% des invités"}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Utensils className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Repas</p>
            <h3 className="text-2xl font-bold">{mealGuests}</h3>
            <p className="text-xs text-gray-500">
              {totalGuests > 0 
                ? `${Math.round((mealGuests / totalGuests) * 100)}% des invités` 
                : "0% des invités"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestStatsSummary;
