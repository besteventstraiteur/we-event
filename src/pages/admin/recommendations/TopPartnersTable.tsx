
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TopPartner } from "./types";

interface TopPartnersTableProps {
  partners: TopPartner[];
}

const TopPartnersTable: React.FC<TopPartnersTableProps> = ({ partners }) => {
  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle className="text-lg">Partenaires les plus actifs</CardTitle>
        <CardDescription>Top 5 des partenaires qui font le plus de recommandations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-vip-gray-800 hover:bg-transparent">
                <TableHead className="text-vip-gray-400">Partenaire</TableHead>
                <TableHead className="text-vip-gray-400 text-right">Envoyées</TableHead>
                <TableHead className="text-vip-gray-400 text-right">Reçues</TableHead>
                <TableHead className="text-vip-gray-400 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner, index) => (
                <TableRow key={index} className="border-vip-gray-800">
                  <TableCell className="font-medium text-vip-white">{partner.name}</TableCell>
                  <TableCell className="text-right text-vip-gold">{partner.sent}</TableCell>
                  <TableCell className="text-right text-blue-400">{partner.received}</TableCell>
                  <TableCell className="text-right text-vip-white font-medium">{partner.sent + partner.received}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPartnersTable;
