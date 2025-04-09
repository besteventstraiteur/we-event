
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/locales';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  variant?: 'minimal' | 'standard';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'standard' }) => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
  };

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-we-gray-700 hover:bg-we-beige/50">
            <Globe size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availableLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as LanguageCode)}
              className={language === lang.code ? 'bg-we-beige/50 font-medium' : ''}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe size={16} />
          <span>{availableLanguages.find(l => l.code === language)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as LanguageCode)}
            className={language === lang.code ? 'bg-we-beige/50 font-medium' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
