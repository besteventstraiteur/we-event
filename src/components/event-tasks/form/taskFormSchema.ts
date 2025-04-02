
import { z } from 'zod';

// Create an enum for the form field names
export enum TaskFormField {
  Title = 'title',
  Description = 'description',
  AssignedTo = 'assignedTo',
  DueDate = 'dueDate',
  Priority = 'priority',
  Category = 'category'
}

export type AssigneeType = 'couple' | 'witness' | 'both';
export type PriorityType = 'low' | 'medium' | 'high';
export type CategoryType = 'venue' | 'catering' | 'decoration' | 'attire' | 'ceremony' | 'reception' | 'other';

export const taskFormSchema = z.object({
  [TaskFormField.Title]: z.string().min(1, 'Le titre est requis'),
  [TaskFormField.Description]: z.string().optional(),
  [TaskFormField.AssignedTo]: z.enum(['couple', 'witness', 'both']),
  [TaskFormField.DueDate]: z.date().optional(),
  [TaskFormField.Priority]: z.enum(['low', 'medium', 'high']),
  [TaskFormField.Category]: z.enum(['venue', 'catering', 'decoration', 'attire', 'ceremony', 'reception', 'other'])
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskData {
  title?: string;
  description?: string;
  assignedTo?: AssigneeType;
  dueDate?: Date | string;
  priority?: PriorityType;
  category?: CategoryType;
}

export const getDefaultValues = (initialTask?: TaskData): TaskFormValues => {
  if (initialTask) {
    return {
      [TaskFormField.Title]: initialTask.title || '',
      [TaskFormField.Description]: initialTask.description || '',
      [TaskFormField.AssignedTo]: (initialTask.assignedTo as AssigneeType) || 'couple',
      [TaskFormField.DueDate]: initialTask.dueDate ? new Date(initialTask.dueDate) : undefined,
      [TaskFormField.Priority]: (initialTask.priority as PriorityType) || 'medium',
      [TaskFormField.Category]: (initialTask.category as CategoryType) || 'other'
    };
  }
  
  return {
    [TaskFormField.Title]: '',
    [TaskFormField.Description]: '',
    [TaskFormField.AssignedTo]: 'couple' as AssigneeType,
    [TaskFormField.DueDate]: undefined,
    [TaskFormField.Priority]: 'medium' as PriorityType,
    [TaskFormField.Category]: 'other' as CategoryType
  };
};
