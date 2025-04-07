
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TopPartner } from "./mockData";

interface TopPartnersTableProps {
  partners: TopPartner[];
}

const TopPartnersTable: React.FC<TopPartnersTableProps> = ({ partners }) => {
  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle className="text-vip-white">Top partenaires</CardTitle>
        <CardDescription>Partenaires les plus recommandés</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-vip-gray-800 hover:bg-transparent">
              <TableHead className="text-vip-gray-400">Partenaire</TableHead>
              <TableHead className="text-vip-gray-400">Catégorie</TableHead>
              <TableHead className="text-vip-gray-400 text-right">Recommandations</TableHead>
              <TableHead className="text-vip-gray-400 text-right">Taux d'acceptation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id} className="border-vip-gray-800">
                <TableCell className="font-medium text-vip-white">{partner.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-vip-gray-800 text-vip-white border-vip-gray-700">
                    {partner.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-vip-white text-right">{partner.recommendations}</TableCell>
                <TableCell className="text-vip-white text-right">
                  <span className={partner.acceptanceRate > 90 ? "text-green-500" : "text-yellow-500"}>
                    {partner.acceptanceRate}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopPartnersTable;
