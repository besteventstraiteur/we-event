
import { VideoConference, NewVideoConference, ConferenceProvider } from "@/models/videoConference";
import { PodcastError } from "@/utils/errorHandling";
import { v4 as uuidv4 } from "uuid";

/**
 * Service pour la gestion des visioconférences
 */
export class VideoConferenceService {
  private static instance: VideoConferenceService;
  private conferences: VideoConference[] = [];

  private constructor() {
    // Initialisation avec des conférences de démonstration
    this.conferences = [
      {
        id: "conf-001",
        title: "Préparation du Jour J: Conseils et Astuces",
        description: "Discussion en direct avec des experts pour vous aider à préparer votre mariage.",
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 60,
        provider: "zoom",
        conferenceUrl: "https://zoom.us/j/1234567890",
        accessCode: "123456",
        accessLevel: "password-protected",
        hostId: "host-001",
        hostName: "Marie Dupont",
        hostEmail: "marie.dupont@example.com",
        participants: [
          {
            id: "part-001",
            name: "Jean Martin",
            email: "jean.martin@example.com",
            role: "co-host",
            invitationSent: true,
            joined: false
          },
          {
            id: "part-002",
            name: "Sophie Bernard",
            email: "sophie.bernard@example.com",
            role: "attendee",
            invitationSent: true,
            joined: false
          }
        ],
        relatedId: "talkshow-001",
        relatedType: "talkshow",
        status: "scheduled",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  /**
   * Obtient l'instance unique du service (Singleton)
   */
  public static getInstance(): VideoConferenceService {
    if (!VideoConferenceService.instance) {
      VideoConferenceService.instance = new VideoConferenceService();
    }
    return VideoConferenceService.instance;
  }

  /**
   * Récupère toutes les visioconférences
   */
  public getAllConferences(): VideoConference[] {
    return [...this.conferences];
  }

  /**
   * Récupère une visioconférence par son ID
   */
  public getConferenceById(id: string): VideoConference {
    const conference = this.conferences.find(c => c.id === id);
    if (!conference) {
      throw new PodcastError(`Visioconférence avec l'ID ${id} non trouvée`, 'NOT_FOUND');
    }
    return { ...conference };
  }

  /**
   * Récupère les visioconférences liées à une entité spécifique
   */
  public getConferencesByRelatedId(relatedId: string): VideoConference[] {
    return this.conferences
      .filter(c => c.relatedId === relatedId)
      .map(c => ({ ...c }));
  }

  /**
   * Génère une URL de conférence basée sur le fournisseur
   */
  private generateConferenceUrl(provider: ConferenceProvider): string {
    switch (provider) {
      case 'zoom':
        return `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      case 'google-meet':
        return `https://meet.google.com/${this.generateRandomCode(3)}-${this.generateRandomCode(4)}-${this.generateRandomCode(3)}`;
      case 'custom':
        return '';
      default:
        return '';
    }
  }

  /**
   * Génère un code aléatoire pour les URLs et mots de passe
   */
  private generateRandomCode(length: number): string {
    const charset = 'abcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Crée une nouvelle visioconférence
   */
  public createConference(newConference: NewVideoConference): VideoConference {
    try {
      const conferenceUrl = this.generateConferenceUrl(newConference.provider);
      
      // Générer un ID unique
      const id = `conf-${uuidv4().slice(0, 8)}`;
      
      // Créer la nouvelle conférence
      const conference: VideoConference = {
        id,
        title: newConference.title,
        description: newConference.description,
        startTime: newConference.startTime,
        duration: newConference.duration,
        provider: newConference.provider,
        conferenceUrl,
        accessCode: newConference.accessCode || (newConference.accessLevel === 'password-protected' ? this.generateRandomCode(6) : undefined),
        accessLevel: newConference.accessLevel,
        hostId: newConference.hostId,
        hostName: newConference.hostName,
        hostEmail: newConference.hostEmail,
        participants: newConference.participants.map(p => ({
          ...p,
          invitationSent: false,
          joined: false
        })),
        relatedId: newConference.relatedId,
        relatedType: newConference.relatedType,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Ajouter à la liste des conférences
      this.conferences.push(conference);
      
      return { ...conference };
    } catch (error) {
      if (error instanceof PodcastError) {
        throw error;
      }
      throw new PodcastError("Erreur lors de la création de la visioconférence", 'CREATE_ERROR');
    }
  }

  /**
   * Met à jour une visioconférence existante
   */
  public updateConference(id: string, updates: Partial<VideoConference>): VideoConference {
    const index = this.conferences.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new PodcastError(`Visioconférence avec l'ID ${id} non trouvée`, 'NOT_FOUND');
    }
    
    const conference = this.conferences[index];
    
    // Mettre à jour les champs modifiables
    const updatedConference: VideoConference = {
      ...conference,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Remplacer la conférence dans la liste
    this.conferences[index] = updatedConference;
    
    return { ...updatedConference };
  }

  /**
   * Envoie des invitations aux participants
   */
  public sendInvitations(conferenceId: string): boolean {
    const conference = this.getConferenceById(conferenceId);
    
    // Simuler l'envoi d'invitations
    const updatedParticipants = conference.participants.map(p => ({
      ...p,
      invitationSent: true
    }));
    
    this.updateConference(conferenceId, { participants: updatedParticipants });
    
    return true;
  }

  /**
   * Change le statut d'une visioconférence
   */
  public updateStatus(
    conferenceId: string, 
    status: 'scheduled' | 'live' | 'ended' | 'cancelled'
  ): VideoConference {
    return this.updateConference(conferenceId, { status });
  }

  /**
   * Supprime une visioconférence
   */
  public deleteConference(id: string): boolean {
    const index = this.conferences.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new PodcastError(`Visioconférence avec l'ID ${id} non trouvée`, 'NOT_FOUND');
    }
    
    this.conferences.splice(index, 1);
    
    return true;
  }

  /**
   * Rejoindre une visioconférence (simule l'authentification et l'accès)
   */
  public joinConference(
    conferenceId: string, 
    participantId: string, 
    accessCode?: string
  ): { success: boolean; url?: string; message?: string } {
    try {
      const conference = this.getConferenceById(conferenceId);
      
      // Vérifier si la conférence a lieu
      if (conference.status !== 'scheduled' && conference.status !== 'live') {
        return { 
          success: false, 
          message: 'Cette visioconférence n\'est pas disponible actuellement.' 
        };
      }
      
      // Vérifier l'accès protégé par mot de passe
      if (conference.accessLevel === 'password-protected' && conference.accessCode !== accessCode) {
        return { 
          success: false, 
          message: 'Code d\'accès incorrect.' 
        };
      }
      
      // Vérifier si le participant est autorisé (pour les conférences privées)
      if (conference.accessLevel === 'private') {
        const isAuthorizedParticipant = conference.participants.some(p => p.id === participantId);
        const isHost = conference.hostId === participantId;
        
        if (!isAuthorizedParticipant && !isHost) {
          return { 
            success: false, 
            message: 'Vous n\'êtes pas autorisé à rejoindre cette visioconférence.' 
          };
        }
      }
      
      // Mettre à jour le statut du participant
      const participantIndex = conference.participants.findIndex(p => p.id === participantId);
      
      if (participantIndex >= 0) {
        const updatedParticipants = [...conference.participants];
        updatedParticipants[participantIndex] = {
          ...updatedParticipants[participantIndex],
          joined: true,
          joinedAt: new Date()
        };
        
        this.updateConference(conferenceId, { participants: updatedParticipants });
      }
      
      // Si la conférence est programmée, la passer en direct
      if (conference.status === 'scheduled') {
        this.updateStatus(conferenceId, 'live');
      }
      
      return { 
        success: true, 
        url: conference.conferenceUrl 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Erreur lors de la tentative de connexion à la visioconférence.' 
      };
    }
  }
}
