import {
  DEFAULT_IMAGE,
  getLocalizedSeoRoute,
  SITE_NAME,
  SITE_URL,
  seoRoutes,
} from './seoData';
import type { Lang } from './i18n/translations';

export { DEFAULT_IMAGE, SITE_NAME, SITE_URL, seoRoutes };

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

export const defaultSeoRoute = seoRoutes[0] as SeoRoute;

export const getSeoForPath = (pathname: string, lang: Lang = 'en'): SeoRoute => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  const route =
    (seoRoutes.find((item) => item.path === normalized) as SeoRoute | undefined) ??
    (seoRoutes.find((item) => item.path === '/404') as SeoRoute | undefined) ??
    defaultSeoRoute;

  return getLocalizedSeoRoute(route, lang) as SeoRoute;
};

export const toAbsoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;
