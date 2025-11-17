import React, { createContext, useContext, useState, useEffect } from 'react';

// Import translation files
import { translations } from './translations';

// Create context
const LanguageContext = createContext();

// Language provider
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹', dir: 'ltr' },
    { code: 'or', name: 'Afan Oromo', flag: '🇪🇹', dir: 'ltr' },
    { code: 'ti', name: 'ትግርኛ', flag: '🇪🇷', dir: 'ltr' },
  ];

  // Initialize language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    const browserLanguage = navigator.language.split('-')[0];
    
    // Set language priority: saved preference > browser language > default (en)
    const languageToSet = savedLanguage || 
                         (languages.find(lang => lang.code === browserLanguage) ? browserLanguage : 'en');
    
    setLanguage(languageToSet);
    setIsLoading(false);
  }, []);

  // Set language function
  const setLanguage = (languageCode) => {
    if (languages.find(lang => lang.code === languageCode)) {
      setCurrentLanguage(languageCode);
      
      // Update document attributes
      const langData = languages.find(lang => lang.code === languageCode);
      document.documentElement.lang = languageCode;
      document.documentElement.dir = langData.dir;
    }
  };

  // Translation function
  const t = (key, params = {}) => {
    const translation = translations[currentLanguage]?.[key] || translations['en'][key] || key;
    
    // Replace parameters in translation
    return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match;
    });
  };

  // Auto-detect and suggest language based on user's location/browser
  const autoDetectLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    const availableLang = languages.find(lang => lang.code === browserLang);
    
    if (availableLang && availableLang.code !== currentLanguage) {
      return availableLang;
    }
    return null;
  };

  const value = {
    currentLanguage,
    setLanguage,
    languages,
    t,
    autoDetectLanguage,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

