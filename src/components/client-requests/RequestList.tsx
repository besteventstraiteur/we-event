
import React from "react";
import GoldButton from "@/components/GoldButton";
import RequestCard from "./RequestCard";

interface Request {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  status: string;
  createdAt: string;
  messages: {
    id: number;
    sender: string;
    content: string;
    date: string;
  }[];
}

interface RequestListProps {
  requests: Request[];
  navigateToNewTab: () => void;
}

const RequestList: React.FC<RequestListProps> = ({ requests, navigateToNewTab }) => {
  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-vip-gray-400 mb-4">Vous n'avez pas encore de demandes</p>
          <GoldButton onClick={navigateToNewTab}>
            Créer ma première demande
          </GoldButton>
        </div>
      ) : (
        requests.map(request => (
          <RequestCard key={request.id} request={request} />
        ))
      )}
    </div>
  );
};

export default RequestList;
