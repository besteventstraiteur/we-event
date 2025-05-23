
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactsList from "@/components/crm/contacts/ContactsList";
import { useAuth } from "@/hooks/useAuth";

const CrmContacts = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contacts et clients</h1>
          <p className="text-muted-foreground">
            Gérez vos contacts et suivez vos interactions clients
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactsList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CrmContacts;
