
export enum UserRole {
  CLIENT = "client",
  PARTNER = "partner",
  ADMIN = "admin",
  GUEST = "guest",
  UNREGISTERED = "unregistered"
}

export enum PartnerType {
  VENUE = "venue",
  CATERER = "caterer",
  PHOTOGRAPHER = "photographer",
  DJ = "dj",
  FLORIST = "florist",
  DECORATOR = "decorator",
  BEAUTY = "beauty",
  TRANSPORT = "transport",
  ENTERTAINMENT = "entertainment",
  GENERAL = "general"
}

export enum GuestType {
  STANDARD = "standard",
  VIP = "vip",
  FAMILY = "family",
  VENDOR = "vendor"
}

export enum Permission {
  VIEW_DASHBOARD = "view_dashboard",
  MANAGE_GUESTS = "manage_guests",
  MANAGE_EVENTS = "manage_events",
  MANAGE_VENUES = "manage_venues",
  MANAGE_REQUESTS = "manage_requests",
  MANAGE_CLIENTS = "manage_clients",
  MANAGE_PARTNERS = "manage_partners",
  MANAGE_ADMINS = "manage_admins",
  ACCESS_ADVANCED_SECURITY = "access_advanced_security",
  MANAGE_SYSTEM = "manage_system"
}

export interface AccessControlUser {
  id: string;
  role: UserRole;
  permissions?: Permission[];
  email?: string;
  name?: string;
  partnerType?: PartnerType;
}

// Access control utilities
export const canAccessPartnerFeature = (userRole: UserRole | undefined): boolean => {
  return userRole === UserRole.PARTNER || userRole === UserRole.ADMIN;
};

export const canAccessAdminFeature = (userRole: UserRole | undefined): boolean => {
  return userRole === UserRole.ADMIN;
};

export const canAccessClientFeature = (userRole: UserRole | undefined): boolean => {
  return userRole === UserRole.CLIENT || userRole === UserRole.ADMIN;
};

export const canManageVenues = (
  userRole: UserRole | undefined,
  partnerType?: PartnerType
): boolean => {
  if (userRole === UserRole.ADMIN) return true;
  if (userRole === UserRole.PARTNER && partnerType === PartnerType.VENUE) return true;
  return false;
};

export const canEditGuestSettings = (
  userRole: UserRole | undefined,
  isEventCreator = false
): boolean => {
  if (userRole === UserRole.ADMIN) return true;
  if (userRole === UserRole.CLIENT && isEventCreator) return true;
  return false;
};

// Helper function to check if a user has a specific permission
export const hasPermission = (
  user: AccessControlUser | null, 
  permission: Permission,
  resourceOwnerId?: string
): boolean => {
  if (!user) return false;
  
  // Admin has all permissions
  if (user.role === UserRole.ADMIN) return true;
  
  // Check if the user owns the resource
  if (resourceOwnerId && user.id === resourceOwnerId) return true;
  
  // Check if the permission is in the user's permissions array
  return user.permissions ? user.permissions.includes(permission) : false;
};
