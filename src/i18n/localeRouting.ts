import type { Lang } from './translations';

export const supportedLangs: Lang[] = ['en', 'ru'];
export const defaultLang: Lang = 'en';

export const getLangFromPath = (pathname: string): Lang | null => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return firstSegment === 'en' || firstSegment === 'ru' ? firstSegment : null;
};

export const stripLocale = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en' || segments[0] === 'ru') {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
};

export const localizePath = (pathname: string, lang: Lang): string => {
  const cleanPath = stripLocale(pathname);
  return cleanPath === '/' ? `/${lang}` : `/${lang}${cleanPath}`;
};
