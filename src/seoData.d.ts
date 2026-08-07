export const SITE_URL: string;
export const SITE_NAME: string;
export const DEFAULT_IMAGE: string;

export type SeoDataRoute = {
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

export const seoRoutes: SeoDataRoute[];

export const localizedSeoText: {
  ru?: Record<string, Pick<SeoDataRoute, 'title' | 'description'>>;
};

export function getLocalizedSeoRoute(route: SeoDataRoute, lang?: string): SeoDataRoute;
