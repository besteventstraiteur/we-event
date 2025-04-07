
import { toast } from "@/components/ui/use-toast";

/**
 * Définition des rôles d'utilisateur dans l'application
 */
export enum UserRole {
  CLIENT = "client",       // Mariés (utilisateurs principaux)
  GUEST = "guest",         // Invités
  PARTNER = "partner",     // Prestataires
  ADMIN = "admin",         // Administrateurs
  SUPER_ADMIN = "super_admin"  // Super administrateurs
}

/**
 * Types de partenaires
 */
export enum PartnerType {
  PHOTOGRAPHER = "photographer", // Photographe
  DJ = "dj",                   // DJ
  CATERER = "caterer",         // Traiteur
  VENUE = "venue",             // Lieu
  DECORATOR = "decorator",     // Décorateur
  VIDEOGRAPHER = "videographer", // Vidéaste
  ARTIST = "artist",           // Artiste
  FLORIST = "florist",         // Fleuriste
  WEDDING_PLANNER = "wedding_planner", // Wedding Planner
  GENERAL = "general",         // Partenaire général
}

/**
 * Définition des permissions dans l'application
 */
export enum Permission {
  // Permissions générales
  READ_OWN_PROFILE = "read:own_profile",
  UPDATE_OWN_PROFILE = "update:own_profile",
  
  // Permissions client (mariés)
  MANAGE_GUESTS = "manage:guests",
  MANAGE_BUDGET = "manage:budget", 
  MANAGE_TASKS = "manage:tasks",
  MANAGE_PARTNERS = "manage:partners",
  MANAGE_PAYMENTS = "manage:payments",
  MANAGE_MINI_SITE = "manage:mini_site",
  
  // Permissions invités
  RSVP = "submit:rsvp",
  SELECT_MENU = "select:menu",
  VIEW_EVENT_DETAILS = "view:event_details",
  
  // Permissions prestataires
  MANAGE_SERVICES = "manage:services",
  MANAGE_CALENDAR = "manage:calendar",
  MANAGE_PORTFOLIO = "manage:portfolio",
  MANAGE_PHOTOS = "manage:photos", // Photos (photographes)
  MANAGE_PLAYLISTS = "manage:playlists", // Playlists (DJs)
  MANAGE_MENUS = "manage:menus", // Menus (traiteurs)
  
  // Permissions admin
  MANAGE_USERS = "manage:users",
  MANAGE_ALL_EVENTS = "manage:all_events",
  MANAGE_SYSTEM = "manage:system",
  
  // Permissions super admin
  MANAGE_ADMINS = "manage:admins",
  SYSTEM_CONFIGURATION = "configure:system"
}

// Définir les permissions par défaut pour chaque rôle
const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.CLIENT]: [
    Permission.READ_OWN_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.MANAGE_GUESTS,
    Permission.MANAGE_BUDGET,
    Permission.MANAGE_TASKS,
    Permission.MANAGE_PARTNERS,
    Permission.MANAGE_PAYMENTS,
    Permission.MANAGE_MINI_SITE
  ],
  [UserRole.GUEST]: [
    Permission.READ_OWN_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.RSVP,
    Permission.SELECT_MENU,
    Permission.VIEW_EVENT_DETAILS
  ],
  [UserRole.PARTNER]: [
    Permission.READ_OWN_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [UserRole.ADMIN]: [
    Permission.READ_OWN_PROFILE,
    Permission.UPDATE_OWN_PROFILE,
    Permission.MANAGE_USERS,
    Permission.MANAGE_ALL_EVENTS,
    Permission.MANAGE_SYSTEM
  ],
  [UserRole.SUPER_ADMIN]: [
    // Super admin a toutes les permissions
    ...Object.values(Permission)
  ]
};

