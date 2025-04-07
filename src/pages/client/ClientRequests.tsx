
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestForm from "@/components/client-requests/RequestForm";
import RequestList from "@/components/client-requests/RequestList";
import { useClientRequests } from "@/hooks/useClientRequests";

const ClientRequests = () => {
  const { 
    requests, 
    newRequest, 
    setNewRequest, 
    isLoading, 
    handleSubmit, 
    navigateToNewTab 
  } = useClientRequests();

  return (
    <DashboardLayout type="client">
      <div className="bg-white">
        <h1 className="text-2xl font-bold mb-6">Mes Demandes</h1>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-6 bg-vip-gray-100">
            <TabsTrigger value="list" className="data-[state=active]:bg-white">Mes demandes</TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-white">Nouvelle demande</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="bg-white">
            <RequestList 
              requests={requests}
              navigateToNewTab={navigateToNewTab}
            />
          </TabsContent>
          
          <TabsContent value="new" className="bg-white">
            <RequestForm
              newRequest={newRequest}
              setNewRequest={setNewRequest}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientRequests;
