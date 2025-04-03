
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PointsTransaction } from "@/models/partnerGamification";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PointsHistoryProps {
  transactions: PointsTransaction[];
}

const PointsHistory = ({ transactions }: PointsHistoryProps) => {
  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle className="text-lg">Historique des points</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="max-h-[300px] overflow-auto px-6">
          {transactions.length === 0 ? (
            <p className="text-center py-6 text-vip-gray-400">Aucune transaction de points récente</p>
          ) : (
            <div className="space-y-3 pb-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-vip-gray-800 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${transaction.type === 'earned' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {transaction.type === 'earned' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vip-white">{transaction.reason}</p>
                      <p className="text-xs text-vip-gray-400">
                        {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${transaction.type === 'earned' 
                        ? 'border-green-500 text-green-500' 
                        : 'border-red-500 text-red-500'
                      }
                    `}
                  >
                    {transaction.type === 'earned' ? '+' : '-'}{transaction.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsHistory;
