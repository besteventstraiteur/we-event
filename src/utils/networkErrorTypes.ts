
export type NetworkErrorCode = 
  | 'CONNECTION_LOST'
  | 'SYNC_FAILED'
  | 'STORAGE_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'API_ERROR'
  | 'OFFLINE_MODE'
  | 'UNKNOWN_ERROR';

export class NetworkError extends Error {
  constructor(
    message: string,
    public code: NetworkErrorCode = 'UNKNOWN_ERROR',
    public originalError?: unknown,
    public retryable: boolean = true
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export const formatNetworkError = (error: unknown): string => {
  if (error instanceof NetworkError) {
    const message = `Erreur réseau: ${error.message}`;
    return error.retryable 
      ? `${message} (Veuillez réessayer)`
      : message;
  }
  if (error instanceof Error) {
    return `Une erreur est survenue: ${error.message}`;
  }
  return 'Une erreur réseau inconnue est survenue';
};

