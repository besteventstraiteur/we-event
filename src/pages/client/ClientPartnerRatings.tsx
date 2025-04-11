
import React from "react";
import PlaceholderPage from "@/components/PlaceholderPage";
import { Star } from "lucide-react";

const ClientPartnerRatings = () => {
  return (
    <PlaceholderPage
      title="Évaluations des prestataires"
      description="Évaluez et consultez les avis sur vos prestataires"
      type="client"
      icon={<Star className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default ClientPartnerRatings;
