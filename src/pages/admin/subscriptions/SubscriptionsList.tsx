
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockSubscriptions, SubscriptionTier } from "@/models/subscription";
import { Search, Filter } from "lucide-react";
import { format } from "date-fns";

const SubscriptionsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  
  // Filtrer les abonnements selon les critères de recherche et de filtre
  const filteredSubscriptions = mockSubscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "active" && sub.active) ||
      (filter === "inactive" && !sub.active);
    
    return matchesSearch && matchesFilter;
  });
  
  // Fonction pour obtenir la couleur du badge selon le tier
  const getBadgeColor = (tier: SubscriptionTier) => {
    switch(tier) {
      case SubscriptionTier.PREMIUM:
        return "bg-amber-500/20 text-amber-500 border-amber-500/50";
      case SubscriptionTier.STANDARD:
        return "bg-blue-500/20 text-blue-500 border-blue-500/50";
      default:
        return "bg-vip-gray-700/20 text-vip-gray-400 border-vip-gray-700/50";
    }
  };

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              placeholder="Rechercher un abonnement..."
              className="pl-10 bg-vip-gray-800 border-vip-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-vip-gray-400" />
            <select 
              className="bg-vip-gray-800 border-vip-gray-700 rounded p-2 text-vip-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
          </div>
        </div>

        <div className="rounded-md border border-vip-gray-800 overflow-hidden">
          <Table>
            <TableHeader className="bg-vip-gray-800">
              <TableRow>
                <TableHead className="text-vip-white">Partenaire</TableHead>
                <TableHead className="text-vip-white">Plan</TableHead>
                <TableHead className="text-vip-white">Prix</TableHead>
                <TableHead className="text-vip-white">Date début</TableHead>
                <TableHead className="text-vip-white">Date fin</TableHead>
                <TableHead className="text-vip-white">Auto-renouvellement</TableHead>
                <TableHead className="text-vip-white">État</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id} className="hover:bg-vip-gray-800/50">
                  <TableCell className="font-medium text-vip-white">
                    Partner Name {subscription.id.split('-')[1]}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getBadgeColor(subscription.tier)}>
                      {subscription.name}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscription.price} €</TableCell>
                  <TableCell>{format(subscription.startDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(subscription.expiryDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={subscription.autoRenew} 
                      // Dans une vraie application, cette action mettrait à jour l'état sur le serveur
                      onCheckedChange={() => console.log("Toggle auto-renewal for", subscription.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={subscription.active ? "default" : "secondary"} className={
                      subscription.active 
                        ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" 
                        : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                    }>
                      {subscription.active ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSubscriptions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-vip-gray-400">
                    Aucun abonnement trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionsList;
