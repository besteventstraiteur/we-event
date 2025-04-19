
import { TokenData } from '@/types/auth';

export const tokenService = {
  generateToken(payload: TokenData): string {
    return btoa(JSON.stringify(payload));
  },

  parseToken(token: string): TokenData {
    try {
      return JSON.parse(atob(token));
    } catch (error) {
      throw new Error('Invalid token format');
    }
  },

  isTokenExpired(token: string): boolean {
    try {
      const tokenData = this.parseToken(token);
      const now = Math.floor(Date.now() / 1000);
      return tokenData.exp <= now;
    } catch {
      return true;
    }
  },

  verifyToken(token: string): boolean {
    if (!token) return false;
    return !this.isTokenExpired(token);
  }
};
