
import React from "react";
import PlaceholderPage from "@/components/PlaceholderPage";
import { Globe } from "lucide-react";

const ClientMiniSite = () => {
  return (
    <PlaceholderPage
      title="Mini-Site"
      description="Créez et personnalisez votre mini-site de mariage pour informer vos invités"
      type="client"
      icon={<Globe className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default ClientMiniSite;
