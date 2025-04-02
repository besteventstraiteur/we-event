
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowUpDown, Plus, Mail, Trash2, MailCheck } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { useToast } from "@/components/ui/use-toast";

// Données fictives
const guestsData = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", clientName: "Sophie & Thomas", hasAccepted: true, hasReplied: true, menuSelected: true },
  { id: 2, name: "Marie Martin", email: "marie.martin@example.com", clientName: "Sophie & Thomas", hasAccepted: false, hasReplied: true, menuSelected: false },
  { id: 3, name: "Luc Bernard", email: "luc.bernard@example.com", clientName: "Sophie & Thomas", hasAccepted: true, hasReplied: true, menuSelected: true },
  { id: 4, name: "Aurélie Petit", email: "aurelie.petit@example.com", clientName: "Sophie & Thomas", hasAccepted: null, hasReplied: false, menuSelected: false },
  { id: 5, name: "Pierre Lefebvre", email: "pierre.lefebvre@example.com", clientName: "Julie & Marc", hasAccepted: true, hasReplied: true, menuSelected: false },
  { id: 6, name: "Claire Moreau", email: "claire.moreau@example.com", clientName: "Julie & Marc", hasAccepted: null, hasReplied: false, menuSelected: false },
  { id: 7, name: "François Dubois", email: "francois.dubois@example.com", clientName: "Julie & Marc", hasAccepted: true, hasReplied: true, menuSelected: true },
  { id: 8, name: "Cécile Leroy", email: "cecile.leroy@example.com", clientName: "Julie & Marc", hasAccepted: false, hasReplied: true, menuSelected: false },
];

const clientsWithGuests = Array.from(new Set(guestsData.map(guest => guest.clientName)));

const AdminGuests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", clientName: "" });
  const { toast } = useToast();

  const handleSendReminder = () => {
    toast({
      title: "Rappel envoyé",
      description: `Un rappel a été envoyé à ${selectedGuests.length} invité(s)`,
    });
    setIsReminderDialogOpen(false);
    setSelectedGuests([]);
  };

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email || !newGuest.clientName) {
      toast({
        variant: "destructive",
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    toast({
      title: "Invité ajouté",
      description: `${newGuest.name} a été ajouté à la liste des invités de ${newGuest.clientName}`,
    });
    setIsAddGuestOpen(false);
    setNewGuest({ name: "", email: "", clientName: "" });
  };

  const handleDeleteGuests = () => {
    toast({
      title: "Invités supprimés",
      description: `${selectedGuests.length} invité(s) ont été supprimés`,
    });
    setSelectedGuests([]);
  };

  const handleToggleSelectGuest = (id: number) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };

  const handleSelectAllGuests = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
  };

  const filteredGuests = guestsData.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = !selectedClient || guest.clientName === selectedClient;
    const matchesTab = activeTab === "all" || 
                     (activeTab === "accepted" && guest.hasAccepted === true) ||
                     (activeTab === "declined" && guest.hasAccepted === false) ||
                     (activeTab === "pending" && guest.hasAccepted === null);
    
    return matchesSearch && matchesClient && matchesTab;
  });

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Invités</h1>
          <p className="text-gray-500">
            Gérez les invités des événements de vos clients
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un invité..."
              className="pl-9 bg-white border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 bg-white">
            <Filter size={16} /> Filtrer
          </Button>
          <GoldButton onClick={() => setIsAddGuestOpen(true)}>
            <Plus size={16} className="mr-2" /> Ajouter un invité
          </GoldButton>
        </div>

        <div className="bg-white p-4 rounded-md border border-gray-200">
          <div className="font-medium mb-2">Filtrer par client</div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedClient === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedClient(null)}
              className={selectedClient === null ? "bg-amber-500 hover:bg-amber-600" : "bg-white border-gray-200 text-gray-700"}
            >
              Tous
            </Button>
            {clientsWithGuests.map(client => (
              <Button
                key={client}
                variant={selectedClient === client ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedClient(client)}
                className={selectedClient === client ? "bg-amber-500 hover:bg-amber-600" : "bg-white border-gray-200 text-gray-700"}
              >
                {client}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Tous
            </TabsTrigger>
            <TabsTrigger 
              value="accepted" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Présents
            </TabsTrigger>
            <TabsTrigger 
              value="declined" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Absents
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              En attente
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4">
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Liste des invités</CardTitle>
                  <div className="flex gap-2">
                    {selectedGuests.length > 0 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 border-gray-200 text-gray-600 hover:text-red-600 bg-white"
                          onClick={handleDeleteGuests}
                        >
                          <Trash2 size={16} /> Supprimer
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
                          onClick={() => setIsReminderDialogOpen(true)}
                        >
                          <Mail size={16} /> Envoyer un rappel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <CardDescription>
                  {filteredGuests.length} invité(s) trouvé(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-gray-100">
                        <TableHead className="w-[40px]">
                          <input 
                            type="checkbox" 
                            checked={selectedGuests.length > 0 && selectedGuests.length === filteredGuests.length} 
                            onChange={handleSelectAllGuests}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                            Nom <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Menu</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuests.map((guest) => (
                        <TableRow key={guest.id} className="hover:bg-gray-50">
                          <TableCell>
                            <input 
                              type="checkbox" 
                              checked={selectedGuests.includes(guest.id)} 
                              onChange={() => handleToggleSelectGuest(guest.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{guest.name}</TableCell>
                          <TableCell>{guest.email}</TableCell>
                          <TableCell>{guest.clientName}</TableCell>
                          <TableCell>
                            {guest.hasReplied ? (
                              guest.hasAccepted ? (
                                <Badge variant="success">Présent</Badge>
                              ) : (
                                <Badge variant="destructive">Absent</Badge>
                              )
                            ) : (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                En attente
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {guest.hasAccepted && (
                              guest.menuSelected ? (
                                <Badge variant="success">Sélectionné</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                  En attente
                                </Badge>
                              )
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 text-gray-500 hover:text-gray-900">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredGuests.length === 0 && (
                    <p className="text-center py-8 text-gray-500">Aucun invité trouvé</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog pour ajouter un invité */}
      <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
        <DialogContent className="bg-white border-gray-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un invité</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel invité à la liste d'un client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="client" className="text-sm font-medium">
                Client
              </label>
              <select
                id="client"
                className="w-full rounded-md border border-gray-200 py-2 px-3"
                value={newGuest.clientName}
                onChange={(e) => setNewGuest({...newGuest, clientName: e.target.value})}
              >
                <option value="">Sélectionner un client...</option>
                {clientsWithGuests.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nom de l'invité
              </label>
              <Input
                id="name"
                placeholder="Nom complet"
                className="bg-white border-gray-200"
                value={newGuest.name}
                onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="bg-white border-gray-200"
                value={newGuest.email}
                onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddGuestOpen(false)}
              className="bg-white border-gray-200"
            >
              Annuler
            </Button>
            <GoldButton onClick={handleAddGuest}>
              Ajouter l'invité
            </GoldButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour envoyer un rappel */}
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent className="bg-white border-gray-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Envoyer un rappel</DialogTitle>
            <DialogDescription>
              Envoyer un rappel aux invités sélectionnés ({selectedGuests.length})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-amber-800 text-sm">
                Un email de rappel sera envoyé à tous les invités sélectionnés pour les inviter à répondre à l'invitation et/ou à sélectionner leur menu.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsReminderDialogOpen(false)}
              className="bg-white border-gray-200"
            >
              Annuler
            </Button>
            <GoldButton onClick={handleSendReminder} className="gap-2">
              <MailCheck size={16} /> Envoyer le rappel
            </GoldButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminGuests;
