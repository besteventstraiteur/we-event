
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star, PackageCheck } from "lucide-react";
import { WeddingPackage } from "@/models/weddingPackage";
import { mockWeddingPackages } from "@/components/wedding-packages/mockPackagesData";
import GoldButton from "@/components/GoldButton";

const PackageManagement = () => {
  const [packages, setPackages] = useState<WeddingPackage[]>(mockWeddingPackages);
  
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };
  
  const getServiceCount = (pkg: WeddingPackage) => {
    return pkg.services.length;
  };

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Liste des packs disponibles</CardTitle>
        <GoldButton className="gap-2">
          <Plus size={16} />
          Créer un nouveau pack
        </GoldButton>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-vip-gray-800 hover:bg-transparent">
              <TableHead>Nom du pack</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Réduction</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Avis</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id} className="border-vip-gray-800 hover:bg-vip-gray-800/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {pkg.featured && (
                      <Badge className="bg-vip-gold text-vip-black">Recommandé</Badge>
                    )}
                    {pkg.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{formatPrice(pkg.totalPrice)}</div>
                  <div className="text-sm text-vip-gray-400">
                    Au lieu de {formatPrice(pkg.originalPrice)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                    {pkg.discount}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <PackageCheck size={16} className="text-vip-gray-400" />
                    <span>{getServiceCount(pkg)} services</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-vip-gold text-vip-gold" />
                    <span>{pkg.rating.toFixed(1)}</span>
                    <span className="text-sm text-vip-gray-400">({pkg.reviewCount})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
                    Actif
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1 border-vip-gray-700">
                      <Edit size={14} />
                      Modifier
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 gap-1 border-vip-gray-700 text-red-500 hover:text-red-400 hover:border-red-500">
                      <Trash2 size={14} />
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PackageManagement;
