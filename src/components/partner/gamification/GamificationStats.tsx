
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartnerGamification } from "@/models/partnerGamification";
import { Clock, Star, Calendar, Users, MessageSquare } from "lucide-react";

interface GamificationStatsProps {
  stats: PartnerGamification["stats"];
}

const GamificationStats = ({ stats }: GamificationStatsProps) => {
  const statItems = [
    {
      label: "Taux de réponse",
      value: `${stats.responseRate}%`,
      icon: <MessageSquare size={16} className="text-blue-400" />,
    },
    {
      label: "Temps de réponse moyen",
      value: `${stats.averageResponseTime}h`,
      icon: <Clock size={16} className="text-purple-400" />,
    },
    {
      label: "Satisfaction client",
      value: `${stats.clientSatisfaction.toFixed(1)}/5`,
      icon: <Star size={16} className="text-yellow-400" />,
    },
    {
      label: "Événements réalisés",
      value: stats.completedEvents.toString(),
      icon: <Calendar size={16} className="text-green-400" />,
    },
    {
      label: "Recommandations",
      value: `${stats.recommendationsGiven}/${stats.recommendationsReceived}`,
      icon: <Users size={16} className="text-pink-400" />,
    },
  ];

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle className="text-lg">Vos statistiques</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-4 p-6">
          {statItems.map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-xs text-vip-gray-400">{item.label}</span>
              </div>
              <span className="text-xl font-bold text-vip-white">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GamificationStats;
