
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BudgetPlanner from "@/components/budget/BudgetPlanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import AIBudgetAssistant from "@/components/ai-assistant/AIBudgetAssistant";
import { useDeviceType } from "@/hooks/use-mobile";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";

const ClientBudget = () => {
  // Example budget data - in a real app this would come from a budget service
  const budgetTotal = 15000;
  const spentAmount = 6800;
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const budgetCategories = [
    { name: "Lieu", budgeted: 5000, spent: 5200 },
    { name: "Traiteur", budgeted: 4000, spent: 3800 },
    { name: "Décoration", budgeted: 1500, spent: 800 },
    { name: "Photographie", budgeted: 1800, spent: 2000 },
    { name: "Animation", budgeted: 1200, spent: 800 },
    { name: "Tenues", budgeted: 1500, spent: 1200 },
  ];

  const content = (
    <div className={`space-y-6 ${isMobile ? 'px-2' : 'p-4'}`}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold truncate">Planification Budgétaire</h1>
        <p className="text-muted-foreground">
          Définissez et suivez votre budget pour maîtriser vos dépenses
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

        <div className={isMobile ? "mt-4" : ""}>
          <AIBudgetAssistant 
            budgetTotal={budgetTotal}
            spentAmount={spentAmount}
            categories={budgetCategories}
          />
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    <MobileOptimizedLayout>
      <DashboardLayout type="client">
        {content}
      </DashboardLayout>
    </MobileOptimizedLayout>
  ) : (
    <DashboardLayout type="client">
      {content}
    </DashboardLayout>
  );
};

export default ClientBudget;
