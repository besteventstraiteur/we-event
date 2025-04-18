
export const CACHED_GUESTS_KEY = 'cached_guests';

export const getCachedGuests = () => {
  try {
    const cachedData = localStorage.getItem(CACHED_GUESTS_KEY);
    if (!cachedData) return null;
    
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.error('Error parsing cached guests:', e);
      return null;
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const setCachedGuests = (guests: unknown) => {
  try {
    localStorage.setItem(CACHED_GUESTS_KEY, JSON.stringify(guests));
  } catch (error) {
    console.error('Error saving guests to localStorage:', error);
    // If localStorage fails, we might want to try an alternative storage method
    // or at least inform the user that their data couldn't be saved locally
  }
};

