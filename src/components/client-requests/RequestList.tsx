
import React from "react";
import { Loader2 } from "lucide-react";
import type { ServiceRequest } from "@/types/requests";
import GoldButton from "@/components/GoldButton";
import RequestCard from "./RequestCard";

interface RequestListProps {
  requests: ServiceRequest[];
  isLoading: boolean;
}

const RequestList: React.FC<RequestListProps> = ({ requests, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-vip-gold" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-vip-gray-400 mb-4">Vous n'avez pas encore de demandes</p>
        <GoldButton onClick={() => document.querySelector('[data-value="new"]')?.click()}>
          Créer ma première demande
        </GoldButton>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map(request => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default RequestList;
