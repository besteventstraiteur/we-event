
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OpportunitiesList from "@/components/crm/opportunities/OpportunitiesList";
import { useAuth } from "@/hooks/useAuth";

const CrmOpportunities = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Opportunités commerciales</h1>
          <p className="text-muted-foreground">
            Gérez votre pipeline commercial et suivez vos opportunités
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Opportunités</CardTitle>
          </CardHeader>
          <CardContent>
            <OpportunitiesList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CrmOpportunities;
