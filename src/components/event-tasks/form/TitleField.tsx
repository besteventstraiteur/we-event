
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from './taskFormSchema';

interface TitleFieldProps {
  form: UseFormReturn<TaskFormValues>;
}

const TitleField: React.FC<TitleFieldProps> = ({ form }) => {
  return (
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
  );
};

export default TitleField;
