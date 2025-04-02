
import React, { useState } from "react";
import { Search, Filter, ArrowUpDown, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import GoldButton from "@/components/GoldButton";
import StatusBadge from "./StatusBadge";
import { Recommendation } from "./types";

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterRecommendations = (recommendations: Recommendation[]) => {
    if (!searchTerm) return recommendations;
    return recommendations.filter(rec => 
      rec.fromPartner.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rec.toPartner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle>Toutes les recommandations</CardTitle>
        <CardDescription>Liste de toutes les recommandations entre partenaires</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 border-vip-gray-800 text-vip-gray-400 hover:text-vip-white">
            <Filter size={16} /> Filtrer
          </Button>
          <GoldButton className="gap-2">
            <Download size={16} /> Exporter CSV
          </GoldButton>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-vip-gray-800 hover:bg-transparent">
                <TableHead className="text-vip-gray-400">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                    Date <ArrowUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="text-vip-gray-400">Partenaire source</TableHead>
                <TableHead className="text-vip-gray-400">Partenaire cible</TableHead>
                <TableHead className="text-vip-gray-400">Catégorie</TableHead>
                <TableHead className="text-vip-gray-400">Client</TableHead>
                <TableHead className="text-vip-gray-400">Statut</TableHead>
                <TableHead className="text-vip-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterRecommendations(recommendations).map((rec) => (
                <TableRow key={rec.id} className="border-vip-gray-800">
                  <TableCell className="text-vip-gray-200">{rec.date}</TableCell>
                  <TableCell className="font-medium text-vip-white">{rec.fromPartner}</TableCell>
                  <TableCell className="text-vip-white">{rec.toPartner}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-vip-gray-800 text-vip-white border-vip-gray-700">
                      {rec.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-vip-white">{rec.clientName}</TableCell>
                  <TableCell><StatusBadge status={rec.status} /></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filterRecommendations(recommendations).length === 0 && (
            <p className="text-center py-8 text-vip-gray-400">Aucun résultat trouvé</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsList;
