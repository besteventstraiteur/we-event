import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { EventTask } from '@/hooks/useEventTasks';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TaskFormProps {
  initialTask?: EventTask;
  onSave: (task: Omit<EventTask, 'id' | 'completed'>) => void;
  onCancel: () => void;
}

const taskFormSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  assignedTo: z.enum(['couple', 'witness', 'both']),
  dueDate: z.date().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['venue', 'catering', 'decoration', 'attire', 'ceremony', 'reception', 'other'])
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSave, onCancel }) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialTask ? {
      title: initialTask.title,
      description: initialTask.description || '',
      assignedTo: initialTask.assignedTo,
      dueDate: initialTask.dueDate ? new Date(initialTask.dueDate) : undefined,
      priority: initialTask.priority,
      category: initialTask.category
    } : {
      title: '',
      description: '',
      assignedTo: 'couple',
      priority: 'medium',
      category: 'other'
    }
  });

  const onSubmit = (values: TaskFormValues) => {
    const taskData: Omit<EventTask, 'id' | 'completed'> = {
      title: values.title,
      description: values.description,
      assignedTo: values.assignedTo,
      dueDate: values.dueDate,
      priority: values.priority,
      category: values.category
    };
    
    onSave(taskData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre de la tâche" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description détaillée de la tâche (optionnel)" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignée à</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'assigné" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="couple">Mariés</SelectItem>
                    <SelectItem value="witness">Témoins</SelectItem>
                    <SelectItem value="both">Les deux</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priorité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la priorité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="venue">Lieu</SelectItem>
                    <SelectItem value="catering">Traiteur</SelectItem>
                    <SelectItem value="decoration">Décoration</SelectItem>
                    <SelectItem value="attire">Tenues</SelectItem>
                    <SelectItem value="ceremony">Cérémonie</SelectItem>
                    <SelectItem value="reception">Réception</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date limite</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value ? 'text-muted-foreground' : ''
                        }`}
                      >
                        {field.value ? (
                          format(field.value, 'dd MMMM yyyy', { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
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

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="bg-vip-gold hover:bg-vip-gold/90 text-vip-black">
            {initialTask ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
