
export const CACHED_GUESTS_KEY = 'cached_guests';

export const getCachedGuests = () => {
  const cachedData = localStorage.getItem(CACHED_GUESTS_KEY);
  if (!cachedData) return null;
  
  try {
    return JSON.parse(cachedData);
  } catch (e) {
    console.error('Error parsing cached guests:', e);
    return null;
  }
};

export const setCachedGuests = (guests: unknown) => {
  localStorage.setItem(CACHED_GUESTS_KEY, JSON.stringify(guests));
};
