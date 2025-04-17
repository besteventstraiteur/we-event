
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductsList from "@/components/crm/products/ProductsList";
import { useAuth } from "@/hooks/useAuth";

const CrmProducts = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Produits et services</h1>
          <p className="text-muted-foreground">
            Gérez votre catalogue de produits et services
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Catalogue</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CrmProducts;
