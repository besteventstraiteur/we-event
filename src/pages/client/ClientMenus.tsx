
import React from "react";
import PlaceholderPage from "@/components/PlaceholderPage";
import { Utensils } from "lucide-react";

const ClientMenus = () => {
  return (
    <PlaceholderPage
      title="Menus"
      description="Gérez vos options de menus et préférences culinaires pour votre événement"
      type="client"
      icon={<Utensils className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default ClientMenus;
