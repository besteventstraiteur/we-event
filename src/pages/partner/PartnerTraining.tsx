
import React from "react";
import PlaceholderPage from "@/components/PlaceholderPage";
import { GraduationCap } from "lucide-react";

const PartnerTraining = () => {
  return (
    <PlaceholderPage
      title="Formation"
      description="Cette section de formation est en cours de développement"
      type="partner"
      icon={<GraduationCap className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default PartnerTraining;
