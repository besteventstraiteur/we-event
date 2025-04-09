
import fr from './fr';
import en from './en';
import es from './es';
import it from './it';
import de from './de';

export type LanguageCode = 'fr' | 'en' | 'es' | 'it' | 'de';

export const availableLanguages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'de', name: 'Deutsch' },
];

export const translations = {
  fr,
  en,
  es,
  it,
  de,
};

export default translations;
