
import { useState, useEffect } from 'react';

export type MapKeyStatus = 'unset' | 'loading' | 'valid' | 'error';

interface UseGoogleMapsApiKeyReturn {
  apiKey: string;
  setApiKey: (key: string) => void;
  status: MapKeyStatus;
  clearApiKey: () => void;
  isKeyValid: boolean;
}

/**
 * Custom hook for managing Google Maps API key
 * - Loads API key from localStorage if available
 * - Provides methods to set and clear the API key
 * - Tracks loading and validation status
 */
export const useGoogleMapsApiKey = (): UseGoogleMapsApiKeyReturn => {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [status, setStatus] = useState<MapKeyStatus>('unset');

  // On mount, check if API key exists in localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('google_maps_api_key');
    
    if (savedKey) {
      setApiKeyState(savedKey);
      setStatus('valid'); // Assume saved key is valid
    } else {
      setStatus('unset');
    }
  }, []);

  // Function to set API key and save to localStorage
  const setApiKey = (key: string) => {
    if (!key.trim()) {
      setStatus('unset');
      return;
    }

    // Set status to loading first
    setStatus('loading');
    
    // Store the key
    setApiKeyState(key);
    localStorage.setItem('google_maps_api_key', key);
    
    // In a real implementation, we could verify the API key here
    // For now, we'll assume it's valid once set
    setStatus('valid');
  };

  // Function to clear API key from state and localStorage
  const clearApiKey = () => {
    setApiKeyState('');
    localStorage.removeItem('google_maps_api_key');
    setStatus('unset');
  };

  return {
    apiKey,
    setApiKey,
    status,
    clearApiKey,
    isKeyValid: status === 'valid'
  };
};
