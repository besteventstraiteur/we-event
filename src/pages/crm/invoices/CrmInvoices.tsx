
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoicesList from "@/components/crm/invoices/InvoicesList";
import { useAuth } from "@/hooks/useAuth";

const CrmInvoices = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Factures</h1>
          <p className="text-muted-foreground">
            Gérez vos factures et suivez vos paiements
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des factures</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoicesList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CrmInvoices;
