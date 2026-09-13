import React, { Suspense, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

import SeoManager from './components/SeoManager';
import LocalizedLink from './components/LocalizedLink';
import { defaultLang, getLangFromPath, localizePath, stripLocale } from './i18n/localeRouting';

// --- Components ---

const FunctionHome = React.lazy(() => import('./fx/FunctionHome'));
const ResearchPage = React.lazy(() => import('./Research'));
const ResearchArticlePage = React.lazy(() =>
  import('./Research').then((module) => ({ default: module.ResearchArticlePage }))
);
const AgentsPage = React.lazy(() => import('./Agents'));
const StackPage = React.lazy(() => import('./Stack'));
const MotiviPage = React.lazy(() => import('./products/MotiviPage'));
const VibeDokuPage = React.lazy(() => import('./products/VibeDokuPage'));
const TeamPage = React.lazy(() => import('./Team'));
const TimurProfile = React.lazy(() => import('./team/TimurProfile'));
const ArjunProfile = React.lazy(() => import('./team/ArjunProfile'));
const MLClubPage = React.lazy(() => import('./MLClubPage'));
const BusinessAIPage = React.lazy(() => import('./services/BusinessAIPage'));
const ConsultingPage = React.lazy(() => import('./services/ConsultingPage'));
const ComputePage = React.lazy(() => import('./services/ComputePage'));
const PrivacyPolicyPage = React.lazy(() => import('./PrivacyPolicy'));

const PageFallback = () => (
  <div className="min-h-screen bg-paper" aria-busy="true" />
);

const LegacyLocaleRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLangFromPath(pathname) && stripLocale(pathname) !== '/') {
      navigate(`${localizePath(pathname, defaultLang)}${search}${hash}`, { replace: true });
    }
  }, [hash, navigate, pathname, search]);

  return null;
};

// 1. ScrollToTop: чтобы при переходе страница открывалась сверху
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. Global Back Button (Fixed)
// Показывается везде, КРОМЕ главной, профилей и продуктов (у них свои кнопки)
const GlobalBackButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Скрываем кнопку на этих путях
  const hiddenPaths = ['/', '/services', '/consulting', '/compute', '/motivi', '/vibe-doku', '/saby-agent', '/team/timur', '/team/arjun', '/ml-club'];
  const cleanPath = stripLocale(pathname);

  if (hiddenPaths.includes(cleanPath)) return null;

  return (
    <button
      onClick={() => navigate(localizePath('/', getLangFromPathname(pathname)))}
      className="fixed top-6 left-6 z-50 flex items-center gap-2 border border-ink/25 bg-paper/90 px-4 py-2 font-fmono text-[11px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:border-ink/60 hover:text-ink"
    >
      <ArrowRight className="rotate-180 transition-transform group-hover:-translate-x-1" size={13}/>
      {t.global.backToHome}
    </button>
  );
};

const getLangFromPathname = (pathname: string) => getLangFromPath(pathname) ?? defaultLang;

const LegacyVibeDokuRedirect = () => {
  const { pathname } = useLocation();
  return <Navigate to={localizePath('/vibe-doku', getLangFromPathname(pathname))} replace />;
};

// --- 404 Component ---
const NotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper p-10 font-fserif text-ink">
      <p>
        {t.global.notFound}{' '}
        <LocalizedLink to="/" className="fx-link text-accent">{t.global.goHome}</LocalizedLink>
      </p>
    </div>
  );
};

const LocaleRoute = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  if (lang !== 'en' && lang !== 'ru') return <NotFound />;
  return <>{children}</>;
};

