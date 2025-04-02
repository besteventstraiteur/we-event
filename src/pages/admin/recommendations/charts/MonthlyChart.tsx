
import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { MonthlyStat } from "../types";

interface MonthlyChartProps {
  data: MonthlyStat[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recommandations par mois</CardTitle>
          <Calendar size={18} className="text-vip-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="recommendations" name="Nombre" fill="#FDC547" />
              <Bar dataKey="acceptedRate" name="Taux d'acceptation (%)" fill="#4ADE80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyChart;
