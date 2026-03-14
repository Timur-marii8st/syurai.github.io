import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-lg hover:border-white/25 transition-colors">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
          lang === 'en'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-500 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang('ru')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
          lang === 'ru'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-500 hover:text-white'
        }`}
        aria-label="Переключить на русский"
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
