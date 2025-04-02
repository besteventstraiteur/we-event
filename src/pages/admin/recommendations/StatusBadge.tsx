
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "accepted" | "pending" | "declined";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'accepted':
      return <Badge variant="success" className="bg-green-100 text-green-800 border-green-300">Acceptée</Badge>;
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">En attente</Badge>;
    case 'declined':
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">Refusée</Badge>;
    default:
      return <Badge variant="outline">Inconnue</Badge>;
  }
};

export default StatusBadge;
