
export interface TokenData {
  userId: string;
  exp: number;
}

export interface AuthResult {
  success: boolean;
  user?: any;
  token?: string;
  message?: string;
  data?: any;
}

