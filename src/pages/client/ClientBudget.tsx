
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BudgetPlanner from "@/components/budget/BudgetPlanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

const ClientBudget = () => {
  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Planification Budgétaire</h1>
          <p className="text-muted-foreground">
            Définissez et suivez votre budget pour maîtriser vos dépenses
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-vip-gold" />
              Gestion de Budget
            </CardTitle>
            <CardDescription>
              Définissez votre budget global et répartissez-le entre vos différents prestataires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetPlanner />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientBudget;
