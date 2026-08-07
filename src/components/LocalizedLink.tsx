import { Link, type LinkProps, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getLangFromPath, localizePath } from '../i18n/localeRouting';

const LocalizedLink = ({ to, ...props }: LinkProps) => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const activeLang = getLangFromPath(pathname) ?? lang;
  const localizedTo = typeof to === 'string' && to.startsWith('/') ? localizePath(to, activeLang) : to;

  return <Link to={localizedTo} {...props} />;
};

export default LocalizedLink;
