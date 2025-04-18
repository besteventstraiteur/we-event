
export type NetworkErrorCode = 
  | 'CONNECTION_LOST'
  | 'SYNC_FAILED'
  | 'STORAGE_ERROR'
  | 'UNKNOWN_ERROR';

export class NetworkError extends Error {
  constructor(
    message: string,
    public code: NetworkErrorCode = 'UNKNOWN_ERROR',
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export const formatNetworkError = (error: unknown): string => {
  if (error instanceof NetworkError) {
    return `Erreur réseau: ${error.message}`;
  }
  if (error instanceof Error) {
    return `Une erreur est survenue: ${error.message}`;
  }
  return 'Une erreur réseau inconnue est survenue';
};

