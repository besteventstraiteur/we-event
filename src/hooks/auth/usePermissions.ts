
import { useCallback } from "react";
import { Profile } from "@/lib/supabase";
import { UserRole } from "@/utils/accessControl";

export function usePermissions(user: Profile | null) {
  /**
   * Vérifie si l'utilisateur possède un rôle spécifique
   */
  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    
    // Standardiser les deux valeurs pour la comparaison
    const userRoleStr = String(user.role || '').toLowerCase().trim();
    const checkRoleStr = String(role || '').toLowerCase().trim();
    
    console.log("usePermissions hasRole - Comparing roles:", userRoleStr, checkRoleStr, userRoleStr === checkRoleStr);
    
    return userRoleStr === checkRoleStr;
  }, [user]);

  /**
   * Vérifie si l'utilisateur a une permission spécifique
   * Les permissions sont plus granulaires que les rôles et peuvent être associées à différents rôles
   */
  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    
    // Les administrateurs ont toutes les permissions
    if (String(user.role).toLowerCase().trim() === 'admin') return true;
    
    // Permissions spécifiques pour les différents modules CRM
    const crmPermissions = {
      // Permissions clients
      'crm.contacts.view': ['admin', 'partner'],
      'crm.contacts.create': ['admin', 'partner'],
      'crm.contacts.edit': ['admin', 'partner'],
      'crm.contacts.delete': ['admin'],
      
      // Permissions opportunités
      'crm.opportunities.view': ['admin', 'partner'],
      'crm.opportunities.create': ['admin', 'partner'],
      'crm.opportunities.edit': ['admin', 'partner'],
      'crm.opportunities.delete': ['admin'],
      
      // Permissions devis/factures
      'crm.quotes.view': ['admin', 'partner'],
      'crm.quotes.create': ['admin', 'partner'],
      'crm.quotes.edit': ['admin', 'partner'],
      'crm.quotes.delete': ['admin'],
      'crm.invoices.view': ['admin', 'partner'],
      'crm.invoices.create': ['admin', 'partner'],
      'crm.invoices.edit': ['admin', 'partner'],
      'crm.invoices.delete': ['admin'],
      
      // Permissions produits/services
      'crm.products.view': ['admin', 'partner'],
      'crm.products.create': ['admin', 'partner'],
      'crm.products.edit': ['admin', 'partner'],
      'crm.products.delete': ['admin'],
      
      // Permissions rapports
      'crm.reports.view': ['admin', 'partner'],
      'crm.reports.create': ['admin'],
      'crm.reports.export': ['admin', 'partner'],
    };
    
    const userRole = String(user.role).toLowerCase().trim();
    return crmPermissions[permission as keyof typeof crmPermissions]?.includes(userRole) || false;
  }, [user]);

  /**
   * Vérifie si l'utilisateur est un partenaire d'un type spécifique
   */
  const hasPartnerType = useCallback((partnerType: string): boolean => {
    if (!user) return false;
    
    // Vérifier si l'utilisateur est un partenaire
    const isPartner = String(user.role || '').toLowerCase().trim() === 'partner';
    if (!isPartner) return false;
    
    // Vérifier le type de partenaire
    const userPartnerType = String(user.partner_type || '').toLowerCase().trim();
    const checkPartnerType = String(partnerType || '').toLowerCase().trim();
    
    return userPartnerType === checkPartnerType;
  }, [user]);

  return {
    hasRole,
    hasPermission,
    hasPartnerType
  };
}
