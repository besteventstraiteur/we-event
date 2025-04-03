
/**
 * Types de visioconférence supportés
 */
export type ConferenceProvider = 'zoom' | 'google-meet' | 'custom';

/**
 * Niveaux d'accès pour les visioconférences
 */
export type AccessLevel = 'public' | 'private' | 'password-protected';

/**
 * Types d'utilisateurs participant à une visioconférence
 */
export type ParticipantRole = 'host' | 'co-host' | 'attendee' | 'viewer';

/**
 * Représente un participant à une visioconférence
 */
export interface Participant {
  id: string;
  name: string;
  email: string;
  role: ParticipantRole;
  invitationSent: boolean;
  joined?: boolean;
  joinedAt?: Date;
}

/**
 * Représente une visioconférence dans le système
 */
export interface VideoConference {
  /** Identifiant unique de la visioconférence */
  id: string;
  /** Titre de la visioconférence */
  title: string;
  /** Description de la visioconférence */
  description: string;
  /** Date et heure de début au format ISO */
  startTime: string;
  /** Durée prévue en minutes */
  duration: number;
  /** Service de visioconférence utilisé */
  provider: ConferenceProvider;
  /** URL de la visioconférence */
  conferenceUrl: string;
  /** Code d'accès si nécessaire */
  accessCode?: string;
  /** Niveau d'accès */
  accessLevel: AccessLevel;
  /** ID du créateur de la visioconférence */
  hostId: string;
  /** Nom du créateur */
  hostName: string;
  /** Email du créateur */
  hostEmail: string;
  /** Liste des participants */
  participants: Participant[];
  /** ID associé (talkshow, événement, etc.) */
  relatedId?: string;
  /** Type d'entité associée */
  relatedType?: 'talkshow' | 'event' | 'meeting';
  /** Lien vers l'enregistrement si disponible */
  recordingUrl?: string;
  /** Statut de la visioconférence */
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  /** Date de création */
  createdAt: string;
  /** Dernière modification */
  updatedAt: string;
}

/**
 * Données pour créer une nouvelle visioconférence
 */
export interface NewVideoConference {
  title: string;
  description: string;
  startTime: string;
  duration: number;
  provider: ConferenceProvider;
  accessLevel: AccessLevel;
  accessCode?: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  participants: Omit<Participant, 'joined' | 'joinedAt'>[];
  relatedId?: string;
  relatedType?: 'talkshow' | 'event' | 'meeting';
}
