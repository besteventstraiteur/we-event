
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthState } from './useAuthState';
import { useAuthMethods } from './useAuthMethods';
import { usePermissions } from './usePermissions';
import { AuthContextType, AuthResult, LoginCredentials } from './types';
import { UserRole } from '@/utils/accessControl';
import { Profile } from '@/lib/supabase';

// Create the authentication context with default values
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

// Define the props for the AuthProvider component
export interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, session, setUser, setSession, isLoading } = useAuthState();
  const { login, loginWithProvider, logout, register } = useAuthMethods(setUser);
  const { hasRole, hasPermission, hasPartnerType } = usePermissions(user);

  // Check if there's a demo user set in localStorage on component mount
  useEffect(() => {
    if (!user) {
      try {
        const localStorageAuth = localStorage.getItem("supabase.auth.token");
        if (localStorageAuth) {
          try {
            const authData = JSON.parse(localStorageAuth);
            if (authData && authData.currentSession && authData.currentSession.user) {
              console.log("Found demo user in localStorage:", authData.currentSession.user);
              setUser(authData.currentSession.user);
              // Set session for demo users as well
              setSession({ 
                access_token: 'demo-token',
                refresh_token: 'demo-refresh-token',
                expires_in: 3600,
                token_type: 'bearer',
                user: authData.currentSession.user
              });
            }
          } catch (e) {
            console.error("Error parsing auth data:", e);
          }
        }
      } catch (error) {
        console.error("Error checking for demo user:", error);
      }
    }
  }, []);

  // Update user profile
  const updateUser = async (updatedFields: Partial<Profile>): Promise<void> => {
    if (!user) return;
    
    try {
      // In a real implementation, this would make an API request
      console.log('Updating user profile:', updatedFields);
      
      // Local update of user state
      setUser({
        ...user,
        ...updatedFields
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithProvider,
        logout,
        register,
        hasPermission,
        hasRole,
        hasPartnerType,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create and export the custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
};

export default useAuth;
