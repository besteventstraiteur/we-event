
import React from "react";
import { MonthlyStat, CategoryStat, StatusStat, TopPartner } from "./mockData";
import MonthlyChart from "./charts/MonthlyChart";
import StatusChart from "./charts/StatusChart";
import CategoryChart from "./charts/CategoryChart";
import TopPartnersTable from "./TopPartnersTable";

interface RecommendationsStatsProps {
  monthlyStats: MonthlyStat[];
  categoryStats: CategoryStat[];
  statusStats: StatusStat[];
  topPartners: TopPartner[];
}

const RecommendationsStats: React.FC<RecommendationsStatsProps> = ({ 
  monthlyStats,
  categoryStats,
  statusStats,
  topPartners
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MonthlyChart data={monthlyStats} />
      <StatusChart data={statusStats} />
      <CategoryChart data={categoryStats} />
      <TopPartnersTable partners={topPartners} />
    </div>
  );
};

export default RecommendationsStats;
