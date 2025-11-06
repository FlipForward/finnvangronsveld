import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.label1': 'IT STUDENT',
    'hero.label2': 'DJ + PRODUCER',
    'hero.label3': 'STREAMER',
    
    // About
    'about.title': 'ABOUT ME',
    'about.content': 'Content coming soon...',
    
    // Portfolio
    'portfolio.title': 'PORTFOLIO',
    'portfolio.content': 'Projects coming soon...',
    
    // 404
    '404.title': '404',
    '404.message': 'Page not found',
    '404.link': 'Back to home',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over Mij',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.label1': 'IT STUDENT',
    'hero.label2': 'DJ + PRODUCER',
    'hero.label3': 'STREAMER',
    
    // About
    'about.title': 'OVER MIJ',
    'about.content': 'Inhoud komt binnenkort...',
    
    // Portfolio
    'portfolio.title': 'PORTFOLIO',
    'portfolio.content': 'Projecten komen binnenkort...',
    
    // 404
    '404.title': '404',
    '404.message': 'Pagina niet gevonden',
    '404.link': 'Terug naar home',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
