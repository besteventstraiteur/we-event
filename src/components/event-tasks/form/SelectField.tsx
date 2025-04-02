
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { TaskFormValues } from './taskFormSchema';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  form: UseFormReturn<TaskFormValues>;
  name: 'assignedTo' | 'priority' | 'category';
  label: string;
  options: SelectOption[];
  placeholder: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  form, 
  name, 
  label, 
  options, 
  placeholder 
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(option => (
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
  );
};

export default SelectField;
