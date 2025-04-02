
import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  assignedTo: z.enum(['couple', 'witness', 'both']),
  dueDate: z.date().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.enum(['venue', 'catering', 'decoration', 'attire', 'ceremony', 'reception', 'other'])
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

export const getDefaultValues = (initialTask?: any) => {
  return initialTask ? {
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
  };
};
