
import React, { useState } from "react";
import { AlertCircle, TrendingUp, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AIBudgetAssistantProps {
  budgetTotal: number;
  spentAmount: number;
  categories: {
    name: string;
    budgeted: number;
    spent: number;
  }[];
}

const AIBudgetAssistant: React.FC<AIBudgetAssistantProps> = ({
  budgetTotal,
  spentAmount,
  categories
}) => {
  const [showAllInsights, setShowAllInsights] = useState(false);
  
  // Calculate budget percentage used
  const percentageUsed = Math.round((spentAmount / budgetTotal) * 100);
  
  // Find categories that are over budget
  const overBudgetCategories = categories.filter(cat => cat.spent > cat.budgeted);
  
  // Calculate remaining budget
  const remainingBudget = budgetTotal - spentAmount;
  
  // Generate insights automatically
  const insights = [
    {
      type: overBudgetCategories.length > 0 ? "warning" : "success",
      title: overBudgetCategories.length > 0 
        ? `${overBudgetCategories.length} ${overBudgetCategories.length === 1 ? 'catégorie dépasse' : 'catégories dépassent'} le budget`
        : "Toutes les catégories respectent leur budget",
      description: overBudgetCategories.length > 0
        ? `${overBudgetCategories.map(c => c.name).join(', ')} ${overBudgetCategories.length === 1 ? 'dépasse' : 'dépassent'} le budget alloué.`
        : "Continuez ainsi, votre gestion financière est excellente !",
      icon: overBudgetCategories.length > 0 ? AlertCircle : CheckCircle
    },
    {
      type: percentageUsed > 90 ? "warning" : "info",
      title: `${percentageUsed}% du budget total utilisé`,
      description: percentageUsed > 90
        ? "Vous approchez de la limite de votre budget total. Revoyez vos priorités."
        : `Il vous reste ${remainingBudget}€ à dépenser pour votre événement.`,
      icon: TrendingUp
    },
    {
      type: "tip",
      title: "Conseil d'économie",
      description: "Les éléments de décoration peuvent souvent être loués plutôt qu'achetés, ce qui pourrait vous faire économiser jusqu'à 30%.",
      icon: DollarSign
    }
  ];
  
  // Show only 1 insight by default, or all if expanded
  const visibleInsights = showAllInsights ? insights : insights.slice(0, 1);

  return (
    <Card className="border-2 border-vip-gold/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-vip-gold" />
          Assistant Budget IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Budget utilisé</span>
            <span className="font-medium">{percentageUsed}%</span>
          </div>
          <Progress 
            value={percentageUsed} 
            className="h-2" 
            indicatorClassName={
              percentageUsed > 90 ? "bg-red-500" : 
              percentageUsed > 75 ? "bg-amber-500" : 
              "bg-green-500"
            }
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{spentAmount}€ dépensés</span>
            <span>{budgetTotal}€ total</span>
          </div>
        </div>

        <div className="space-y-3">
          {visibleInsights.map((insight, i) => (
            <Alert key={i} variant={insight.type as any}>
              <insight.icon className="h-4 w-4" />
              <AlertTitle>{insight.title}</AlertTitle>
              <AlertDescription>{insight.description}</AlertDescription>
            </Alert>
          ))}

          {insights.length > 1 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs" 
              onClick={() => setShowAllInsights(!showAllInsights)}
            >
              {showAllInsights ? "Afficher moins" : `Afficher ${insights.length - 1} autres conseils`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIBudgetAssistant;
