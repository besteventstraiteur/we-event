
/**
 * Types de rappels pour les tâches
 */
export type ReminderType = 'push' | 'email' | 'sms';

/**
 * Définit quand un rappel doit être envoyé
 */
export type ReminderFrequency = 
  | 'once' // Une seule fois à la date spécifiée
  | 'daily' // Tous les jours jusqu'à la date d'échéance
  | 'weekly' // Chaque semaine jusqu'à la date d'échéance
  | 'custom'; // Intervalle personnalisé

/**
 * Représente un rappel pour une tâche
 */
export interface TaskReminder {
  id: string;
  taskId: string;
  type: ReminderType;
  message?: string;
  date: string; // Date ISO au format string
  frequency: ReminderFrequency;
  enabled: boolean;
  sent: boolean;
  sentAt?: string; // Date ISO au format string
  recipients?: string[]; // Liste des destinataires (emails, téléphones, etc.)
}

/**
 * Paramètres pour créer un nouveau rappel
 */
export interface NewReminderParams {
  type: ReminderType;
  message?: string;
  date: Date | string;
  frequency: ReminderFrequency;
  recipients?: string[];
}
