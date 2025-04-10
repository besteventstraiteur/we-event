
export enum UserRole {
  CLIENT = "client",
  PARTNER = "partner",
  ADMIN = "admin",
  GUEST = "guest"
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
