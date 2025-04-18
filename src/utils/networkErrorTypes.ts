
export type NetworkErrorCode = 
  | 'CONNECTION_LOST'
  | 'SYNC_FAILED'
  | 'STORAGE_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'API_ERROR'
  | 'OFFLINE_MODE'
  | 'REQUEST_FAILED'
  | 'RESPONSE_ERROR'
  | 'UNKNOWN_ERROR';

export interface NetworkErrorContext {
  timestamp: number;
  url?: string;
  method?: string;
  statusCode?: number;
  attempt?: number;
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public code: NetworkErrorCode = 'UNKNOWN_ERROR',
    public context: NetworkErrorContext = { timestamp: Date.now() },
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
    const context = error.context;
    
    const details = [
      context.method && context.url ? `${context.method} ${context.url}` : null,
      context.statusCode ? `Code: ${context.statusCode}` : null,
      context.attempt ? `Tentative: ${context.attempt}` : null
    ].filter(Boolean).join(' | ');

    return error.retryable 
      ? `${message}${details ? ` (${details})` : ''} (Veuillez réessayer)`
      : `${message}${details ? ` (${details})` : ''}`;
  }
  if (error instanceof Error) {
    return `Une erreur est survenue: ${error.message}`;
  }
  return 'Une erreur réseau inconnue est survenue';
};

