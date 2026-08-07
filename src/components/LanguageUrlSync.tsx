import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { defaultLang, getLangFromPath } from '../i18n/localeRouting';

const LanguageUrlSync = () => {
  const { pathname } = useLocation();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const urlLang = getLangFromPath(pathname) ?? defaultLang;
    if (urlLang !== lang) {
      setLang(urlLang);
    }
  }, [lang, pathname, setLang]);

  return null;
};

export default LanguageUrlSync;
