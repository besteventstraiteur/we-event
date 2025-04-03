
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import EnhancedTaskList from "@/components/tasks/EnhancedTaskList";

const initialCategories = [
  { value: "client", label: "Clients" },
  { value: "event", label: "Événements" },
  { value: "admin", label: "Administration" },
  { value: "finance", label: "Finances" },
  { value: "marketing", label: "Marketing" },
  { value: "equipment", label: "Équipement" },
  { value: "venue", label: "Lieux" },
  { value: "team", label: "Équipe" },
  { value: "media", label: "Médias" },
  { value: "other", label: "Autre" }
];

const PartnerTasks = () => {
  return (
    <DashboardLayout type="partner">
      <EnhancedTaskList
        userId="partner-001"
        userName="Marie Dupont"
        userType="partner"
        initialCategories={initialCategories}
        storageKey="partnerTasks"
      />
    </DashboardLayout>
  );
};

export default PartnerTasks;
