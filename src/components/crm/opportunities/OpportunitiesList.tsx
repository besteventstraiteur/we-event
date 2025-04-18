import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OpportunityFormDialog, { type Opportunity } from "./OpportunityFormDialog";
import OpportunitySearch from "./OpportunitySearch";
import OpportunityTable from "./OpportunityTable";
import EmptyOpportunities from "./EmptyOpportunities";

const mockOpportunities: Opportunity[] = [
  {
    id: "opp1",
    name: "Mariage Dupont",
    company: "Famille Dupont",
    value: 15000,
    stage: "proposal",
    source: "Salon du mariage",
    nextStep: "Présentation du devis",
    expectedCloseDate: "15/06/2025"
  },
  {
    id: "opp2",
    name: "Anniversaire 40 ans",
    company: "Entreprise Martin",
    value: 8000,
    stage: "qualified",
    source: "Recommandation",
    nextStep: "Visite du lieu",
    expectedCloseDate: "30/05/2025"
  },
  {
    id: "opp3",
    name: "Séminaire annuel",
    company: "Tech Solutions",
    value: 25000,
    stage: "negotiation",
    source: "LinkedIn",
    nextStep: "Négociation budget",
    expectedCloseDate: "10/07/2025"
  },
  {
    id: "opp4",
    name: "Gala de charité",
    company: "Association Espoir",
    value: 12000,
    stage: "closed_won",
    source: "Contact direct",
    nextStep: "Signature du contrat",
    expectedCloseDate: "01/09/2025"
  },
  {
    id: "opp5",
    name: "Conférence startup",
    company: "Incubateur Future",
    value: 18000,
    stage: "new",
    source: "Site web",
    nextStep: "Premier contact",
    expectedCloseDate: "20/08/2025"
  },
  {
    id: "opp6",
    name: "Soirée corporate",
    company: "Finance Plus",
    value: 30000,
    stage: "closed_lost",
    source: "Réseau professionnel",
    nextStep: "Archivé",
    expectedCloseDate: "25/04/2025"
  }
];

const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | undefined>(undefined);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
    toast({
      title: "Opportunité supprimée",
      description: "L'opportunité a été supprimée avec succès",
    });
  };

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setIsFormOpen(true);
  };

  const handleNewOpportunity = () => {
    setEditingOpportunity(undefined);
    setIsFormOpen(true);
  };

  const handleSaveOpportunity = (opportunityData: Omit<Opportunity, "id">) => {
    if (editingOpportunity) {
      setOpportunities(opportunities.map(opp => 
        opp.id === editingOpportunity.id 
          ? { ...opportunityData, id: editingOpportunity.id } 
          : opp
      ));
      toast({
        title: "Opportunité mise à jour",
        description: `L'opportunité ${opportunityData.name} a été mise à jour`,
      });
    } else {
      const newOpportunity: Opportunity = {
        ...opportunityData,
        id: `opp${opportunities.length + 1}`,
      };
      setOpportunities([...opportunities, newOpportunity]);
      toast({
        title: "Opportunité créée",
        description: `L'opportunité ${newOpportunity.name} a été créée avec succès`,
      });
    }
    setIsFormOpen(false);
  };

  const filteredOpportunities = opportunities.filter(opportunity => 
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    opportunity.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <OpportunitySearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewOpportunity={handleNewOpportunity}
      />
      
      {filteredOpportunities.length > 0 ? (
        <OpportunityTable 
          opportunities={filteredOpportunities}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyOpportunities 
          onNewOpportunity={handleNewOpportunity}
          searchQuery={searchQuery}
        />
      )}

      <OpportunityFormDialog 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        opportunity={editingOpportunity}
        onSave={handleSaveOpportunity}
      />
    </div>
  );
};

export default OpportunitiesList;
