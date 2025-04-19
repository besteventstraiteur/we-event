
import { useAuth } from './auth/useAuth';
import { AuthProvider, type AuthProviderProps } from './auth/useAuth';

// Re-export for backward compatibility
export { useAuth, AuthProvider, type AuthProviderProps };
export default useAuth;
