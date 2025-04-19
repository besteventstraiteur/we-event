
import { AUTH_CONSTANTS } from '@/config/auth.config';
import type { AccessControlUser } from '@/utils/accessControl';

export const sessionService = {
  setToken(token: string, rememberMe: boolean = true): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, token);
  },

  getToken(): string | null {
    return (
      localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN) ||
      sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN)
    );
  },

  setUser(user: AccessControlUser, rememberMe: boolean = true): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser(): AccessControlUser | null {
    const userStr = (
      localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER) ||
      sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER)
    );
    
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  clearSession(): void {
    [localStorage, sessionStorage].forEach(storage => {
      storage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
      storage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
      storage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.EMAIL);
      storage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.REMEMBER_ME);
    });
  }
};

