
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
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
  const [lastCheckTimestamp, setLastCheckTimestamp] = useState<number>(0);
  const checkAttempts = useRef(0);
  const checkingInProgress = useRef(false);
  const checkInterval = useRef<number | null>(null);

  // Check for demo user only once on component mount
  useEffect(() => {
    const checkForDemoUser = () => {
      // Skip if already checking or user is already set
      if (checkingInProgress.current || user) {
        return;
      }
      
      try {
        checkingInProgress.current = true;
        
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
        
        // Limit check attempts to prevent excessive checks
        checkAttempts.current += 1;
        if (checkAttempts.current >= 3) {
          // Clear interval after 3 attempts if we haven't found a user
          if (checkInterval.current) {
            clearInterval(checkInterval.current);
            checkInterval.current = null;
          }
        }
      } catch (error) {
        console.error("Error checking for demo user:", error);
      } finally {
        checkingInProgress.current = false;
      }
    };

    // Initial check
    checkForDemoUser();

    // Set up a one-time interval for a few retries (not continuous)
    checkInterval.current = window.setInterval(() => {
      if (!user) {
        checkForDemoUser();
      } else if (checkInterval.current) {
        // If we have a user, clear the interval
        clearInterval(checkInterval.current);
        checkInterval.current = null;
      }
    }, 5000); // Check after 5 seconds
    
    // Clean up interval on component unmount
    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
        checkInterval.current = null;
      }
    };
  }, [user, setUser, setSession]);

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
