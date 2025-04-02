
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CalendarIcon } from "lucide-react";

interface EventCountdownProps {
  eventDate: Date;
  eventName: string;
  eventLocation?: string;
}

const EventCountdown: React.FC<EventCountdownProps> = ({ 
  eventDate, 
  eventName,
  eventLocation 
}) => {
  const calculateTimeLeft = () => {
    const difference = eventDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  };

  const timeLeft = calculateTimeLeft();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{eventName}</CardTitle>
            <CardDescription>{eventLocation}</CardDescription>
          </div>
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-3">
          <CalendarClock className="h-4.5 w-4.5 text-muted-foreground mr-2" />
          <span className="text-sm text-muted-foreground">{formatDate(eventDate)}</span>
        </div>
        
        {timeLeft.isPast ? (
          <div className="text-center py-2">
            <p className="font-semibold text-lg">Événement terminé</p>
            <p className="text-sm text-muted-foreground">Nous espérons que vous avez passé un moment inoubliable !</p>
          </div>
        ) : (
          <div>
            <p className="text-sm mb-3 text-muted-foreground">Temps restant avant votre événement :</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-gray-50 rounded-md p-2">
                <div className="text-xl font-bold">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">Jours</div>
              </div>
              <div className="bg-gray-50 rounded-md p-2">
                <div className="text-xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs text-muted-foreground">Heures</div>
              </div>
              <div className="bg-gray-50 rounded-md p-2">
                <div className="text-xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs text-muted-foreground">Minutes</div>
              </div>
              <div className="bg-gray-50 rounded-md p-2">
                <div className="text-xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs text-muted-foreground">Secondes</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCountdown;
