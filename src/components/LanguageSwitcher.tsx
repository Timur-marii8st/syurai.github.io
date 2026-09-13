import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { localizePath, stripLocale } from '../i18n/localeRouting';
import type { Lang } from '../i18n/translations';

const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const switchLanguage = (nextLang: Lang) => {
    setLang(nextLang);
    navigate(`${localizePath(stripLocale(pathname), nextLang)}${search}${hash}`);
  };

  // Внутренние страницы живут в тёмной теме — держим переключатель в тон.
  const isHome = stripLocale(pathname) === '/';

  const buttonClass = (active: boolean) =>
    `px-3 py-1.5 font-fmono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
      active ? 'bg-ink text-paper' : 'text-inkmute hover:text-ink'
    }`;

  return (
    <div data-theme={isHome ? undefined : 'dark'} className="contents">
      <div className="fixed bottom-5 right-5 z-50 flex items-center border border-ink/25 bg-paper/90 p-0.5">
        <button
          onClick={() => switchLanguage('en')}
          className={buttonClass(lang === 'en')}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => switchLanguage('ru')}
          className={buttonClass(lang === 'ru')}
          aria-label="Переключить на русский"
        >
          RU
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