// Définir les permissions spécifiques par type de partenaire
const PartnerTypePermissions: Record<PartnerType, Permission[]> = {
  [PartnerType.PHOTOGRAPHER]: [
    Permission.MANAGE_PHOTOS,
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.DJ]: [
    Permission.MANAGE_PLAYLISTS,
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.CATERER]: [
    Permission.MANAGE_MENUS,
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.VENUE]: [
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.DECORATOR]: [
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.VIDEOGRAPHER]: [
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.ARTIST]: [
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.FLORIST]: [
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.WEDDING_PLANNER]: [
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
  [PartnerType.GENERAL]: [
    Permission.MANAGE_PHOTOS,
    Permission.MANAGE_PLAYLISTS,
    Permission.MANAGE_MENUS,
    Permission.MANAGE_SERVICES,
    Permission.MANAGE_CALENDAR,
    Permission.MANAGE_PORTFOLIO
  ],
};

/**
 * Vérifie si un rôle a une permission spécifique
 * @param role Rôle de l'utilisateur
 * @param permission Permission à vérifier
 * @returns Booléen indiquant si le rôle a la permission
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  if (role === UserRole.SUPER_ADMIN) return true; // Super admin a toujours toutes les permissions
  return RolePermissions[role]?.includes(permission) || false;
};

// Interface pour l'utilisateur avec informations d'accès
export interface AccessControlUser {
  id: string;
  role: UserRole;
  partnerType?: PartnerType; // Type de partenaire (uniquement pour les partenaires)
  customPermissions?: Permission[];
  eventId?: string; // Pour lier un utilisateur à un événement spécifique
}

/**
 * Vérifie si un utilisateur a une permission spécifique
 * @param user Utilisateur à vérifier
 * @param permission Permission requise
 * @param resourceOwnerId ID du propriétaire de la ressource (pour vérifier si c'est sa propre ressource)
 * @returns Booléen indiquant si l'utilisateur a la permission
 */
export const userHasPermission = (
  user: AccessControlUser,
  permission: Permission,
  resourceOwnerId?: string
): boolean => {
  // Super admin a toujours accès
  if (user.role === UserRole.SUPER_ADMIN) return true;
  
  // Vérifier les permissions personnalisées si elles existent
  if (user.customPermissions?.includes(permission)) return true;
  
  // Vérifier les permissions basées sur le rôle
  const hasRolePermission = hasPermission(user.role, permission);

  // Vérifier les permissions basées sur le type de partenaire
  let hasPartnerTypePermission = false;
  if (user.role === UserRole.PARTNER && user.partnerType) {
    hasPartnerTypePermission = PartnerTypePermissions[user.partnerType]?.includes(permission) || false;
  }
  
  // Si c'est une opération sur sa propre ressource, vérifier avec l'ID
  if (resourceOwnerId && resourceOwnerId === user.id) {
    return true;
  }
  
  return hasRolePermission || hasPartnerTypePermission;
};

/**
 * Vérifie l'accès et génère une erreur si l'accès est refusé
 * @param user Utilisateur à vérifier
 * @param permission Permission requise
 * @param resourceOwnerId ID du propriétaire de la ressource (optionnel)
 * @returns Booléen indiquant si l'accès est autorisé
 * @throws Error si l'accès est refusé
 */
export const checkAccess = (
  user: AccessControlUser,
  permission: Permission,
  resourceOwnerId?: string
): boolean => {
  if (!user) {
    toast({
      variant: "destructive",
      title: "Accès refusé",
      description: "Vous devez être connecté pour accéder à cette ressource",
    });
    throw new Error("Utilisateur non authentifié");
  }
  
  const hasAccess = userHasPermission(user, permission, resourceOwnerId);
  
  if (!hasAccess) {
    toast({
      variant: "destructive",
      title: "Accès refusé",
      description: "Vous n'avez pas les permissions nécessaires pour cette action",
    });
    throw new Error(`Accès refusé: ${permission} requis`);
  }
  
  return true;
};

/**
 * Créer un middleware de contrôle d'accès pour les fonctions
 * @param requiredPermission Permission requise
 * @returns Fonction wrapper pour vérifier l'accès
 */
export const withAccessControl = (requiredPermission: Permission) => {
  return function<T extends (...args: any[]) => any>(
    targetFunction: T,
    context: {user: AccessControlUser, resourceOwnerId?: string}
  ): ReturnType<T> {
    checkAccess(context.user, requiredPermission, context.resourceOwnerId);
    return targetFunction();
  };
};
