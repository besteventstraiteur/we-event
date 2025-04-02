
import React, { useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Guest } from "@/types/floorPlanTypes";

import GuestSearchBar from "@/components/admin/guests/GuestSearchBar";
import GuestListTable from "@/components/admin/guests/GuestListTable";
import GuestStatsSummary from "@/components/admin/guests/GuestStatsSummary";
import { mockGuestsData } from "@/data/mockGuestsData";

const AdminGuests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [guests, setGuests] = useState<Guest[]>(mockGuestsData);
  const { toast } = useToast();

  const filteredGuests = guests.filter(
    (guest) =>
      guest.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setCurrentGuest(null);
    setShowEditDialog(true);
  };

  const handleEdit = (guest: Guest) => {
    setCurrentGuest(guest);
    setShowEditDialog(true);
  };

  const handleDelete = (guestId: string) => {
    // In a real app, we would confirm before deleting
    setGuests(guests.filter((guest) => guest.id !== guestId));
    toast({
      title: "Invité supprimé",
      description: "L'invité a été supprimé avec succès",
    });
  };

  const handleSendInvitation = (guestId: string) => {
    // In a real app, we would call an API to send an invitation
    toast({
      title: "Invitation envoyée",
      description: "L'invitation a été envoyée avec succès",
    });
  };

  const handleSendReminder = (guestId: string) => {
    // In a real app, we would call an API to send a reminder
    toast({
      title: "Rappel envoyé",
      description: "Le rappel a été envoyé avec succès",
    });
  };

  const handleSaveGuest = (guest: Guest) => {
    // In a real app, we would validate the data and save to backend
    if (currentGuest) {
      // Update existing guest
      setGuests(
        guests.map((g) => (g.id === guest.id ? guest : g))
      );
      toast({
        title: "Invité mis à jour",
        description: "Les informations de l'invité ont été mises à jour avec succès",
      });
    } else {
      // Add new guest
      const newGuest = {
        ...guest,
        id: Date.now().toString(), // Generate a temporary ID
      };
      setGuests([...guests, newGuest]);
      toast({
        title: "Invité ajouté",
        description: "L'invité a été ajouté avec succès",
      });
    }
    setShowEditDialog(false);
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Invités</h1>
          <p className="text-gray-500">
            Gérez tous les invités et suivez leurs confirmations
          </p>
        </div>

        <GuestStatsSummary guests={guests} />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des invités</h2>
          <Button className="gap-2" onClick={handleAdd}>
            <Plus size={16} /> Ajouter un invité
          </Button>
        </div>

        <GuestSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterClick={() => console.log("Filter clicked")}
        />

        <GuestListTable
          guests={filteredGuests}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSendInvitation={handleSendInvitation}
          onSendReminder={handleSendReminder}
        />

        {/* Guest Edit Dialog - in a real app, this would be a separate component */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentGuest ? "Modifier un invité" : "Ajouter un invité"}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-500">
                Formulaire à implémenter pour éditer/ajouter un invité
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                  className="mr-2"
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    handleSaveGuest(
                      currentGuest || {
                        id: "",
                        nom: "Nouveau",
                        prenom: "Invité",
                        email: "nouveau@exemple.com",
                        telephone: "",
                        ceremonie: false,
                        vin: false,
                        repas: false,
                        brunch: false,
                        conjoint: false,
                        enfants: 0,
                        table: "",
                        notes: "",
                      }
                    )
                  }
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminGuests;
