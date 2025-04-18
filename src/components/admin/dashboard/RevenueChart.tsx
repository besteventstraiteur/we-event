
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data - this would ideally come from the database
const data = [
  { month: "Jan", revenue: 400 },
  { month: "Fév", revenue: 520 },
  { month: "Mar", revenue: 700 },
  { month: "Avr", revenue: 780 },
  { month: "Mai", revenue: 890 },
  { month: "Jun", revenue: 1050 },
  { month: "Jul", revenue: 840 },
  { month: "Aou", revenue: 930 },
  { month: "Sep", revenue: 1075 },
  { month: "Oct", revenue: 1200 },
  { month: "Nov", revenue: 1320 },
  { month: "Dec", revenue: 1500 }
];

interface RevenueChartProps {
  isLoading?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader>
          <CardTitle>Revenus mensuels</CardTitle>
          <CardDescription>Abonnements partenaires</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center">
            <div className="text-center text-vip-gray-400">
              Chargement du graphique...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle>Revenus mensuels</CardTitle>
        <CardDescription>Abonnements partenaires</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#222", 
                  border: "1px solid #444",
                  color: "#fff"
                }} 
              />
              <Bar dataKey="revenue" fill="#D4AF37" name="Revenus (€)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
