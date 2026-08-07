import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_IMAGE, getSeoForPath, SITE_NAME, toAbsoluteUrl } from '../seo';
import { getLangFromPath, localizePath, stripLocale, supportedLangs } from '../i18n/localeRouting';

const upsertMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const upsertAlternate = (hreflang: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'alternate');
    element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = stripLocale(pathname);
    const lang = getLangFromPath(pathname) ?? 'en';
    const seo = getSeoForPath(cleanPath, lang);
    const canonical = toAbsoluteUrl(localizePath(seo.path, lang));
    const image = seo.image ?? DEFAULT_IMAGE;

    document.documentElement.lang = lang;
    document.title = seo.title;

    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      return meta;
    }, seo.description);

    upsertMeta('meta[name="robots"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      return meta;
    }, seo.noindex ? 'noindex, follow' : 'index, follow');

    upsertMeta('meta[property="og:site_name"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:site_name');
      return meta;
    }, SITE_NAME);

    upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      return meta;
    }, seo.title);

    upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      return meta;
    }, seo.description);

    upsertMeta('meta[property="og:type"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      return meta;
    }, seo.type === 'article' ? 'article' : 'website');

    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      return meta;
    }, canonical);

    upsertMeta('meta[property="og:image"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      return meta;
    }, image);

    upsertMeta('meta[name="twitter:card"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'twitter:card');
      return meta;
    }, 'summary_large_image');

    upsertLink('canonical', canonical);

    supportedLangs.forEach((hreflang) => {
      upsertAlternate(hreflang, toAbsoluteUrl(localizePath(seo.path, hreflang)));
    });

    upsertAlternate('x-default', toAbsoluteUrl(seo.path === '/' ? '/' : localizePath(seo.path, 'en')));
  }, [pathname]);

  return null;
};

export default SeoManager;
