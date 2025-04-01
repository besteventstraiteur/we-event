
/**
 * Custom error class for podcast-related errors
 * Extends the native Error class with additional context
 */
export class PodcastError extends Error {
  /**
   * @param message - Error message
   * @param code - Error code for categorization
   * @param originalError - The original error that was caught
   */
  constructor(
    message: string, 
    public code: PodcastErrorCode = 'UNKNOWN_ERROR',
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'PodcastError';
  }
}

/**
 * Enum of podcast error codes for categorizing errors
 */
export type PodcastErrorCode = 
  | 'FETCH_ERROR' 
  | 'SAVE_ERROR' 
  | 'DELETE_ERROR'
  | 'VALIDATION_ERROR'
  | 'FILE_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Formats an error into a user-friendly message
 * 
 * @param error - The error to format
 * @returns A user-friendly error message
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof PodcastError) {
    return error.message;
  } else if (error instanceof Error) {
    return `Une erreur est survenue: ${error.message}`;
  } else {
    return 'Une erreur inconnue est survenue';
  }
};

/**
 * Wraps a promise with standardized error handling
 * 
 * @param promise - The promise to wrap
 * @param errorCode - The error code to use if the promise rejects
 * @returns A new promise with standardized error handling
 */
export const withErrorHandling = async <T>(
  promise: Promise<T>, 
  errorCode: PodcastErrorCode = 'UNKNOWN_ERROR',
  errorMessage = 'Une erreur est survenue'
): Promise<T> => {
  try {
    return await promise;
  } catch (err) {
    throw new PodcastError(
      errorMessage,
      errorCode,
      err
    );
  }
};
