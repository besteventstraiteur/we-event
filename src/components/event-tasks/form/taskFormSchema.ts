
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

export const taskFormSchema = z.object({
  [TaskFormField.Title]: z.string().min(1, 'Le titre est requis'),
  [TaskFormField.Description]: z.string().optional(),
  [TaskFormField.AssignedTo]: z.enum(['couple', 'witness', 'both']),
  [TaskFormField.DueDate]: z.date().optional(),
  [TaskFormField.Priority]: z.enum(['low', 'medium', 'high']),
  [TaskFormField.Category]: z.enum(['venue', 'catering', 'decoration', 'attire', 'ceremony', 'reception', 'other'])
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

export const getDefaultValues = (initialTask?: any) => {
  return initialTask ? {
    [TaskFormField.Title]: initialTask.title,
    [TaskFormField.Description]: initialTask.description || '',
    [TaskFormField.AssignedTo]: initialTask.assignedTo,
    [TaskFormField.DueDate]: initialTask.dueDate ? new Date(initialTask.dueDate) : undefined,
    [TaskFormField.Priority]: initialTask.priority,
    [TaskFormField.Category]: initialTask.category
  } : {
    [TaskFormField.Title]: '',
    [TaskFormField.Description]: '',
    [TaskFormField.AssignedTo]: 'couple',
    [TaskFormField.Priority]: 'medium',
    [TaskFormField.Category]: 'other'
  };
};
