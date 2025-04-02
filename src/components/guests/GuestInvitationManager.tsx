
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MailCheck, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Guest {
  id: number;
  name: string;
  email: string;
  hasReplied: boolean;
  hasAccepted: boolean | null;
  menuSelected: boolean;
}

interface GuestInvitationManagerProps {
  initialGuests?: Guest[];
}

const GuestInvitationManager: React.FC<GuestInvitationManagerProps> = ({ 
  initialGuests = [] 
}) => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [newGuest, setNewGuest] = useState({ name: "", email: "" });
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);
  const { toast } = useToast();

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email) {
      toast({
        variant: "destructive",
        title: "Informations manquantes",
        description: "Le nom et l'email sont requis pour ajouter un invité",
      });
      return;
    }

    const guestExists = guests.some(
      (guest) => guest.email.toLowerCase() === newGuest.email.toLowerCase()
    );

    if (guestExists) {
      toast({
        variant: "destructive",
        title: "Invité déjà existant",
        description: "Un invité avec cet email existe déjà dans votre liste",
      });
      return;
    }

    const newGuestEntry: Guest = {
      id: Date.now(),
      name: newGuest.name,
      email: newGuest.email,
      hasReplied: false,
      hasAccepted: null,
      menuSelected: false,
    };

    setGuests([...guests, newGuestEntry]);
    setNewGuest({ name: "", email: "" });
    
    toast({
      title: "Invité ajouté",
      description: `${newGuest.name} a été ajouté à votre liste d'invités`,
    });
  };

  const handleRemoveGuest = (id: number) => {
    setGuests(guests.filter((guest) => guest.id !== id));
    setSelectedGuests(selectedGuests.filter((guestId) => guestId !== id));
    
    toast({
      title: "Invité supprimé",
      description: "L'invité a été retiré de votre liste",
    });
  };

  const handleSendInvitations = () => {
    if (selectedGuests.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun invité sélectionné",
        description: "Veuillez sélectionner au moins un invité pour envoyer des invitations",
      });
      return;
    }

    // Simuler l'envoi d'invitations
    toast({
      title: "Invitations envoyées",
      description: `${selectedGuests.length} invitation(s) ont été envoyées`,
    });
    
    setSelectedGuests([]);
  };

  const handleSendReminders = () => {
    if (selectedGuests.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun invité sélectionné",
        description: "Veuillez sélectionner au moins un invité pour envoyer des rappels",
      });
      return;
    }

    // Simuler l'envoi de rappels
    toast({
      title: "Rappels envoyés",
      description: `${selectedGuests.length} rappel(s) ont été envoyés`,
    });
    
    setSelectedGuests([]);
  };

  const handleToggleSelectGuest = (id: number) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter((guestId) => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };

  const handleSelectAllGuests = () => {
    if (selectedGuests.length === guests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(guests.map((guest) => guest.id));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Ajouter un invité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Nom de l'invité"
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                className="bg-white"
              />
            </div>
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Email"
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                className="bg-white"
              />
            </div>
            <Button 
              onClick={handleAddGuest}
              className="bg-amber-500 hover:bg-amber-600"
            >
              <Plus size={16} className="mr-2" /> Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            Tous
          </TabsTrigger>
          <TabsTrigger 
            value="replied" 
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            Ont répondu
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            En attente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-white">
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
                        onClick={() => {
                          selectedGuests.forEach(id => handleRemoveGuest(id));
                        }}
                      >
                        <Trash2 size={16} /> Supprimer
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
                        onClick={handleSendReminders}
                      >
                        <Mail size={16} /> Envoyer un rappel
                      </Button>
                    </>
                  )}
                  <Button 
                    className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                    size="sm"
                    onClick={handleSendInvitations}
                  >
                    <MailCheck size={16} /> Envoyer les invitations
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[40px] text-left py-3 px-4">
                        <input 
                          type="checkbox" 
                          checked={selectedGuests.length > 0 && selectedGuests.length === guests.length} 
                          onChange={handleSelectAllGuests}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-3 px-4">Nom</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Statut</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-500">
                          Aucun invité pour le moment. Ajoutez votre premier invité.
                        </td>
                      </tr>
                    ) : (
                      guests.map((guest) => (
                        <tr key={guest.id} className="border-b">
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedGuests.includes(guest.id)} 
                              onChange={() => handleToggleSelectGuest(guest.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </td>
                          <td className="py-3 px-4 font-medium">{guest.name}</td>
                          <td className="py-3 px-4">{guest.email}</td>
                          <td className="py-3 px-4">
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
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveGuest(guest.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="replied">
          <Card className="bg-white">
            <CardContent className="py-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Nom</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Statut</th>
                      <th className="text-left py-3 px-4">Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.filter(g => g.hasReplied).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          Aucun invité n'a encore répondu.
                        </td>
                      </tr>
                    ) : (
                      guests.filter(g => g.hasReplied).map((guest) => (
                        <tr key={guest.id} className="border-b">
                          <td className="py-3 px-4 font-medium">{guest.name}</td>
                          <td className="py-3 px-4">{guest.email}</td>
                          <td className="py-3 px-4">
                            {guest.hasAccepted ? (
                              <Badge variant="success">Présent</Badge>
                            ) : (
                              <Badge variant="destructive">Absent</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {guest.hasAccepted && (
                              guest.menuSelected ? (
                                <Badge variant="success">Sélectionné</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                                  En attente
                                </Badge>
                              )
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-white">
            <CardContent className="py-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[40px] text-left py-3 px-4">
                        <input 
                          type="checkbox" 
                          checked={selectedGuests.length > 0 && selectedGuests.length === guests.filter(g => !g.hasReplied).length} 
                          onChange={() => {
                            const pendingGuests = guests.filter(g => !g.hasReplied).map(g => g.id);
                            if (selectedGuests.length === pendingGuests.length) {
                              setSelectedGuests([]);
                            } else {
                              setSelectedGuests(pendingGuests);
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-3 px-4">Nom</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.filter(g => !g.hasReplied).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          Tous vos invités ont répondu!
                        </td>
                      </tr>
                    ) : (
                      guests.filter(g => !g.hasReplied).map((guest) => (
                        <tr key={guest.id} className="border-b">
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedGuests.includes(guest.id)} 
                              onChange={() => handleToggleSelectGuest(guest.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </td>
                          <td className="py-3 px-4 font-medium">{guest.name}</td>
                          <td className="py-3 px-4">{guest.email}</td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
                              onClick={() => handleSendReminders()}
                            >
                              <Mail size={16} /> Rappel
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestInvitationManager;
