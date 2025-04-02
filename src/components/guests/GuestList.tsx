import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2, Download, Upload, Edit, Mail, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GoldButton from '@/components/GoldButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Guest {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ceremonie: boolean;
  vin: boolean;
  repas: boolean;
  brunch: boolean;
  conjoint: boolean;
  enfants: number;
  table: string;
  seat?: string;
  notes: string;
  menuChoice?: string;
  menuOption?: string;
}

interface GuestListProps {
  initialGuests?: Guest[];
  onSave?: (guests: Guest[]) => void;
  onGuestUpdate?: (guest: Guest) => void;
  tables?: { id: string, name: string }[];
  menuOptions?: { id: string, name: string, menuName: string }[];
}

const GuestList: React.FC<GuestListProps> = ({ 
  initialGuests = [], 
  onSave, 
  onGuestUpdate,
  tables = [],
  menuOptions = []
}) => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const form = useForm<Guest>({
    defaultValues: {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      ceremonie: true,
      vin: true,
      repas: true,
      brunch: false,
      conjoint: false,
      enfants: 0,
      table: '',
      seat: '',
      notes: '',
      menuChoice: 'standard',
      menuOption: ''
    }
  });

  const defaultMenuOptions = [
    { id: "1-1", name: "Bœuf Wellington", menuName: "Menu Standard" },
    { id: "1-2", name: "Saumon en croûte d'herbes", menuName: "Menu Standard" },
    { id: "2-1", name: "Risotto aux champignons", menuName: "Menu Végétarien" },
    { id: "2-2", name: "Wellington végétarien", menuName: "Menu Végétarien" },
  ];

  const allMenuOptions = menuOptions.length > 0 ? menuOptions : defaultMenuOptions;

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.telephone.includes(searchTerm);
    
    if (!matchesSearch) return false;
    
    switch (activeTab) {
      case "ceremonie":
        return guest.ceremonie;
      case "repas":
        return guest.repas;
      case "vin":
        return guest.vin;
      case "brunch":
        return guest.brunch;
      default:
        return true;
    }
  });

  const stats = {
    total: guests.length,
    ceremonie: guests.filter(g => g.ceremonie).length,
    vin: guests.filter(g => g.vin).length,
    repas: guests.filter(g => g.repas).length,
    brunch: guests.filter(g => g.brunch).length,
    totalPersonnes: guests.reduce((acc, guest) => {
      let count = 1; // Le guest lui-même
      if (guest.conjoint) count++;
      if (guest.enfants) count += guest.enfants;
      return acc + count;
    }, 0)
  };

  React.useEffect(() => {
    if (editingGuest) {
      form.reset({
        ...editingGuest
      });
    } else {
      form.reset({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        ceremonie: true,
        vin: true,
        repas: true,
        brunch: false,
        conjoint: false,
        enfants: 0,
        table: '',
        seat: '',
        notes: '',
        menuChoice: 'standard',
        menuOption: ''
      });
    }
  }, [editingGuest, form]);

  const addGuest = (data: Guest) => {
    const newGuest = {
      ...data,
      id: editingGuest ? editingGuest.id : Date.now().toString()
    };
    
    if (editingGuest) {
      setGuests(guests.map(g => g.id === newGuest.id ? newGuest : g));
      toast({
        title: "Invité mis à jour",
        description: `${newGuest.prenom} ${newGuest.nom} a été mis à jour avec succès`
      });
    } else {
      setGuests([...guests, newGuest]);
      toast({
        title: "Invité ajouté",
        description: `${newGuest.prenom} ${newGuest.nom} a été ajouté à votre liste`
      });
    }
    
    setEditingGuest(null);
    setIsAddDialogOpen(false);
    
    if (onSave) {
      onSave(editingGuest ? [...guests.filter(g => g.id !== newGuest.id), newGuest] : [...guests, newGuest]);
    }

    if (onGuestUpdate) {
      onGuestUpdate(newGuest);
    }
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
    toast({
      title: "Invité supprimé",
      description: "L'invité a été supprimé de votre liste"
    });
    
    if (onSave) {
      onSave(guests.filter(g => g.id !== id));
    }
  };

  const exportToCsv = () => {
    const headers = [
      "Nom", "Prénom", "Email", "Téléphone", 
      "Cérémonie", "Vin d'honneur", "Repas", "Brunch", 
      "Avec conjoint", "Nombre d'enfants", "Table / Siège", "Menu", "Notes"
    ];
    
    const csvRows = [
      headers.join(','),
      ...guests.map(guest => [
        `"${guest.nom}"`,
        `"${guest.prenom}"`,
        `"${guest.email}"`,
        `"${guest.telephone}"`,
        guest.ceremonie ? 'Oui' : 'Non',
        guest.vin ? 'Oui' : 'Non',
        guest.repas ? 'Oui' : 'Non',
        guest.brunch ? 'Oui' : 'Non',
        guest.conjoint ? 'Oui' : 'Non',
        guest.enfants,
        `"${guest.table ? guest.table : "-"}"`,
        `"${guest.menuOption ? allMenuOptions.find(o => o.id === guest.menuOption)?.name || "Option inconnue" : guest.menuChoice === 'standard' ? 'Standard' : guest.menuChoice === 'vegetarien' ? 'Végétarien' : guest.menuChoice === 'enfant' ? 'Enfant' : guest.menuChoice === 'allergies' ? 'Allergies' : 'Non choisi'}"`,
        `"${guest.notes.replace(/"/g, '""')}"`
      ].join(','))
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'liste_invites.csv';
    link.click();
  };

  const sendEmails = () => {
    toast({
      title: "Emails en préparation",
      description: "Cette fonctionnalité sera bientôt disponible"
    });
  };

  return (
    <div className="flex flex-col">
      <Card className="bg-vip-gray-900 border-vip-gray-800 mb-4">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle className="text-vip-white">Liste des invités</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Gérez vos invités et leurs informations
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <GoldButton onClick={() => setEditingGuest(null)}>
                    <PlusCircle size={18} className="mr-2" /> Ajouter un invité
                  </GoldButton>
                </DialogTrigger>
                <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
                  <DialogHeader>
                    <DialogTitle>{editingGuest ? 'Modifier un invité' : 'Ajouter un invité'}</DialogTitle>
                    <DialogDescription className="text-vip-gray-400">
                      {editingGuest 
                        ? 'Modifiez les informations de votre invité' 
                        : 'Ajoutez un nouvel invité à votre liste'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(addGuest)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="nom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="prenom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="telephone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="ceremonie"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel>Cérémonie</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vin"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel>Vin d'honneur</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="repas"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel>Repas</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="brunch"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel>Brunch</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="conjoint"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel>Avec conjoint</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="enfants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre d'enfants</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="table"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Table assignée</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                                    <SelectValue placeholder="Choisir une table" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                                  <SelectItem value="">Non assigné</SelectItem>
                                  {tables.map(table => (
                                    <SelectItem key={table.id} value={table.name}>{table.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="menuOption"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Choix du plat</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                                    <SelectValue placeholder="Sélectionner une option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                                  <SelectItem value="">Non choisi</SelectItem>
                                  {allMenuOptions.map(option => (
                                    <SelectItem key={option.id} value={option.id}>
                                      {option.name} ({option.menuName})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                className="bg-vip-gray-800 border-vip-gray-700 text-vip-white min-h-[100px]" 
                                placeholder="Allergies, préférences, restrictions alimentaires..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button 
                          type="button"
                          variant="outline" 
                          className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                          onClick={() => {
                            setIsAddDialogOpen(false);
                            setEditingGuest(null);
                          }}
                        >
                          Annuler
                        </Button>
                        <GoldButton type="submit">
                          {editingGuest ? 'Mettre à jour' : 'Ajouter'}
                        </GoldButton>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                onClick={exportToCsv}
              >
                <Download size={18} className="mr-2" /> Exporter
              </Button>
              
              <Button
                variant="outline"
                className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                onClick={sendEmails}
              >
                <Mail size={18} className="mr-2" /> Envoyer Email
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-vip-gray-800 border-vip-gray-700">
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-vip-white">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-vip-gold">{stats.total}</div>
                <div className="text-sm text-vip-gray-400">invités</div>
              </CardContent>
            </Card>
            <Card className="bg-vip-gray-800 border-vip-gray-700">
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-vip-white">Cérémonie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-vip-gold">{stats.ceremonie}</div>
                <div className="text-sm text-vip-gray-400">personnes</div>
              </CardContent>
            </Card>
            <Card className="bg-vip-gray-800 border-vip-gray-700">
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-vip-white">Vin d'honneur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-vip-gold">{stats.vin}</div>
                <div className="text-sm text-vip-gray-400">personnes</div>
              </CardContent>
            </Card>
            <Card className="bg-vip-gray-800 border-vip-gray-700">
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-vip-white">Repas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-vip-gold">{stats.repas}</div>
                <div className="text-sm text-vip-gray-400">personnes</div>
              </CardContent>
            </Card>
            <Card className="bg-vip-gray-800 border-vip-gray-700">
              <CardHeader className="py-3">
                <CardTitle className="text-lg text-vip-white">Brunch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-vip-gold">{stats.brunch}</div>
                <div className="text-sm text-vip-gray-400">personnes</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="bg-vip-gray-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
                  Tous
                </TabsTrigger>
                <TabsTrigger value="ceremonie" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
                  Cérémonie
                </TabsTrigger>
                <TabsTrigger value="vin" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
                  Vin d'honneur
                </TabsTrigger>
                <TabsTrigger value="repas" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
                  Repas
                </TabsTrigger>
                <TabsTrigger value="brunch" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
                  Brunch
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full sm:w-auto">
              <Input
                placeholder="Rechercher un invité..."
                className="bg-vip-gray-800 border-vip-gray-700 text-vip-white pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vip-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-vip-gray-800 hover:bg-transparent">
                  <TableHead className="text-vip-gray-400">Nom</TableHead>
                  <TableHead className="text-vip-gray-400">Contact</TableHead>
                  <TableHead className="text-vip-gray-400">Événements</TableHead>
                  <TableHead className="text-vip-gray-400">Personnes</TableHead>
                  <TableHead className="text-vip-gray-400">Table / Siège</TableHead>
                  <TableHead className="text-vip-gray-400">Menu</TableHead>
                  <TableHead className="text-vip-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.length > 0 ? (
                  filteredGuests.map((guest) => (
                    <TableRow key={guest.id} className="border-b border-vip-gray-800 hover:bg-vip-gray-800/50">
                      <TableCell className="font-medium text-vip-white">
                        {guest.prenom} {guest.nom}
                      </TableCell>
                      <TableCell className="text-vip-gray-400">
                        <div className="flex flex-col">
                          <span>{guest.email}</span>
                          <span>{guest.telephone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {guest.ceremonie && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Cérémonie
                            </span>
                          )}
                          {guest.vin && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Vin d'honneur
                            </span>
                          )}
                          {guest.repas && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Repas
                            </span>
                          )}
                          {guest.brunch && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Brunch
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-vip-white">
                        {1 + (guest.conjoint ? 1 : 0) + (guest.enfants || 0)}
                        {guest.conjoint && " (+ conjoint)"}
                        {guest.enfants > 0 && ` (+ ${guest.enfants} enfant${guest.enfants > 1 ? 's' : ''})`}
                      </TableCell>
                      <TableCell className="text-vip-white">
                        {guest.table ? (
                          <div>
                            <span className="font-medium">{guest.table}</span>
                            {guest.seat && <span className="ml-1 text-vip-gray-400">/ Siège {guest.seat}</span>}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-vip-white">
                        {guest.menuOption ? (
                          <div>
                            <div className="font-medium">
                              {allMenuOptions.find(o => o.id === guest.menuOption)?.name || "Option inconnue"}
                            </div>
                            <div className="text-xs text-vip-gray-400">
                              {allMenuOptions.find(o => o.id === guest.menuOption)?.menuName || "Menu standard"}
                            </div>
                          </div>
                        ) : (
                          guest.menuChoice === 'standard' ? 'Standard' :
                          guest.menuChoice === 'vegetarien' ? 'Végétarien' :
                          guest.menuChoice === 'enfant' ? 'Enfant' :
                          guest.menuChoice === 'allergies' ? 'Allergies' : 'Non choisi'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingGuest(guest);
                              setIsAddDialogOpen(true);
                            }}
                            className="h-8 text-vip-gray-400 hover:text-vip-white"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGuest(guest.id)}
                            className="h-8 text-vip-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-vip-gray-400">
                      Aucun invité trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
          <DialogHeader>
            <DialogTitle>{editingGuest ? 'Modifier un invité' : 'Ajouter un invité'}</DialogTitle>
            <DialogDescription className="text-vip-gray-400">
              {editingGuest 
                ? 'Modifiez les informations de votre invité' 
                : 'Ajoutez un nouvel invité à votre liste'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addGuest)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="ceremonie"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>Cérémonie</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>Vin d'honneur</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="repas"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>Repas</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brunch"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>Brunch</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="conjoint"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>Avec conjoint</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enfants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d'enfants</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="table"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table assignée</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                            <SelectValue placeholder="Choisir une table" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                          <SelectItem value="">Non assigné</SelectItem>
                          {tables.map(table => (
                            <SelectItem key={table.id} value={table.name}>{table.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="menuOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choix du plat</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                            <SelectValue placeholder="Sélectionner une option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                          <SelectItem value="">Non choisi</SelectItem>
                          {allMenuOptions.map(option => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name} ({option.menuName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="bg-vip-gray-800 border-vip-gray-700 text-vip-white min-h-[100px]" 
                        placeholder="Allergies, préférences, restrictions alimentaires..."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button"
                  variant="outline" 
                  className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingGuest(null);
                  }}
                >
                  Annuler
                </Button>
                <GoldButton type="submit">
                  {editingGuest ? 'Mettre à jour' : 'Ajouter'}
                </GoldButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestList;
