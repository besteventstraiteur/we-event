import React, { useEffect, useState } from 'react';
import GuestList from '@/components/guests/GuestList';
import type { Guest, Table } from '@/types/floorPlanTypes';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Upload, DownloadCloud, Smartphone } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Capacitor } from '@capacitor/core';

interface GuestsTabProps {
  guests: Guest[];
  onSave: (guests: Guest[]) => void;
  tables: Table[];
}

const GuestsTab: React.FC<GuestsTabProps> = ({ guests, onSave, tables }) => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const [localGuests, setLocalGuests] = useState<Guest[]>([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [isNative, setIsNative] = useState(false);
  
  useEffect(() => {
    // Check if running as native app
    setIsNative(Capacitor.isNativePlatform());
    
    // Handle online/offline status
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        // Load cached guests if offline
        const cachedGuests = localStorage.getItem('cached_guests');
        if (cachedGuests) {
          try {
            setLocalGuests(JSON.parse(cachedGuests));
          } catch (e) {
            console.error('Error parsing cached guests:', e);
          }
        } else {
          // If no cached data, use the current guests
          setLocalGuests(guests);
          localStorage.setItem('cached_guests', JSON.stringify(guests));
        }
        
        toast({
          title: "Mode hors-ligne activé",
          description: "Vos modifications seront enregistrées localement"
        });
      } else if (localGuests.length > 0) {
        // When back online, sync local changes
        toast({
          title: "Reconnecté",
          description: "Synchronisation des modifications locales en cours"
        });
        onSave(localGuests);
        setLocalGuests([]);
      }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial status
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [guests, localGuests, onSave, toast]);
  
  // Handle save with offline support
  const handleSave = (updatedGuests: Guest[]) => {
    // Always cache locally
    localStorage.setItem('cached_guests', JSON.stringify(updatedGuests));
    
    if (isOnline) {
      // If online, save to server
      onSave(updatedGuests);
    } else {
      // If offline, just update local state
      setLocalGuests(updatedGuests);
      toast({
        title: "Enregistré localement",
        description: "Les modifications seront synchronisées lorsque vous serez en ligne"
      });
    }
  };
  
  // Import contacts (mock implementation)
  const importMobileContacts = () => {
    if (!isNative) {
      toast({
        title: "Non disponible",
        description: "Cette fonctionnalité n'est disponible que sur l'application mobile",
        variant: "destructive"
      });
      return;
    }
    
    // Mock implementation - in a real app, this would use Capacitor Contacts plugin
    toast({
      title: "Accès aux contacts",
      description: "Importation des contacts en cours..."
    });
    
    // Simulate import delay
    setTimeout(() => {
      const mockContacts = [
        { id: `contact-${Date.now()}-1`, firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@example.com', phone: '0612345678' },
        { id: `contact-${Date.now()}-2`, firstName: 'Marie', lastName: 'Martin', email: 'marie.martin@example.com', phone: '0698765432' },
        { id: `contact-${Date.now()}-3`, firstName: 'Pierre', lastName: 'Bernard', email: 'pierre.bernard@example.com', phone: '0687654321' }
      ];
      
      // Convert contacts to guests using the correct Guest type properties
      const newGuests: Guest[] = mockContacts.map(contact => ({
        id: contact.id,
        nom: contact.lastName,
        prenom: contact.firstName,
        email: contact.email || '',
        telephone: contact.phone || '',
        ceremonie: true,
        vin: true,
        repas: true,
        brunch: false,
        conjoint: false,
        enfants: 0,
        table: '',
        notes: ''
      }));
      
      // Combine with existing guests
      const updatedGuests = [...(isOnline ? guests : localGuests), ...newGuests];
      handleSave(updatedGuests);
      
      toast({
        title: "Contacts importés",
        description: `${mockContacts.length} contacts ont été ajoutés à votre liste d'invités`
      });
      
      setImportDialogOpen(false);
    }, 1500);
  };
  
  // Import CSV file
  const importCsvFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        // Get indices of relevant columns
        const firstNameIdx = headers.findIndex(h => h.toLowerCase().includes('prénom') || h.toLowerCase().includes('firstname'));
        const lastNameIdx = headers.findIndex(h => h.toLowerCase().includes('nom') || h.toLowerCase().includes('lastname'));
        const emailIdx = headers.findIndex(h => h.toLowerCase().includes('email'));
        const phoneIdx = headers.findIndex(h => h.toLowerCase().includes('téléphone') || h.toLowerCase().includes('phone'));
        
        // Parse guests from CSV using the correct Guest type properties
        const newGuests: Guest[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          newGuests.push({
            id: `import-${Date.now()}-${i}`,
            prenom: firstNameIdx >= 0 ? values[firstNameIdx].trim() : '',
            nom: lastNameIdx >= 0 ? values[lastNameIdx].trim() : '',
            email: emailIdx >= 0 ? values[emailIdx].trim() : '',
            telephone: phoneIdx >= 0 ? values[phoneIdx].trim() : '',
            ceremonie: true,
            vin: true,
            repas: true,
            brunch: false,
            conjoint: false,
            enfants: 0,
            table: '',
            notes: ''
          });
        }
        
        // Combine with existing guests
        const updatedGuests = [...(isOnline ? guests : localGuests), ...newGuests];
        handleSave(updatedGuests);
        
        toast({
          title: "Fichier importé",
          description: `${newGuests.length} invités ont été ajoutés à votre liste`
        });
        
        setImportDialogOpen(false);
      } catch (error) {
        console.error('Error parsing CSV:', error);
        toast({
          title: "Erreur",
          description: "Le format du fichier n'est pas valide",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };
  
  // Export to CSV
  const exportToCsv = () => {
    const currentGuests = isOnline ? guests : localGuests;
    const headers = ['Prénom', 'Nom', 'Email', 'Téléphone', 'Cérémonie', 'Vin', 'Repas', 'Brunch', 'Table'];
    const rows = currentGuests.map(guest => [
      guest.prenom || '',
      guest.nom || '',
      guest.email || '',
      guest.telephone || '',
      guest.ceremonie ? 'Oui' : 'Non',
      guest.vin ? 'Oui' : 'Non',
      guest.repas ? 'Oui' : 'Non',
      guest.brunch ? 'Oui' : 'Non',
      guest.table || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'invites_mariage.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload size={16} />
                Importer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importer des invités</DialogTitle>
                <DialogDescription>
                  Importez vos invités depuis différentes sources
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {isNative && (
                  <Button 
                    onClick={importMobileContacts} 
                    variant="outline" 
                    className="w-full gap-2 justify-start p-4 h-auto"
                  >
                    <Smartphone className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Contacts du téléphone</div>
                      <div className="text-sm text-gray-500">Importez directement depuis vos contacts</div>
                    </div>
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="w-full gap-2 justify-start p-4 h-auto"
                  onClick={() => document.getElementById('csv-upload')?.click()}
                >
                  <Upload className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Fichier CSV</div>
                    <div className="text-sm text-gray-500">Importez depuis Excel, Google Sheets, etc.</div>
                  </div>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={importCsvFile}
                  />
                </Button>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                  Annuler
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={exportToCsv} className="gap-2">
            <DownloadCloud size={16} />
            Exporter
          </Button>
        </div>
        
        {!isOnline && (
          <div className="bg-amber-100 px-3 py-1 rounded-full text-xs text-amber-800">
            Mode hors-ligne
          </div>
        )}
      </div>
      
      <GuestList 
        guests={isOnline ? guests : localGuests} 
        onSave={handleSave}
        tables={tables.map(table => ({ id: table.id, name: table.name }))}
        menuOptions={[
          { id: "1-1", name: "Bœuf Wellington", menuName: "Menu Standard" },
          { id: "1-2", name: "Saumon en croûte d'herbes", menuName: "Menu Standard" },
          { id: "2-1", name: "Risotto aux champignons", menuName: "Menu Végétarien" },
          { id: "2-2", name: "Wellington végétarien", menuName: "Menu Végétarien" },
        ]}
      />
    </div>
  );
};

export default GuestsTab;
