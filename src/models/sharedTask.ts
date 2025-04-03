
/**
 * Types d'utilisateurs qui peuvent partager/recevoir des tâches
 */
export type UserType = 'client' | 'partner' | 'witness' | 'family' | 'friend' | 'vendor';

/**
 * Niveaux de permission pour les tâches partagées
 */
export type PermissionLevel = 'view' | 'edit' | 'manage';

/**
 * Représente un utilisateur avec qui une tâche est partagée
 */
export interface TaskSharing {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: UserType;
  permission: PermissionLevel;
  sharedAt: string; // Date ISO au format string
  notified: boolean;
  accepted: boolean;
  acceptedAt?: string; // Date ISO au format string
}

/**
 * Paramètres pour créer un nouveau partage
 */
export interface NewSharingParams {
  userId: string;
  userName: string;
  userEmail: string;
  userType: UserType;
  permission: PermissionLevel;
}
