
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import EnhancedTaskList from "@/components/tasks/EnhancedTaskList";

const initialCategories = [
  { value: "venue", label: "Lieu" },
  { value: "catering", label: "Traiteur" },
  { value: "decoration", label: "Décoration" },
  { value: "music", label: "Musique" },
  { value: "photography", label: "Photographie" },
  { value: "clothing", label: "Tenues" },
  { value: "ceremony", label: "Cérémonie" },
  { value: "reception", label: "Réception" },
  { value: "honeymoon", label: "Lune de miel" },
  { value: "guest", label: "Invités" },
  { value: "other", label: "Autre" }
];

const ClientTasks = () => {
  return (
    <DashboardLayout type="client">
      <div className="bg-white p-4">
        <EnhancedTaskList
          userId="client-001"
          userName="Sophie et Thomas"
          userType="client"
          initialCategories={initialCategories}
          storageKey="clientTasks"
        />
      </div>
    </DashboardLayout>
  );
};

export default ClientTasks;
