
type SocialProvider = 'google' | 'facebook' | 'apple';

interface SocialLoginResult {
  success: boolean;
  userData?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    token?: string;
  };
  error?: string;
}

/**
 * Handles social login authentication
 * In a real implementation, this would connect to the actual OAuth providers
 */
export const handleSocialLogin = async (provider: SocialProvider): Promise<SocialLoginResult> => {
  // This is a mock implementation for demonstration purposes
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Mock successful authentication (90% success rate)
      if (Math.random() < 0.9) {
        // Store the token securely (in a real app this would be handled better)
        const token = `mock_${provider}_token_${Date.now()}`;
        localStorage.setItem(`${provider}_auth_token`, token);
        
        // Return mock user data
        resolve({
          success: true,
          userData: {
            id: `user_${Date.now()}`,
            name: provider === 'apple' ? 'Apple User' : 
                  provider === 'facebook' ? 'Facebook User' : 'Google User',
            email: `${provider}.user@example.com`,
            avatar: `https://ui-avatars.com/api/?name=${provider}+User&background=random`,
            token: token,
          }
        });
      } else {
        // Mock authentication failure
        resolve({
          success: false,
          error: `Échec de l'authentification avec ${provider}. Veuillez réessayer.`
        });
      }
    }, 1500); // Simulate network delay
  });
};

/**
 * Verifies if a user is authenticated with a social provider
 */
export const isAuthenticatedWithProvider = (provider: SocialProvider): boolean => {
  return !!localStorage.getItem(`${provider}_auth_token`);
};

/**
 * Logs out a user from a specific social provider
 */
export const logoutFromProvider = (provider: SocialProvider): void => {
  localStorage.removeItem(`${provider}_auth_token`);
};

/**
 * Retrieves stored token for a provider
 */
export const getProviderToken = (provider: SocialProvider): string | null => {
  return localStorage.getItem(`${provider}_auth_token`);
};
