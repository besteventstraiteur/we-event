
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MonthlyStat } from "../mockData";

interface MonthlyChartProps {
  data: MonthlyStat[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle className="text-vip-white">Évolution mensuelle</CardTitle>
        <CardDescription>Nombre de recommandations par mois</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#444' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="total" name="Total" fill="#d4af37" />
              <Bar dataKey="accepted" name="Acceptées" fill="#4ade80" />
              <Bar dataKey="rejected" name="Refusées" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyChart;
