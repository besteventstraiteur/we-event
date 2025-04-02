
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown, Loader2, Send, UserPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  clientName: z.string().min(2, { message: "Le nom du client est requis" }),
  clientEmail: z.string().email({ message: "Email invalide" }),
  clientPhone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  eventDate: z.date({ required_error: "Une date est requise" }),
  budget: z.string().min(1, { message: "Le budget est requis" }),
  details: z.string().min(10, { message: "Plus de détails sont requis" }),
  partners: z.array(z.string()).min(1, { message: "Sélectionnez au moins un prestataire" }),
});

const categories = [
  { label: "DJ", value: "dj", partners: [
    { id: "dj1", name: "DJ Mix Master" },
    { id: "dj2", name: "Harmony Musique" },
    { id: "dj3", name: "Electro Events" },
  ]},
  { label: "Traiteurs", value: "caterers", partners: [
    { id: "cat1", name: "Pâtisserie Royale" },
    { id: "cat2", name: "Gastronomie Délice" },
    { id: "cat3", name: "Saveurs Exquises" },
  ]},
  { label: "Photographes", value: "photographers", partners: [
    { id: "photo1", name: "Studio Photo Elite" },
    { id: "photo2", name: "Moments Immortels" },
    { id: "photo3", name: "Captures Élégantes" },
  ]},
  { label: "Fleuristes", value: "florists", partners: [
    { id: "fleur1", name: "Fleurs Élégance" },
    { id: "fleur2", name: "Bouquets Enchantés" },
    { id: "fleur3", name: "Nature Poétique" },
  ]},
  { label: "Domaines", value: "venues", partners: [
    { id: "venue1", name: "Domaine du Château" },
    { id: "venue2", name: "Château des Lumières" },
    { id: "venue3", name: "Manoir de Prestige" },
  ]},
  { label: "Décorateurs", value: "decorators", partners: [
    { id: "deco1", name: "Décor de Rêve" },
    { id: "deco2", name: "Ambiances Magiques" },
    { id: "deco3", name: "Design Événementiel" },
  ]},
];

const RecommendationForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      budget: "",
      details: "",
      partners: [],
    },
  });

  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
    const partners = categories.find(c => c.value === category)?.partners || [];
    
    if (selectAll) {
      const partnerIds = partners.map(p => p.id);
      setSelectedPartners(partnerIds);
      form.setValue("partners", partnerIds);
    } else {
      setSelectedPartners([]);
      form.setValue("partners", []);
    }
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (selectedCategory) {
      const partners = categories.find(c => c.value === selectedCategory)?.partners || [];
      if (newSelectAll) {
        const partnerIds = partners.map(p => p.id);
        setSelectedPartners(partnerIds);
        form.setValue("partners", partnerIds);
      } else {
        setSelectedPartners([]);
        form.setValue("partners", []);
      }
    }
  };

  const togglePartner = (partnerId: string) => {
    const isSelected = selectedPartners.includes(partnerId);
    let newSelectedPartners;
    
    if (isSelected) {
      newSelectedPartners = selectedPartners.filter(id => id !== partnerId);
    } else {
      newSelectedPartners = [...selectedPartners, partnerId];
    }
    
    setSelectedPartners(newSelectedPartners);
    form.setValue("partners", newSelectedPartners);
    
    const categoryPartners = categories.find(c => c.value === selectedCategory)?.partners || [];
    setSelectAll(newSelectedPartners.length === categoryPartners.length);
  };

  const getPartnerName = (partnerId: string) => {
    for (const category of categories) {
      const partner = category.partners.find(p => p.id === partnerId);
      if (partner) return partner.name;
    }
    return partnerId;
  };

  const removePartner = (partnerId: string) => {
    const newSelectedPartners = selectedPartners.filter(id => id !== partnerId);
    setSelectedPartners(newSelectedPartners);
    form.setValue("partners", newSelectedPartners);
    setSelectAll(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simuler l'envoi des données à l'API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Recommandation envoyée:", {
        ...values,
        partnerNames: values.partners.map(getPartnerName)
      });
      
      toast({
        title: "Recommandation envoyée",
        description: `La recommandation a été envoyée à ${values.partners.length} prestataire(s)`,
      });
      
      // Réinitialiser le formulaire
      form.reset();
      setSelectedCategory(null);
      setSelectedPartners([]);
      setSelectAll(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de la recommandation",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Informations client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du client</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom et prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="06 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de l'événement</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input placeholder="500 €" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Détails de la demande</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez les détails de la demande..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Prestataires</h2>
          
          <FormField
            control={form.control}
            name="partners"
            render={() => (
              <FormItem className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Catégorie de prestataires</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {selectedCategory
                            ? categories.find((category) => category.value === selectedCategory)?.label
                            : "Sélectionner une catégorie"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Rechercher une catégorie..." />
                          <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.value}
                                value={category.value}
                                onSelect={() => onSelectCategory(category.value)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCategory === category.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {selectedCategory && (
                    <div>
                      <div className="flex items-center justify-between">
                        <FormLabel>Prestataires</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={toggleSelectAll}
                          className="text-xs h-8"
                        >
                          {selectAll ? "Désélectionner tout" : "Sélectionner tout"}
                        </Button>
                      </div>
                      <div className="border rounded-md p-3 mt-1.5 h-[180px] overflow-y-auto">
                        {categories
                          .find(c => c.value === selectedCategory)
                          ?.partners.map(partner => (
                            <div key={partner.id} className="flex items-center space-x-2 py-1">
                              <input
                                type="checkbox"
                                id={partner.id}
                                checked={selectedPartners.includes(partner.id)}
                                onChange={() => togglePartner(partner.id)}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <label htmlFor={partner.id} className="text-sm flex-1 cursor-pointer">
                                {partner.name}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Prestataires sélectionnés</div>
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                    {selectedPartners.length === 0 ? (
                      <div className="text-sm text-gray-500 flex items-center">
                        <UserPlus size={14} className="mr-1" /> Sélectionnez des prestataires
                      </div>
                    ) : (
                      selectedPartners.map(partnerId => (
                        <Badge key={partnerId} variant="secondary" className="flex items-center gap-1">
                          {getPartnerName(partnerId)}
                          <button
                            type="button"
                            onClick={() => removePartner(partnerId)}
                            className="hover:text-red-500 focus:outline-none"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer la recommandation
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RecommendationForm;
