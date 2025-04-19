
export const AUTH_CONSTANTS = {
  STORAGE_KEYS: {
    TOKEN: 'auth_token',
    USER: 'currentUser',
    REMEMBER_ME: 'weddingPlannerRememberMe',
    EMAIL: 'weddingPlannerEmail'
  },
  MESSAGES: {
    LOGIN: {
      SUCCESS: 'Connexion réussie',
      ERROR: 'Erreur lors de la connexion',
      WELCOME: 'Bienvenue sur votre espace'
    },
    LOGOUT: {
      SUCCESS: 'Déconnexion réussie',
      ERROR: 'Erreur lors de la déconnexion',
      GOODBYE: 'À bientôt!'
    },
    REGISTER: {
      SUCCESS: 'Inscription réussie',
      ERROR: 'Erreur lors de l\'inscription',
      WELCOME: 'Bienvenue !'
    },
    AUTH: {
      REQUIRED: 'Veuillez vous connecter pour accéder à cette ressource',
      UNAUTHORIZED: 'Vous n\'avez pas les permissions nécessaires'
    }
  },
  ROUTES: {
    LOGIN: '/login',
    UNAUTHORIZED: '/unauthorized',
    AUTH_CALLBACK: '/auth/callback'
  }
} as const;

