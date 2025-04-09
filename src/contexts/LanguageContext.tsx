
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, LanguageCode, availableLanguages } from '@/locales';

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  availableLanguages: { code: LanguageCode; name: string }[];
};

const defaultLanguage: LanguageCode = 'fr';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: () => '',
  availableLanguages,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Récupérer la langue depuis localStorage au démarrage
    const savedLanguage = localStorage.getItem('we-event-language') as LanguageCode;
    return savedLanguage && Object.keys(translations).includes(savedLanguage) 
      ? savedLanguage 
      : defaultLanguage;
  });

  useEffect(() => {
    // Enregistrer la langue dans localStorage à chaque changement
    localStorage.setItem('we-event-language', language);
    // Ajouter l'attribut lang à l'élément HTML pour l'accessibilité
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    if (Object.keys(translations).includes(lang)) {
      setLanguageState(lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (!value[k]) {
        console.warn(`Translation key not found: ${key} in language ${language}`);
        // Essayer de trouver la clé dans la langue par défaut
        let defaultValue = translations[defaultLanguage];
        for (const dk of keys) {
          if (!defaultValue[dk]) {
            return key; // Si la clé n'existe pas non plus dans la langue par défaut
          }
          defaultValue = defaultValue[dk];
        }
        return typeof defaultValue === 'string' ? defaultValue : key;
      }
      value = value[k];
    }
    
    if (typeof value === 'string') {
      // Remplacer les variables comme {year} par leurs valeurs
      return value.replace(/\{year\}/g, new Date().getFullYear().toString());
    }
    
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
