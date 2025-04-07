
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePartnerAvailability } from "@/hooks/usePartnerAvailability";
import { AvailabilityStatus } from "@/models/partnerAvailability";
import { useAccessControl } from "@/hooks/useAccessControl";
import { format } from "date-fns";

const PartnerCalendar = () => {
  const { availability, updateAvailability, getDateAvailability } = usePartnerAvailability();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentStatus, setCurrentStatus] = useState<AvailabilityStatus>(AvailabilityStatus.AVAILABLE);
  const [notes, setNotes] = useState<string>("");
  const { currentUser } = useAccessControl();
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Check if date already has status
      const existingAvailability = availability.find(a => 
        a.date === format(date, "yyyy-MM-dd")
      );
      if (existingAvailability) {
        setCurrentStatus(existingAvailability.status);
        setNotes(existingAvailability.notes || "");
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

  const getClassForDate = (date: Date) => {
    const status = getDateAvailability(date);
    if (!status) return "";
    
    switch (status) {
      case AvailabilityStatus.AVAILABLE:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case AvailabilityStatus.BUSY:
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case AvailabilityStatus.UNAVAILABLE:
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case AvailabilityStatus.TENTATIVE:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "";
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
              <div className="flex justify-center">
                <Calendar 
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md bg-white"
                  modifiers={{
                    customStyles: availability.map(a => parse(a.date, "yyyy-MM-dd", new Date()))
                  }}
                  modifiersClassNames={{
                    customStyles: (date) => getClassForDate(date)
                  }}
                  disabled={{ before: new Date() }}
                />
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 rounded-full mr-2"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-100 rounded-full mr-2"></div>
                  <span>Provisoire</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-100 rounded-full mr-2"></div>
                  <span>Occupé</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-100 rounded-full mr-2"></div>
                  <span>Indisponible</span>
                </div>
              </div>
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
              {selectedDate ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Statut</label>
                    <Select 
                      value={currentStatus} 
                      onValueChange={(value) => setCurrentStatus(value as AvailabilityStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre disponibilité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={AvailabilityStatus.AVAILABLE}>Disponible</SelectItem>
                        <SelectItem value={AvailabilityStatus.TENTATIVE}>Provisoire</SelectItem>
                        <SelectItem value={AvailabilityStatus.BUSY}>Occupé</SelectItem>
                        <SelectItem value={AvailabilityStatus.UNAVAILABLE}>Indisponible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Notes (optionnel)</label>
                    <Textarea 
                      id="notes" 
                      placeholder="Ajoutez des détails supplémentaires..." 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleUpdateAvailability} className="w-full">
                    Mettre à jour
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Veuillez sélectionner une date dans le calendrier pour mettre à jour votre disponibilité.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Vos disponibilités à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availability
                .filter(a => parse(a.date, "yyyy-MM-dd", new Date()) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 10)
                .map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg flex justify-between items-center ${
                      item.status === AvailabilityStatus.AVAILABLE ? "bg-green-50" : 
                      item.status === AvailabilityStatus.TENTATIVE ? "bg-blue-50" : 
                      item.status === AvailabilityStatus.BUSY ? "bg-orange-50" : "bg-red-50"
                    }`}
                  >
                    <div>
                      <h3 className="font-medium">
                        {format(parse(item.date, "yyyy-MM-dd", new Date()), "dd MMMM yyyy")}
                      </h3>
                      {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
                    </div>
                    <span className={`text-sm font-medium rounded-full px-2 py-1 ${
                      item.status === AvailabilityStatus.AVAILABLE ? "bg-green-100 text-green-800" : 
                      item.status === AvailabilityStatus.TENTATIVE ? "bg-blue-100 text-blue-800" : 
                      item.status === AvailabilityStatus.BUSY ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"
                    }`}>
                      {item.status === AvailabilityStatus.AVAILABLE ? "Disponible" : 
                       item.status === AvailabilityStatus.TENTATIVE ? "Provisoire" : 
                       item.status === AvailabilityStatus.BUSY ? "Occupé" : "Indisponible"}
                    </span>
                  </div>
                ))}
              
              {availability.filter(a => parse(a.date, "yyyy-MM-dd", new Date()) >= new Date()).length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Aucune disponibilité n'a été définie pour les dates à venir.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerCalendar;
