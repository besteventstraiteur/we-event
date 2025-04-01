
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface PodcastStatusBadgeProps {
  status: "approved" | "pending" | "rejected";
}

const PodcastStatusBadge: React.FC<PodcastStatusBadgeProps> = ({ status }) => {
  switch(status) {
    case "approved":
      return <Badge className="bg-green-500">Approuvé</Badge>;
    case "pending":
      return <Badge className="bg-amber-500">En attente</Badge>;
    case "rejected":
      return <Badge className="bg-red-500">Refusé</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

export default PodcastStatusBadge;