// --- APP ROUTING ---
const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navigateLocalized = (path: string) => navigate(localizePath(path, getLangFromPathname(pathname)));

  // Главная живёт в системной теме (light/dark); внутренние страницы
  // исторически свёрстаны в тёмной палитре — форсируем её через токены.
  const isHome = stripLocale(pathname) === '/';

  return (
    <div data-theme={isHome ? undefined : 'dark'}>
      <ScrollToTop />
      <SeoManager />
      <LegacyLocaleRedirect />
      <GlobalBackButton />

      <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<FunctionHome />} />
        <Route path="/:lang" element={<LocaleRoute><FunctionHome /></LocaleRoute>} />

        <Route path="/research" element={<ResearchPage />} />
        <Route path="/:lang/research" element={<LocaleRoute><ResearchPage /></LocaleRoute>} />

        <Route path="/research/:paperId" element={<ResearchArticlePage />} />
        <Route path="/:lang/research/:paperId" element={<LocaleRoute><ResearchArticlePage /></LocaleRoute>} />

        <Route path="/agents" element={
            <AgentsPage
              onNavigateToMotivi={() => navigateLocalized('/motivi')}
              onNavigateToVibeDoku={() => navigateLocalized('/vibe-doku')}
            />
        } />
        <Route path="/:lang/agents" element={<LocaleRoute>
            <AgentsPage
              onNavigateToMotivi={() => navigateLocalized('/motivi')}
              onNavigateToVibeDoku={() => navigateLocalized('/vibe-doku')}
            />
        </LocaleRoute>} />

        <Route path="/services" element={<BusinessAIPage onBack={() => navigateLocalized('/')} />} />
        <Route path="/:lang/services" element={<LocaleRoute>
            <BusinessAIPage onBack={() => navigateLocalized('/')} />
        </LocaleRoute>} />

        <Route path="/consulting" element={<ConsultingPage onBack={() => navigateLocalized('/')} />} />
        <Route path="/:lang/consulting" element={<LocaleRoute>
            <ConsultingPage onBack={() => navigateLocalized('/')} />
        </LocaleRoute>} />

        <Route path="/compute" element={<ComputePage onBack={() => navigateLocalized('/')} />} />
        <Route path="/:lang/compute" element={<LocaleRoute>
            <ComputePage onBack={() => navigateLocalized('/')} />
        </LocaleRoute>} />

        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/:lang/privacy" element={<LocaleRoute><PrivacyPolicyPage /></LocaleRoute>} />

        <Route path="/motivi" element={<MotiviPage onBack={() => navigateLocalized('/agents')} />} />
        <Route path="/:lang/motivi" element={<LocaleRoute>
             <MotiviPage onBack={() => navigateLocalized('/agents')} />
        </LocaleRoute>} />

        <Route path="/vibe-doku" element={<VibeDokuPage onBack={() => navigateLocalized('/agents')} />} />
        <Route path="/:lang/vibe-doku" element={<LocaleRoute>
            <VibeDokuPage onBack={() => navigateLocalized('/agents')} />
        </LocaleRoute>} />
        <Route path="/saby-agent" element={<LegacyVibeDokuRedirect />} />
        <Route path="/:lang/saby-agent" element={<LocaleRoute><LegacyVibeDokuRedirect /></LocaleRoute>} />

        <Route path="/stack" element={<StackPage />} />
        <Route path="/:lang/stack" element={<LocaleRoute><StackPage /></LocaleRoute>} />

        <Route path="/team" element={
            <TeamPage
                onNavigateToTimur={() => navigateLocalized('/team/timur')}
                onNavigateToArjun={() => navigateLocalized('/team/arjun')}
            />
        } />
        <Route path="/:lang/team" element={<LocaleRoute>
            <TeamPage
                onNavigateToTimur={() => navigateLocalized('/team/timur')}
                onNavigateToArjun={() => navigateLocalized('/team/arjun')}
            />
        </LocaleRoute>} />

        <Route path="/team/timur" element={<TimurProfile onBack={() => navigateLocalized('/team')} />} />
        <Route path="/team/arjun" element={<ArjunProfile onBack={() => navigateLocalized('/team')} />} />
        <Route path="/:lang/team/timur" element={<LocaleRoute><TimurProfile onBack={() => navigateLocalized('/team')} /></LocaleRoute>} />
        <Route path="/:lang/team/arjun" element={<LocaleRoute><ArjunProfile onBack={() => navigateLocalized('/team')} /></LocaleRoute>} />

        <Route path="/ml-club" element={<MLClubPage onBack={() => navigateLocalized('/')} />} />
        <Route path="/:lang/ml-club" element={<LocaleRoute>
             <MLClubPage onBack={() => navigateLocalized('/')} />
        </LocaleRoute>} />

        {/* 404 Redirect */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </div>
  );
};

export default App;
