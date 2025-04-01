
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpDown, Mail } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [emailContent, setEmailContent] = useState("");
  
  // Exemple de données clients
  const clients = [
    { id: 1, name: "Julien Martin", email: "julien.martin@example.com", phone: "06 12 34 56 78", date: "15/04/2023", requests: 5 },
    { id: 2, name: "Sophie Bernard", email: "sophie.bernard@example.com", phone: "06 23 45 67 89", date: "03/05/2023", requests: 3 },
    { id: 3, name: "Thomas Dubois", email: "thomas.dubois@example.com", phone: "06 34 56 78 90", date: "21/05/2023", requests: 8 },
    { id: 4, name: "Marie Leclerc", email: "marie.leclerc@example.com", phone: "06 45 67 89 01", date: "10/06/2023", requests: 2 },
    { id: 5, name: "Antoine Moreau", email: "antoine.moreau@example.com", phone: "06 56 78 90 12", date: "08/06/2023", requests: 0 },
    { id: 6, name: "Camille Leroy", email: "camille.leroy@example.com", phone: "06 67 89 01 23", date: "14/06/2023", requests: 1 },
  ];

  const filterClients = () => {
    if (!searchTerm) return clients;
    return clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    );
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Clients VIP</h1>
          <p className="text-vip-gray-400">Gérez les comptes clients, suivez leur activité et communiquez avec eux</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un client..."
              className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 border-vip-gray-800 text-vip-gray-400 hover:text-vip-white">
            <Filter size={16} /> Filtrer
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <GoldButton className="gap-2">
                <Mail size={16} /> Message groupé
              </GoldButton>
            </DialogTrigger>
            <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
              <DialogHeader>
                <DialogTitle>Envoyer un message à tous les clients</DialogTitle>
                <DialogDescription className="text-vip-gray-400">
                  Ce message sera envoyé à tous les clients VIP actuellement inscrits.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Objet</h4>
                  <Input className="bg-vip-gray-800 border-vip-gray-700" placeholder="Objet de votre message" />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Contenu</h4>
                  <Textarea 
                    className="bg-vip-gray-800 border-vip-gray-700 min-h-[200px]" 
                    placeholder="Écrivez votre message ici..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                >
                  Annuler
                </Button>
                <GoldButton>Envoyer à {clients.length} clients</GoldButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle>Liste des clients VIP</CardTitle>
            <CardDescription>Gérez les comptes clients de la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-vip-gray-800">
                    <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                        Nom <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Email</th>
                    <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Téléphone</th>
                    <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Inscription</th>
                    <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Demandes</th>
                    <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterClients().map((client) => (
                    <tr key={client.id} className="border-b border-vip-gray-800 hover:bg-vip-gray-800/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white">
                            {client.name.charAt(0)}
                          </div>
                          <span className="font-medium text-vip-white">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-vip-gray-400">{client.email}</td>
                      <td className="px-4 py-3 text-vip-gray-400">{client.phone}</td>
                      <td className="px-4 py-3 text-vip-gray-400">{client.date}</td>
                      <td className="px-4 py-3 text-vip-white">{client.requests}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                                <Mail size={16} className="mr-1" /> Contacter
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
                              <DialogHeader>
                                <DialogTitle>Contacter {client.name}</DialogTitle>
                                <DialogDescription className="text-vip-gray-400">
                                  Envoyez un message direct à {client.email}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div>
                                  <h4 className="mb-2 text-sm font-medium">Objet</h4>
                                  <Input className="bg-vip-gray-800 border-vip-gray-700" placeholder="Objet de votre message" />
                                </div>
                                <div>
                                  <h4 className="mb-2 text-sm font-medium">Message</h4>
                                  <Textarea className="bg-vip-gray-800 border-vip-gray-700 min-h-[150px]" placeholder="Écrivez votre message ici..." />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                                >
                                  Annuler
                                </Button>
                                <GoldButton>Envoyer</GoldButton>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-red-500">
                            Désactiver
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filterClients().length === 0 && (
                <p className="text-center py-8 text-vip-gray-400">Aucun résultat trouvé</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminClients;
