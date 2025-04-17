
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuotesList from "@/components/crm/quotes/QuotesList";
import { useAuth } from "@/hooks/useAuth";

const CrmQuotes = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Devis</h1>
          <p className="text-muted-foreground">
            Gérez vos devis et convertissez-les en factures
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des devis</CardTitle>
          </CardHeader>
          <CardContent>
            <QuotesList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CrmQuotes;
