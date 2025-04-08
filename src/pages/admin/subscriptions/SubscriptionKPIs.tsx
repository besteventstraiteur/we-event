
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CreditCard, Users, TrendingUp, Percent } from "lucide-react";
import { mockSubscriptions } from "@/models/subscription";

const SubscriptionKPIs = () => {
  // Calculer les KPIs à partir des données fictives
  const totalRevenue = mockSubscriptions
    .filter(sub => sub.active)
    .reduce((sum, sub) => sum + sub.price, 0);
  
  const activeSubscriptions = mockSubscriptions.filter(sub => sub.active).length;
  const premiumSubscriptions = mockSubscriptions.filter(
    sub => sub.active && sub.tier === "premium"
  ).length;
  
  const renewalRate = Math.round(
    (mockSubscriptions.filter(sub => sub.autoRenew).length / mockSubscriptions.length) * 100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <CreditCard size={18} /> Revenus mensuels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{totalRevenue.toFixed(2)} €</p>
          <p className="text-sm text-vip-gray-400">Abonnements actifs</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <Users size={18} /> Abonnements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{activeSubscriptions}</p>
          <p className="text-sm text-vip-gray-400">Abonnements actifs</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <TrendingUp size={18} /> Premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{premiumSubscriptions}</p>
          <p className="text-sm text-vip-gray-400">Abonnements premium</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-vip-gold flex items-center gap-2">
            <Percent size={18} /> Taux de renouvellement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-vip-white">{renewalRate}%</p>
          <p className="text-sm text-vip-gray-400">Auto-renouvellement</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionKPIs;
