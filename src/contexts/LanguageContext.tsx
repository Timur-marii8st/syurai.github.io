import React, { createContext, useCallback, useContext, useState } from 'react';
import { translations } from '../i18n/translations';
import type { Lang, Translations } from '../i18n/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'syurai-lang';

function detectLanguage(): Lang {
  // 1. Check localStorage first (user preference)
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ru' || stored === 'en') return stored;
  // 2. Auto-detect from browser/OS
  const navigatorWithLegacyLanguage = navigator as Navigator & { userLanguage?: string };
  const browserLang = navigator.language || navigatorWithLegacyLanguage.userLanguage || '';
  return browserLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => detectLanguage());

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// This file intentionally exports both the provider and hook for app-wide language access.
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
