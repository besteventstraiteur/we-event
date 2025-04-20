
export interface AuthDebugInfo {
  email?: string;
  userType?: string;
  redirectPath?: string;
  redirectAttempted?: boolean;
}

export interface LoginBiometricInfo {
  isBiometricSupported: boolean;
  isBiometricEnabled: boolean;
  isNative: boolean;
  biometricError: string | null;
  biometricAttempt: boolean;
  isLoading: boolean;
  handleBiometricAuth: () => Promise<void>;
}
