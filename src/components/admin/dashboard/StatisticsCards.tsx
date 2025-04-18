
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, CreditCard, BarChart } from "lucide-react";

interface StatsProps {
  stats: {
    totalPartners: number;
    pendingPartners: number;
    totalClients: number;
    newClientsThisMonth: number;
    revenue: number;
    revenueThisMonth: number;
    interactions: number;
    interactionsGrowth: number;
  };
}

const StatisticsCards: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <Users size={18} /> Partenaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{stats.totalPartners}</p>
          <p className="text-sm text-vip-gray-400">Partenaires actifs</p>
          <p className="text-xs text-vip-gold mt-2">+{stats.pendingPartners} en attente de validation</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <User size={18} /> Clients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{stats.totalClients}</p>
          <p className="text-sm text-vip-gray-400">Clients VIP inscrits</p>
          <p className="text-xs text-vip-gold mt-2">+{stats.newClientsThisMonth} ce mois-ci</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <CreditCard size={18} /> Revenus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{stats.revenue} €</p>
          <p className="text-sm text-vip-gray-400">Revenus partenaires</p>
          <p className="text-xs text-vip-gold mt-2">+{stats.revenueThisMonth} € ce mois-ci</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <BarChart size={18} /> Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{stats.interactions}</p>
          <p className="text-sm text-vip-gray-400">Demandes ce mois</p>
          <p className="text-xs text-vip-gold mt-2">+{stats.interactionsGrowth}% vs mois précédent</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
