
import React, { createContext, ReactNode, useContext } from 'react';
import { useAuthState } from './useAuthState';
import { useAuthMethods } from './useAuthMethods';
import { usePermissions } from './usePermissions';
import { AuthContextType } from './types/authContext.types';

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  loginWithProvider: async () => ({ success: false }),
  logout: async () => {},
  register: async () => ({ success: false }),
  hasPermission: () => false,
  hasRole: () => false,
  hasPartnerType: () => false,
  updateUser: async () => {},
});

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, session, setUser, isLoading } = useAuthState();
  const { login, logout, loginWithProvider, register } = useAuthMethods();
  const { hasRole, hasPermission, hasPartnerType } = usePermissions(user);

  const updateUser = async (updatedFields: any): Promise<void> => {
    if (!user) return;
    
    try {
      console.log('Updating user profile:', updatedFields);
      // For this implementation, just update the user object in memory
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithProvider,
    logout,
    register,
    hasRole,
    hasPermission,
    hasPartnerType,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
