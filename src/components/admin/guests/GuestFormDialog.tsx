
import React, { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Guest } from '@/types/floorPlanTypes';

interface GuestFormDialogProps {
  guest: Guest | null;
  onSave: (guest: Guest) => void;
  onCancel: () => void;
}

const GuestFormDialog: React.FC<GuestFormDialogProps> = ({ guest, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Guest>({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ceremonie: false,
    vin: false,
    repas: false,
    brunch: false,
    conjoint: false,
    enfants: 0,
    table: '',
    notes: '',
  });

  useEffect(() => {
    if (guest) {
      setFormData(guest);
    } else {
      setFormData({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        ceremonie: false,
        vin: false,
        repas: false,
        brunch: false,
        conjoint: false,
        enfants: 0,
        table: '',
        notes: '',
      });
    }
  }, [guest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: keyof Guest, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Date.now().toString(),
    });
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>
          {guest ? "Modifier un invité" : "Ajouter un invité"}
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input 
              id="nom" 
              name="nom" 
              value={formData.nom} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input 
              id="prenom" 
              name="prenom" 
              value={formData.prenom} 
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input 
              id="telephone" 
              name="telephone" 
              value={formData.telephone} 
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Événements</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ceremonie" 
                checked={formData.ceremonie} 
                onCheckedChange={(checked) => handleCheckboxChange('ceremonie', !!checked)}
              />
              <Label htmlFor="ceremonie" className="text-sm">Cérémonie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vin" 
                checked={formData.vin} 
                onCheckedChange={(checked) => handleCheckboxChange('vin', !!checked)}
              />
              <Label htmlFor="vin" className="text-sm">Vin d'honneur</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="repas" 
                checked={formData.repas} 
                onCheckedChange={(checked) => handleCheckboxChange('repas', !!checked)}
              />
              <Label htmlFor="repas" className="text-sm">Repas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="brunch" 
                checked={formData.brunch} 
                onCheckedChange={(checked) => handleCheckboxChange('brunch', !!checked)}
              />
              <Label htmlFor="brunch" className="text-sm">Brunch</Label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="conjoint" 
              checked={formData.conjoint} 
              onCheckedChange={(checked) => handleCheckboxChange('conjoint', !!checked)}
            />
            <Label htmlFor="conjoint" className="text-sm">Avec conjoint</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="enfants">Nombre d'enfants</Label>
            <Input 
              id="enfants" 
              name="enfants" 
              type="number" 
              min="0"
              value={formData.enfants} 
              onChange={handleNumberChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="table">Table assignée</Label>
          <Input 
            id="table" 
            name="table" 
            value={formData.table} 
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange}
            className="min-h-[80px]"
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel} className="mr-2">
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default GuestFormDialog;
