import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_IMAGE,
  fallbackContent,
  getLocalizedSeoRoute,
  SITE_NAME,
  SITE_URL,
  seoRoutes,
} from '../src/seoData.js';

const LANGS = ['en', 'ru'];
const LEGACY_ALIASES = [{ from: '/saby-agent', to: '/vibe-doku' }];

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const routeUrl = (routePath) => `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
const localizePath = (routePath, lang) => (routePath === '/' ? `/${lang}` : `/${lang}${routePath}`);
const xDefaultPath = (routePath) => (routePath === '/' ? '/' : localizePath(routePath, 'en'));
const fallbackForRoute = (route, lang) =>
  fallbackContent[lang]?.pages[route.path] ?? fallbackContent.en.pages[route.path] ?? fallbackContent.en.pages['/404'];

const extractAssetTags = (template) => {
  const head = template.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? '';
  return [
    ...head.matchAll(/<script\b[^>]*\bsrc="\/assets\/[^"]+"[^>]*><\/script>/g),
    ...head.matchAll(/<link\b[^>]*\bhref="\/assets\/[^"]+"[^>]*>/g),
  ]
    .map((match) => match[0])
    .join('\n');
};

const renderHead = (route, options = {}) => {
  const lang = options.lang ?? 'en';
  const localizedRoute = getLocalizedSeoRoute(route, lang);
  const canonicalPath = options.canonicalPath ?? localizePath(route.path, lang);
  const canonical = routeUrl(canonicalPath);
  const image = localizedRoute.image ?? DEFAULT_IMAGE;
  const robots = options.noindex || localizedRoute.noindex ? 'noindex, follow' : 'index, follow';
  const type = localizedRoute.type === 'article' ? 'article' : 'website';
  const alternates = [
    ...LANGS.map(
      (alternateLang) =>
        `    <link rel="alternate" hreflang="${alternateLang}" href="${routeUrl(localizePath(route.path, alternateLang))}" />`
    ),
    `    <link rel="alternate" hreflang="x-default" href="${routeUrl(xDefaultPath(route.path))}" />`,
  ].join('\n');
  const jsonLd = localizedRoute.jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(localizedRoute.jsonLd)}</script>`
    : '';

  return `    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/syu.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(localizedRoute.title)}</title>
    <meta name="description" content="${escapeHtml(localizedRoute.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
${alternates}
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeHtml(localizedRoute.title)}" />
    <meta property="og:description" content="${escapeHtml(localizedRoute.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />${jsonLd}`;
};

const writeHtmlFile = async (distDir, routePath, html) => {
  if (routePath === '/') {
    await writeFile(path.join(distDir, 'index.html'), html);
    return;
  }

  const relativePath = routePath.replace(/^\//, '');
  const outputDir = path.join(distDir, relativePath);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html);
  await mkdir(path.dirname(path.join(distDir, `${relativePath}.html`)), { recursive: true });
  await writeFile(path.join(distDir, `${relativePath}.html`), html);
};

const renderHtml = (template, route, options = {}) => {
  const assetTags = extractAssetTags(template);
  const head = `${renderHead(route, options)}${assetTags ? `\n${assetTags}` : ''}`;

  return template
    .replace(/<html[^>]*>/, `<html lang="${options.lang ?? 'en'}">`)
    .replace(/<head>[\s\S]*?<\/head>/, `<head>\n${head}\n  </head>`)
    .replace('<div id="root"></div>', renderFallbackRoot(route, options.lang ?? 'en'));
};

const renderFallbackRoot = (route, lang) => {
  const localizedRoute = getLocalizedSeoRoute(route, lang);
  const content = fallbackForRoute(route, lang);
  const labels = fallbackContent[lang] ?? fallbackContent.en;
  const pagePath = localizePath(route.path, lang);
  const relatedLinks = content.links
    .map(
      (link) =>
        `          <li><a href="${localizePath(link.path, lang)}">${escapeHtml(link.label)}</a></li>`
    )
    .join('\n');
  const languageLinks = LANGS.map(
    (alternateLang) =>
      `          <li><a href="${localizePath(route.path, alternateLang)}" hreflang="${alternateLang}">${alternateLang.toUpperCase()}</a></li>`
  ).join('\n');

  return `<div id="root">
      <main class="seo-fallback" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #050608; color: #f5f5f5; min-height: 100vh; padding: 48px 24px;">
        <article style="max-width: 760px; margin: 0 auto;">
          <p style="color: #fbbf24; font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;">${escapeHtml(content.eyebrow)}</p>
          <h1 style="font-size: clamp(36px, 7vw, 72px); line-height: .95; margin: 16px 0 24px;">${escapeHtml(content.heading)}</h1>
          <p style="font-size: 20px; line-height: 1.6; color: #d1d5db;">${escapeHtml(content.body)}</p>
          <p><a href="${pagePath}" style="color: #fbbf24;">${escapeHtml(labels.continueLabel)}: ${escapeHtml(localizedRoute.title)}</a></p>
          <nav aria-label="${escapeHtml(labels.sectionsLabel)}" style="margin-top: 32px;">
            <ul style="display: grid; gap: 10px; padding-left: 20px;">
${relatedLinks}
            </ul>
          </nav>
          <nav aria-label="${escapeHtml(labels.navLabel)}" style="margin-top: 32px;">
            <ul style="display: flex; flex-wrap: wrap; gap: 14px; padding-left: 0; list-style: none;">
${languageLinks}
            </ul>
          </nav>
        </article>
      </main>
    </div>`;
};

