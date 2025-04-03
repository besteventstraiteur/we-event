
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PartnerType } from "@/utils/accessControl";
import { Pencil, Plus, Trash } from "lucide-react";

// Initial partner types data based on the enum
const initialPartnerTypes = [
  { id: "1", type: PartnerType.PHOTOGRAPHER, name: "Photographe", description: "Services de photographie", permissions: ["manage:photos", "manage:portfolio"] },
  { id: "2", type: PartnerType.DJ, name: "DJ", description: "Animation musicale", permissions: ["manage:playlists", "manage:portfolio"] },
  { id: "3", type: PartnerType.CATERER, name: "Traiteur", description: "Services de restauration", permissions: ["manage:menus", "manage:portfolio"] },
  { id: "4", type: PartnerType.VENUE, name: "Lieu", description: "Salles et domaines", permissions: ["manage:calendar", "manage:portfolio"] },
  { id: "5", type: PartnerType.DECORATOR, name: "Décorateur", description: "Services de décoration", permissions: ["manage:portfolio"] }
];

const AdminPartnerTypes: React.FC = () => {
  const [partnerTypes, setPartnerTypes] = useState(initialPartnerTypes);
  const [isEditing, setIsEditing] = useState(false);
  const [currentType, setCurrentType] = useState<any>(null);
  
  const handleEdit = (type: any) => {
    setCurrentType({...type});
    setIsEditing(true);
  };
  
  const handleAdd = () => {
    setCurrentType({
      id: String(partnerTypes.length + 1),
      type: "",
      name: "",
      description: "",
      permissions: []
    });
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (partnerTypes.find(p => p.id === currentType.id)) {
      setPartnerTypes(partnerTypes.map(p => p.id === currentType.id ? currentType : p));
    } else {
      setPartnerTypes([...partnerTypes, currentType]);
    }
    setIsEditing(false);
    setCurrentType(null);
  };
  
  const handleDelete = (id: string) => {
    setPartnerTypes(partnerTypes.filter(p => p.id !== id));
  };
  
  const togglePermission = (permission: string) => {
    if (!currentType) return;
    
    const updatedPermissions = currentType.permissions.includes(permission)
      ? currentType.permissions.filter((p: string) => p !== permission)
      : [...currentType.permissions, permission];
      
    setCurrentType({
      ...currentType,
      permissions: updatedPermissions
    });
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Types de partenaires</h1>
            <p className="text-vip-gray-400">Gérez les différents types de partenaires et leurs permissions</p>
          </div>
          
          <Button onClick={handleAdd} className="bg-vip-gold hover:bg-amber-600 text-white">
            <Plus size={18} className="mr-2" />
            Ajouter un type
          </Button>
        </div>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-vip-white">Liste des types de partenaires</CardTitle>
            <CardDescription className="text-vip-gray-400">
              Les types de partenaires déterminent les accès et fonctionnalités disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="text-vip-white">
              <TableHeader className="bg-vip-gray-800">
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Nom affiché</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerTypes.map((type) => (
                  <TableRow key={type.id} className="border-b border-vip-gray-800">
                    <TableCell className="font-medium">{type.type}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {type.permissions.map((permission: string) => (
                          <span key={permission} className="text-xs bg-vip-gray-800 px-2 py-1 rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-vip-gray-700 text-vip-white hover:bg-vip-gray-800"
                          onClick={() => handleEdit(type)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-vip-gray-700 text-red-400 hover:bg-vip-gray-800 hover:text-red-300"
                          onClick={() => handleDelete(type.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentType?.id ? `Modifier ${currentType.name || 'le type'}` : 'Ajouter un type'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Identifiant</Label>
                <Input 
                  id="type" 
                  value={currentType?.type || ''} 
                  onChange={e => setCurrentType({...currentType, type: e.target.value})}
                  placeholder="photographer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom affiché</Label>
                <Input 
                  id="name" 
                  value={currentType?.name || ''} 
                  onChange={e => setCurrentType({...currentType, name: e.target.value})}
                  placeholder="Photographe"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={currentType?.description || ''} 
                onChange={e => setCurrentType({...currentType, description: e.target.value})}
                placeholder="Description du type de partenaire"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                {[
                  "manage:photos",
                  "manage:playlists",
                  "manage:menus",
                  "manage:calendar",
                  "manage:portfolio",
                  "manage:services"
                ].map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox 
                      id={permission} 
                      checked={currentType?.permissions?.includes(permission)}
                      onCheckedChange={() => togglePermission(permission)}
                    />
                    <Label htmlFor={permission} className="text-sm">
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
            <Button className="bg-vip-gold hover:bg-amber-600 text-white" onClick={handleSave}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminPartnerTypes;
