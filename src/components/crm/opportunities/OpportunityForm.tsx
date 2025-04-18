
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Save } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { type Opportunity } from "./OpportunityFormDialog";

interface OpportunityFormProps {
  opportunity?: Opportunity;
  onSave: (opportunity: Omit<Opportunity, "id">) => void;
  onCancel: () => void;
}

const opportunityFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  company: z.string().min(1, "Le nom de l'entreprise est requis"),
  value: z.coerce.number().positive("Le montant doit être positif"),
  stage: z.enum(["new", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"]),
  source: z.string().min(1, "La source est requise"),
  nextStep: z.string().min(1, "La prochaine étape est requise"),
  expectedCloseDate: z.date()
});

type OpportunityFormValues = z.infer<typeof opportunityFormSchema>;

const OpportunityForm: React.FC<OpportunityFormProps> = ({
  opportunity,
  onSave,
  onCancel
}) => {
  const isEditing = !!opportunity;

  const defaultValues: OpportunityFormValues = {
    name: opportunity?.name || "",
    company: opportunity?.company || "",
    value: opportunity?.value || 0,
    stage: opportunity?.stage || "new",
    source: opportunity?.source || "",
    nextStep: opportunity?.nextStep || "",
    expectedCloseDate: opportunity 
      ? new Date(opportunity.expectedCloseDate.split('/').reverse().join('-')) 
      : new Date()
  };

  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues
  });

  const onSubmit = (data: OpportunityFormValues) => {
    const formattedOpportunity: Omit<Opportunity, "id"> = {
      name: data.name,
      company: data.company,
      value: data.value,
      stage: data.stage,
      source: data.source,
      nextStep: data.nextStep,
      expectedCloseDate: format(data.expectedCloseDate, "dd/MM/yyyy")
    };
    onSave(formattedOpportunity);
  };

  const stageOptions = [
    { label: "Nouveau", value: "new" },
    { label: "Qualifié", value: "qualified" },
    { label: "Proposition", value: "proposal" },
    { label: "Négociation", value: "negotiation" },
    { label: "Gagné", value: "closed_won" },
    { label: "Perdu", value: "closed_lost" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'opportunité</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Projet de mariage Premium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entreprise/Client</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'entreprise ou du client" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Étape</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une étape" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Salon du mariage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextStep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prochaine étape</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Rendez-vous de présentation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedCloseDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de clôture prévue</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
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
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="gap-1">
            <Save className="h-4 w-4" />
            {isEditing ? "Mettre à jour" : "Créer l'opportunité"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OpportunityForm;