const writeRouteHtml = (distDir, template, route, options = {}) =>
  writeHtmlFile(distDir, route.path, renderHtml(template, route, options));

const writeLocalizedRouteHtml = (distDir, template, route, lang) =>
  writeHtmlFile(distDir, localizePath(route.path, lang), renderHtml(template, route, { lang }));

const writeLegacyRedirectHtml = (distDir, template, route) => {
  const redirectPath = localizePath(route.path, 'en');
  const redirectUrl = routeUrl(redirectPath);
  const assetTags = extractAssetTags(template);
  const html = template
    .replace(/<html[^>]*>/, '<html lang="en">')
    .replace(
      /<head>[\s\S]*?<\/head>/,
      `<head>
${renderHead(route, { canonicalPath: redirectPath, noindex: true })}
    <meta http-equiv="refresh" content="0; url=${redirectPath}" />
    <script>window.location.replace(${JSON.stringify(redirectPath)} + window.location.search + window.location.hash);</script>
${assetTags}
  </head>`
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root"><a href="${redirectPath}">Continue to ${redirectUrl}</a></div>`
    );

  return writeHtmlFile(distDir, route.path, html);
};

const writeAliasRedirectHtml = (distDir, template, route, sourcePath, targetPath, lang) => {
  const targetUrl = routeUrl(targetPath);
  const assetTags = extractAssetTags(template);
  const html = template
    .replace(/<html[^>]*>/, `<html lang="${lang}">`)
    .replace(
      /<head>[\s\S]*?<\/head>/,
      `<head>
${renderHead(route, { lang, canonicalPath: targetPath, noindex: true })}
    <meta http-equiv="refresh" content="0; url=${targetPath}" />
    <script>window.location.replace(${JSON.stringify(targetPath)} + window.location.search + window.location.hash);</script>
${assetTags}
  </head>`
    )
    .replace('<div id="root"></div>', `<div id="root"><a href="${targetPath}">Continue to ${targetUrl}</a></div>`);

  return writeHtmlFile(distDir, sourcePath, html);
};

const renderSitemap = () => {
  const now = new Date().toISOString().slice(0, 10);
  const entries = seoRoutes
    .filter((route) => route.path !== '/404')
    .flatMap((route) => LANGS.map((lang) => ({ route, lang })))
    .map(
      ({ route, lang }) => `  <url>
    <loc>${routeUrl(localizePath(route.path, lang))}</loc>
    <lastmod>${now}</lastmod>
${LANGS.map(
  (alternateLang) =>
    `    <xhtml:link rel="alternate" hreflang="${alternateLang}" href="${routeUrl(localizePath(route.path, alternateLang))}" />`
).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${routeUrl(xDefaultPath(route.path))}" />
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
};

const renderRobots = () => `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const renderRedirects = () => {
  const legacyRedirects = seoRoutes
    .filter((route) => route.path !== '/' && route.path !== '/404')
    .flatMap((route) => {
      const target = localizePath(route.path, 'en');
      return [`${route.path} ${target} 301`, `${route.path}/ ${target} 301`];
    })
    .join('\n');

  const aliasRedirects = LEGACY_ALIASES.flatMap((alias) => [
    `${alias.from} ${localizePath(alias.to, 'en')} 301`,
    `${alias.from}/ ${localizePath(alias.to, 'en')} 301`,
    ...LANGS.flatMap((lang) => [
      `${localizePath(alias.from, lang)} ${localizePath(alias.to, lang)} 301`,
      `${localizePath(alias.from, lang)}/ ${localizePath(alias.to, lang)} 301`,
    ]),
  ]).join('\n');

  return `${legacyRedirects}
${aliasRedirects}

/* /404.html 404
`;
};

const main = async () => {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const distDir = path.join(rootDir, 'dist');
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const publicRoutes = seoRoutes.filter((route) => route.path !== '/404');
  const homeRoute = publicRoutes.find((route) => route.path === '/');
  const notFoundRoute = seoRoutes.find((route) => route.path === '/404');

  if (!homeRoute || !notFoundRoute) {
    throw new Error('SEO route data must include / and /404 routes.');
  }

  await Promise.all([
    writeRouteHtml(distDir, template, homeRoute, { canonicalPath: localizePath(homeRoute.path, 'en') }),
    ...publicRoutes.filter((route) => route.path !== '/').map((route) => writeLegacyRedirectHtml(distDir, template, route)),
    ...publicRoutes.flatMap((route) => LANGS.map((lang) => writeLocalizedRouteHtml(distDir, template, route, lang))),
    ...LEGACY_ALIASES.flatMap((alias) => {
      const route = publicRoutes.find((candidate) => candidate.path === alias.to);
      if (!route) throw new Error(`Legacy alias target is missing from SEO routes: ${alias.to}`);
      return [
        writeAliasRedirectHtml(distDir, template, route, alias.from, localizePath(alias.to, 'en'), 'en'),
        ...LANGS.map((lang) =>
          writeAliasRedirectHtml(
            distDir,
            template,
            route,
            localizePath(alias.from, lang),
            localizePath(alias.to, lang),
            lang
          )
        ),
      ];
    }),
  ]);

  const notFoundHtml = renderHtml(template, notFoundRoute, { noindex: true });
  await writeFile(path.join(distDir, '404.html'), notFoundHtml);
  await writeFile(path.join(distDir, 'sitemap.xml'), renderSitemap());
  await writeFile(path.join(distDir, 'robots.txt'), renderRobots());
  await writeFile(path.join(distDir, '_redirects'), renderRedirects());
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
