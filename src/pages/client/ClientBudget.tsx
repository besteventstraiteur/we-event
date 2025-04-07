
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BudgetPlanner from "@/components/budget/BudgetPlanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import AIBudgetAssistant from "@/components/ai-assistant/AIBudgetAssistant";

const ClientBudget = () => {
  // Example budget data - in a real app this would come from a budget service
  const budgetTotal = 15000;
  const spentAmount = 6800;
  const budgetCategories = [
    { name: "Lieu", budgeted: 5000, spent: 5200 },
    { name: "Traiteur", budgeted: 4000, spent: 3800 },
    { name: "Décoration", budgeted: 1500, spent: 800 },
    { name: "Photographie", budgeted: 1800, spent: 2000 },
    { name: "Animation", budgeted: 1200, spent: 800 },
    { name: "Tenues", budgeted: 1500, spent: 1200 },
  ];

  return (
    <DashboardLayout type="client">
      <div className="space-y-6 bg-white p-4">
        <div>
          <h1 className="text-3xl font-bold truncate">Planification Budgétaire</h1>
          <p className="text-muted-foreground">
            Définissez et suivez votre budget pour maîtriser vos dépenses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 truncate">
                  <PiggyBank className="h-5 w-5 text-vip-gold" />
                  Gestion de Budget
                </CardTitle>
                <CardDescription className="truncate">
                  Définissez votre budget global et répartissez-le entre vos différents prestataires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetPlanner />
              </CardContent>
            </Card>
          </div>

          <div>
            <AIBudgetAssistant 
              budgetTotal={budgetTotal}
              spentAmount={spentAmount}
              categories={budgetCategories}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientBudget;
