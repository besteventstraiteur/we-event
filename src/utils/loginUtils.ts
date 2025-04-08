
import { UserRole, Permission } from "@/utils/accessControl";
import { toast } from "@/hooks/use-toast";

export interface AuthDebugInfo {
  email?: string;
  userType?: string;
  redirectPath?: string;
  redirectAttempted?: boolean;
}

export const prepareUserData = (userEmail: string = '') => {
  const email = userEmail || localStorage.getItem('weddingPlannerEmail') || '';
  
  const userType = email.includes("admin") ? "admin" : 
                  email.includes("partner") ? "partner" : 
                  email.includes("client") ? "client" : "unknown";

  if (email.includes("admin")) {
    return {
      id: 'admin-1',
      role: UserRole.ADMIN,
      permissions: Object.values(Permission),
      email: email,
      name: 'Admin Test'
    };
  } else if (email.includes("partner")) {
    let partnerType = "general";
    
    if (email.includes("photo")) partnerType = "photographer";
    else if (email.includes("dj")) partnerType = "dj";
    else if (email.includes("catering")) partnerType = "caterer";
    else if (email.includes("venue")) partnerType = "venue";
    
    return {
      id: 'partner-1',
      role: UserRole.PARTNER,
      partnerType: partnerType,
      permissions: [
        Permission.VIEW_DASHBOARD,
        Permission.MANAGE_REQUESTS
      ],
      email: email,
      name: 'Partenaire Test'
    };
  } else if (email.includes("client")) {
    return {
      id: 'client-1',
      role: UserRole.CLIENT,
      permissions: [
        Permission.VIEW_DASHBOARD,
        Permission.MANAGE_GUESTS
      ],
      email: email,
      name: 'Client Test'
    };
  } else {
    return {
      id: 'demo-user',
      role: UserRole.CLIENT,
      permissions: [Permission.VIEW_DASHBOARD],
      email: email,
      name: 'Utilisateur Démo'
    };
  }
};

export const getRedirectPathForUser = (userEmail: string = ''): string => {
  const email = userEmail || localStorage.getItem('weddingPlannerEmail') || '';
  const isClient = email.includes("client");
  const isPartner = email.includes("partner");
  const isAdmin = email.includes("admin");
  
  let redirectPath = "/client/dashboard";
  
  if (isClient) {
    redirectPath = "/client/dashboard";
  } else if (isPartner) {
    redirectPath = "/partner/dashboard";
  } else if (isAdmin) {
    redirectPath = "/admin/dashboard";
  }
  
  console.log(`Determined redirect path: ${redirectPath} for user type: ${isAdmin ? 'admin' : isPartner ? 'partner' : 'client'}`);
  
  return redirectPath;
};
