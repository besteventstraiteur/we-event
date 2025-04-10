
import { AccessControlUser, UserRole, Permission } from "@/utils/accessControl";
import { toast } from "@/hooks/use-toast";

// Types pour le service d'authentification
export interface AuthResult {
  success: boolean;
  user?: AccessControlUser;
  token?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface TokenData {
  userId: string;
  role: UserRole;
  exp: number;
}

// Service d'authentification
class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'currentUser';
  
  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Vérifier si le token est expiré
    try {
      const tokenData = this.parseToken(token);
      const now = Math.floor(Date.now() / 1000);
      return tokenData.exp > now;
    } catch (error) {
      console.error('Token parsing error:', error);
      return false;
    }
  }
  
  // Générer un token JWT simulé (dans une impl. réelle, cela se ferait côté serveur)
  private generateToken(user: AccessControlUser): string {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 60 * 60 * 24; // 24 heures
    
    const payload = {
      userId: user.id,
      role: user.role,
      exp: exp
    };
    
    // Simuler un token JWT (dans une impl. réelle, utiliser une bibliothèque pour signer le token)
    return btoa(JSON.stringify(payload));
  }
  
  // Parser le token (simulé)
  private parseToken(token: string): TokenData {
    try {
      return JSON.parse(atob(token));
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
  
  // Connecter un utilisateur
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      // Dans une impl. réelle, ceci serait une requête API vers le backend
      await new Promise(resolve => setTimeout(resolve, 800)); // Simuler latence réseau
      
      const { email, password, rememberMe } = credentials;
      
      if (!email || !password) {
        return { 
          success: false, 
          message: "Email et mot de passe requis" 
        };
      }
      
      // Stockage du "remember me" si activé
      if (rememberMe) {
        localStorage.setItem("weddingPlannerEmail", email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }
      
      // Vérification du mot de passe (dans une impl. réelle, cela se ferait côté serveur)
      // Pour la démo, on accepte n'importe quel mot de passe non vide
      if (password.length === 0) {
        return {
          success: false,
          message: "Mot de passe invalide"
        };
      }
      
      // Déterminer le rôle de l'utilisateur (dans une impl. réelle, cela viendrait du backend)
      let user: AccessControlUser;
      
      if (email.includes("admin")) {
        user = {
          id: `admin-${Date.now()}`,
          role: UserRole.ADMIN,
          permissions: Object.values(Permission),
          email,
          name: 'Administrateur'
        };
      } else if (email.includes("partner")) {
        user = {
          id: `partner-${Date.now()}`,
          role: UserRole.PARTNER,
          permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_REQUESTS],
          email,
          name: 'Partenaire'
        };
      } else {
        user = {
          id: `client-${Date.now()}`,
          role: UserRole.CLIENT,
          permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_GUESTS],
          email,
          name: 'Client'
        };
      }
      
      // Générer un token et le stocker
      const token = this.generateToken(user);
      this.setToken(token);
      this.setUser(user);
      
      return {
        success: true,
        user,
        token
      };
      
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: "Erreur lors de la connexion. Veuillez réessayer."
      };
    }
  }
  
  // Connecter avec un fournisseur social
  async loginWithProvider(provider: string): Promise<AuthResult> {
    try {
      // Simuler une authentification sociale
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simuler un succès 90% du temps
      if (Math.random() < 0.9) {
        const user: AccessControlUser = {
          id: `social-${provider}-${Date.now()}`,
          role: UserRole.CLIENT,  // Par défaut, les utilisateurs sociaux sont des clients
          permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_GUESTS],
          email: `user-${Date.now()}@example.com`,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`
        };
        
        const token = this.generateToken(user);
        this.setToken(token);
        this.setUser(user);
        
        return {
          success: true,
          user,
          token
        };
      } else {
        return {
          success: false,
          message: `Échec de l'authentification avec ${provider}. Veuillez réessayer.`
        };
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      return {
        success: false,
        message: `Erreur lors de l'authentification avec ${provider}.`
      };
    }
  }
  
  // Déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    
    // Supprimer les tokens sociaux
    localStorage.removeItem('google_auth_token');
    localStorage.removeItem('facebook_auth_token');
    localStorage.removeItem('apple_auth_token');
    
    // Rediriger vers la page de connexion (à gérer par le composant appelant)
    // window.location.href = '/login';
  }
  
  // Récupérer l'utilisateur actuel
  getCurrentUser(): AccessControlUser | null {
    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  // Enregistrer un utilisateur
  async register(userData: Partial<AccessControlUser> & { password: string }): Promise<AuthResult> {
    try {
      // Dans une impl. réelle, ceci serait une requête API vers le backend
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simuler la création d'un utilisateur
      const user: AccessControlUser = {
        id: `user-${Date.now()}`,
        role: userData.role || UserRole.CLIENT,
        permissions: userData.role === UserRole.ADMIN 
          ? Object.values(Permission) 
          : userData.role === UserRole.PARTNER 
            ? [Permission.VIEW_DASHBOARD, Permission.MANAGE_REQUESTS]
            : [Permission.VIEW_DASHBOARD, Permission.MANAGE_GUESTS],
        email: userData.email || '',
        name: userData.name || 'Nouvel utilisateur'
      };
      
      const token = this.generateToken(user);
      this.setToken(token);
      this.setUser(user);
      
      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: "Erreur lors de l'inscription. Veuillez réessayer."
      };
    }
  }
  
  // Vérifier si l'utilisateur a une permission spécifique
  hasPermission(permission: Permission): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Les administrateurs ont toutes les permissions
    if (user.role === UserRole.ADMIN) return true;
    
    // Vérifier dans les permissions de l'utilisateur
    return user.permissions ? user.permissions.includes(permission) : false;
  }
  
  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }
  
  // Stocker le token (localStorage ou sessionStorage selon rememberMe)
  private setToken(token: string, rememberMe: boolean = true): void {
    if (rememberMe) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }
  
  // Récupérer le token
  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }
  
  // Stocker les informations utilisateur
  private setUser(user: AccessControlUser, rememberMe: boolean = true): void {
    if (rememberMe) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }
  
  // Vérifier la validité d'un token
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Dans une impl. réelle, ceci serait une requête API vers le backend
      // pour vérifier la validité du token côté serveur
      
      // Simuler une vérification locale
      const tokenData = this.parseToken(token);
      const now = Math.floor(Date.now() / 1000);
      
      return tokenData.exp > now;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }
  
  // Rafraîchir le token
  async refreshToken(): Promise<boolean> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return false;
      
      // Dans une impl. réelle, ceci serait une requête API vers le backend
      // avec le refresh token pour obtenir un nouveau token d'accès
      
      // Simuler un rafraîchissement
      const token = this.generateToken(currentUser);
      this.setToken(token);
      
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }
}

// Export comme singleton
export const authService = new AuthService();
