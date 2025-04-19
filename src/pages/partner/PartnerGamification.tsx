
import React from "react";
import PlaceholderPage from "@/components/PlaceholderPage";
import { Trophy } from "lucide-react";

const PartnerGamification = () => {
  return (
    <PlaceholderPage
      title="Programme de Fidélité"
      description="Notre programme de gamification arrive bientôt"
      type="partner"
      icon={<Trophy className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default PartnerGamification;
