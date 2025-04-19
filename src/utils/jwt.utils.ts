
import { TokenData } from '@/types/auth';

export const parseToken = (token: string): TokenData => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    throw new Error('Invalid token format');
  }
};

export const generateToken = (payload: TokenData): string => {
  return btoa(JSON.stringify(payload));
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const tokenData = parseToken(token);
    const now = Math.floor(Date.now() / 1000);
    return tokenData.exp <= now;
  } catch {
    return true;
  }
};

