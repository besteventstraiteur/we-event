
// Types d'utilisateur du système
export enum UserRole {
  CLIENT = "client",
  PARTNER = "partner",
  ADMIN = "admin",
  GUEST = "guest",
  UNREGISTERED = "unregistered"
}

// Types de partenaires
export enum PartnerType {
  PHOTOGRAPHER = "photographer",
  DJ = "dj",
  CATERER = "caterer",
  VENUE = "venue",
  DECORATOR = "decorator",
  VIDEOGRAPHER = "videographer",
  ARTIST = "artist",
  FLORIST = "florist",
  WEDDING_PLANNER = "wedding_planner",
  GENERAL = "general",
}

// Permissions du système
export enum Permission {
  VIEW_DASHBOARD = "view_dashboard",
  MANAGE_GUESTS = "manage_guests",
  MANAGE_VENUES = "manage_venues",
  MANAGE_PARTNERS = "manage_partners",
  MANAGE_CLIENTS = "manage_clients",
  MANAGE_REQUESTS = "manage_requests",
  ACCESS_ADMIN = "access_admin",
}

// Type pour les utilisateurs avec contrôle d'accès
export interface AccessControlUser {
  id: string;
  role: UserRole;
  partnerType?: PartnerType;
  permissions?: Permission[];
  email?: string;
  name?: string;
}

// Fonctions auxiliaires pour le contrôle d'accès
export const hasPermission = (user: AccessControlUser | null, permission: Permission): boolean => {
  if (!user) return false;
  
  if (user.role === UserRole.ADMIN) return true;
  
  return !!user.permissions?.includes(permission);
};

// Alias for use in useAccessControl
export const userHasPermission = hasPermission;
