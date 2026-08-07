import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import {
  Microscope,
  Code2,
  Share2,
  Flame,
  ArrowRight,
  Ghost,
  Users,
  Brain,
  Menu,
  X
} from 'lucide-react';

import SeoManager from './components/SeoManager';
import LocalizedLink from './components/LocalizedLink';
import { usePrefersReducedMotion } from './components/usePrefersReducedMotion';
import { defaultLang, getLangFromPath, localizePath, stripLocale } from './i18n/localeRouting';

// --- Components ---

const ResearchPage = React.lazy(() => import('./Research'));
const ResearchArticlePage = React.lazy(() =>
  import('./Research').then((module) => ({ default: module.ResearchArticlePage }))
);
const AgentsPage = React.lazy(() => import('./Agents'));
const StackPage = React.lazy(() => import('./Stack'));
const MotiviPage = React.lazy(() => import('./products/MotiviPage'));
const SabyAgentPage = React.lazy(() => import('./products/SabyAgentPage'));
const TeamPage = React.lazy(() => import('./Team'));
const TimurProfile = React.lazy(() => import('./team/TimurProfile'));
const ArjunProfile = React.lazy(() => import('./team/ArjunProfile'));
const MLClubPage = React.lazy(() => import('./MLClubPage'));
const BusinessAIPage = React.lazy(() => import('./services/BusinessAIPage'));
const ConsultingPage = React.lazy(() => import('./services/ConsultingPage'));
const PrivacyPolicyPage = React.lazy(() => import('./PrivacyPolicy'));

const PageFallback = () => (
  <div className="min-h-screen bg-black text-white" aria-busy="true" />
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

// 1. ScrollToTop: Чтобы при переходе страница открывалась сверху
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
  const hiddenPaths = ['/', '/services', '/consulting', '/motivi', '/saby-agent', '/team/timur', '/team/arjun', '/ml-club'];
  const cleanPath = stripLocale(pathname);
  
  if (hiddenPaths.includes(cleanPath)) return null;

  return (
    <button 
      onClick={() => navigate(localizePath('/', getLangFromPathname(pathname)))} 
      className="fixed top-6 left-6 z-50 px-5 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group animate-in fade-in duration-500"
    >
      <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16}/>
      {t.global.backToHome}
    </button>
  );
};

const getLangFromPathname = (pathname: string) => getLangFromPath(pathname) ?? defaultLang;

// 3. Stack Item Component
interface StackItemProps {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
}
const StackItem: React.FC<StackItemProps & { icon: React.ReactNode }> = ({ name, icon, colorClass }) => (
  <div className="flex flex-col items-center gap-4 group/item cursor-default relative">
    <div className={`transform transition-all duration-300 group-hover/item:scale-110 group-hover/item:-translate-y-1 ${colorClass}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover/item:text-white/90 transition-colors">{name}</span>
  </div>
);

// --- MAIN HOME PAGE COMPONENT ---
const Home = () => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const frameRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [handleScroll]);

  // Parallax: image moves at 0.4x scroll speed; fades out over first 800px
  const parallaxY = prefersReducedMotion ? 0 : scrollY * 0.4;
  const bgOpacity = Math.max(0, 1 - scrollY / 800);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#EAE0D5] font-sans selection:bg-amber-500/30 overflow-x-hidden relative">
      {/* Background: Painting with parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* The painting */}
        <div
          className="absolute inset-0 w-full h-[150vh] bg-cover bg-top"
          style={{
            backgroundImage: "url('/background.avif')",
            transform: `translateY(-${parallaxY}px)`,
            opacity: bgOpacity,
            willChange: 'transform, opacity',
          }}
        />
        {/* Gradient overlay: painting dissolves into dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0c10]/60 to-[#0a0c10]" />
        {/* Side vignette for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/70 via-transparent to-[#0a0c10]/70" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bW9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 pt-8 pb-20">
        
        {/* Header / Navigation */}
        <header className="flex items-center justify-between mb-20 relative">
          <LocalizedLink to="/" onClick={() => setMenuOpen(false)} className="text-xl font-bold tracking-tight text-white/90 hover:text-amber-400 transition-colors cursor-pointer uppercase">
            Syurai.ai
          </LocalizedLink>

          <nav className="hidden md:block bg-[#1a1816]/40 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-[inset_0_1px_10px_rgba(0,0,0,0.2)]">
            <ul className="flex items-center gap-1 text-sm font-medium text-white/70">
              <li>
                <LocalizedLink to="/" className="block px-5 py-2 rounded-full bg-[#2a2620] text-amber-100 shadow-inner border border-amber-900/30 transition-all">
                  {t.nav.home}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/research" className="block px-5 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all">
                  {t.nav.research}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/agents" className="block px-5 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all">
                  {t.nav.agents}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/stack" className="block px-5 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all">
                  {t.nav.stack}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/team" className="block px-5 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all">
                  {t.nav.team}
                </LocalizedLink>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-[#1a1816]/40 backdrop-blur-md text-white/80 hover:text-white hover:border-white/30 transition-all"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="w-[120px] hidden md:block"></div>

          {menuOpen && (
            <nav className="absolute top-full left-0 right-0 mt-4 md:hidden bg-[#12100e]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-2xl z-50">
              <ul className="flex flex-col gap-1 text-base font-medium text-white/75">
                <li>
                  <LocalizedLink to="/" onClick={() => setMenuOpen(false)} className="block px-5 py-3 rounded-2xl bg-[#2a2620] text-amber-100 border border-amber-900/30 transition-all">
                    {t.nav.home}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink to="/research" onClick={() => setMenuOpen(false)} className="block px-5 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all">
                    {t.nav.research}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink to="/agents" onClick={() => setMenuOpen(false)} className="block px-5 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all">
                    {t.nav.agents}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink to="/stack" onClick={() => setMenuOpen(false)} className="block px-5 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all">
                    {t.nav.stack}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink to="/team" onClick={() => setMenuOpen(false)} className="block px-5 py-3 rounded-2xl hover:bg-white/5 hover:text-white transition-all">
                    {t.nav.team}
                  </LocalizedLink>
                </li>
              </ul>
            </nav>
          )}
        </header>

        {/* Hero */}
        <div className="text-center mb-24 relative">
          <h1 className="relative font-black text-[clamp(3.5rem,15vw,11rem)] tracking-tighter mb-6 select-none leading-none">
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white/60 via-amber-200/30 to-transparent blur-[40px] transform scale-105 z-0" aria-hidden="true">SYURAI</span>
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-amber-100/50 to-transparent blur-[8px] z-10" aria-hidden="true">SYURAI</span>
            <span className="relative z-20 text-transparent bg-clip-text bg-gradient-to-b from-[#fffcf7] via-[#eaddcf] to-[#bfa68a] drop-shadow-[0_2px_15px_rgba(252,211,77,0.25)]">SYURAI</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-amber-100/70 tracking-wide max-w-2xl mx-auto font-light">
            {t.home.tagline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <LocalizedLink
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-6 py-3 text-sm font-bold text-amber-100 hover:bg-amber-400/25 hover:border-amber-300/70 transition-all"
            >
              {t.home.ctaPrimary}
              <ArrowRight size={16} />
            </LocalizedLink>
            <LocalizedLink
              to="/consulting"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white/85 hover:bg-white/10 hover:border-white/40 transition-all"
            >
              {t.home.ctaSecondary}
            </LocalizedLink>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          
          {/* Research */}
          <LocalizedLink to="/research" className="group relative h-[19rem] bg-gradient-to-br from-[#12141a]/60 to-[#0a0c10]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_60px_-15px_rgba(217,119,6,0.25)]">
             <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 mb-4 text-amber-200/80 group-hover:text-amber-100 transition-colors drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  <Microscope strokeWidth={1.2} size={56} />
                </div>
                <h3 className="text-3xl font-bold text-white/90 mb-2 tracking-wide">{t.home.researchTitle}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/50 mb-4">{t.home.researchSub}</p>
                <p className="text-lg text-white/70 font-light leading-relaxed max-w-[90%]">
                  {t.home.researchDesc}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400/90 group-hover:text-amber-200 transition-colors">
                <span className="border-b-2 border-amber-500/30 pb-1 group-hover:border-amber-300">{t.home.researchCta}</span>
              </div>
            </div>
          </LocalizedLink>

          {/* Agents */}
          <LocalizedLink to="/agents" className="group relative h-[19rem] bg-gradient-to-br from-[#12141a]/60 to-[#0a0c10]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-0 overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_60px_-15px_rgba(217,119,6,0.25)] flex">
              <div className="p-8 flex flex-col justify-between w-[45%] z-10">
                <h3 className="text-3xl font-bold text-white/90 tracking-wide">{t.home.agentsTitle}</h3>
                <div className="w-24 h-24 relative opacity-50 group-hover:opacity-80 transition-opacity">
                  <Ghost strokeWidth={0.8} className="w-full h-full text-amber-100/40 animate-pulse duration-[4000ms]" />
                </div>
              </div>
              <div className="w-[55%] bg-[#07080a] border-l border-white/10 relative overflow-hidden font-sans text-[11px] leading-5 text-white/60 p-5 flex flex-col gap-1 shadow-inner">
                {/* Dashboard simulation */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.01)_2px)] bg-[length:100%_4px] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent opacity-70"></div>
                <div className="flex justify-between border-b border-white/5 pb-2 mb-2 text-amber-500/90 font-bold uppercase tracking-wider text-[10px]">
                    <span>PID</span><span>MEM</span><span>CPU</span>
                </div>
                <div className="flex justify-between items-center"><span className="text-blue-300 font-medium">0821</span><span className="text-green-300">124Mb</span><span className="text-amber-300">0.2%</span></div>
                <div className="flex justify-between items-center opacity-50"><span>0492</span><span>064Mb</span><span>0.0%</span></div>
                <div className="flex justify-between items-center"><span className="text-blue-300 font-medium">9921</span><span className="text-green-300">512Mb</span><span className="text-amber-300">1.4%</span></div>
                <div className="flex justify-between items-center bg-white/5 -mx-5 px-5 py-1 my-1"><span className="text-blue-400 font-bold">1102</span><span className="text-green-400 font-bold">1024Mb</span><span className="text-amber-400 font-bold">4.5%</span></div>
                <div className="flex justify-between items-center opacity-50"><span>3321</span><span>012Mb</span><span>0.1%</span></div>
                <div className="mt-auto pt-2 text-amber-500 font-bold flex items-center text-xs">
                  <span className="mr-2">●</span> {t.home.agentSwarmActive}
                </div>
              </div>
          </LocalizedLink>

          {/* Stack */}
          <LocalizedLink to="/stack" className="group relative h-[19rem] bg-gradient-to-br from-[#12141a]/60 to-[#0a0c10]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_60px_-15px_rgba(217,119,6,0.25)] flex flex-col justify-between">
            <h3 className="text-3xl font-bold text-white/90 tracking-wide">{t.home.stackTitle}</h3>
            <div className="flex items-end justify-between px-4 pb-2">
              <StackItem name="Python" colorClass="text-[#3776AB] drop-shadow-[0_0_8px_rgba(55,118,171,0.5)]" icon={<Code2 size={42} />} />
              <StackItem name="Polars" colorClass="text-[#CD792C] drop-shadow-[0_0_8px_rgba(205,121,44,0.5)]" icon={<Share2 size={42} />} />
              <StackItem name="PyTorch" colorClass="text-[#EE4C2C] drop-shadow-[0_0_8px_rgba(238,76,44,0.5)]" icon={<Flame size={42} />} />
              <StackItem name="Hugging Face" colorClass="" icon={<span className="text-4xl filter grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all drop-shadow-[0_0_8px_rgba(255,217,0,0.5)]">🤗</span>} />
            </div>
            <div className="absolute top-8 right-8 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-xs uppercase tracking-widest flex items-center gap-1">
              {t.home.stackViewAll} <ArrowRight size={12} />
            </div>
          </LocalizedLink>

          {/* Team */}
          <LocalizedLink to="/team" className="group relative h-[19rem] bg-gradient-to-br from-[#12141a]/60 to-[#0a0c10]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_60px_-15px_rgba(217,119,6,0.25)] flex flex-col">
             <div className="flex justify-between items-start">
                <h3 className="text-3xl font-bold text-white/90 mb-6 tracking-wide">{t.home.teamTitle}</h3>
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500 group-hover:text-white group-hover:bg-amber-500 transition-all">
                    <Users size={24} />
                </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-end">
                <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                  {t.home.teamDesc}
                </p>
                <div className="flex items-center gap-3">
                   {/* Avatar Pile Updated */}
                   <div className="flex -space-x-3">
                    {/* Тимур - Маг/Визионер */}
                    <div className="w-10 h-10 rounded-full border-2 border-[#12141a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden hover:z-10 transition-all hover:scale-110">
                        <img 
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Mage%20Light%20Skin%20Tone.png" 
                            alt="Timur (Visionary)" 
                            className="w-8 h-8 object-contain" 
                        />
                    </div>
                    {/* Arjun - Инженер/Хакер */}
                    <div className="w-10 h-10 rounded-full border-2 border-[#12141a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden hover:z-10 transition-all hover:scale-110">
                        <img 
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Medium%20Skin%20Tone.png" 
                            alt="Arjun (Engineer)" 
                            className="w-8 h-8 object-contain" 
                        />
                  </div>
                </div>
                   <div className="text-xs font-bold text-amber-500 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                       {t.home.teamHiring}
                   </div>
                </div>
            </div>
          </LocalizedLink>

          {/* ML Club */}
          <LocalizedLink to="/ml-club" className="group relative h-[19rem] bg-gradient-to-br from-[#12141a]/60 to-[#0a0c10]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:border-violet-500/40 hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.25)] flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('/backml.avif')] bg-cover bg-center opacity-15 group-hover:opacity-25 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 mb-4 text-violet-300/80 group-hover:text-violet-200 transition-colors drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  <Brain strokeWidth={1.2} size={56} />
                </div>
                <h3 className="text-3xl font-bold text-white/90 mb-2 tracking-wide">{t.home.mlclubTitle}</h3>
                <p className="text-lg text-white/60 font-light">{t.home.mlclubDesc}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-violet-400/90 group-hover:text-violet-200 transition-colors">
                <span className="border-b-2 border-violet-500/30 pb-1 group-hover:border-violet-300">KZN</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </LocalizedLink>

        </div>
      </div>
    </div>
  );
};

// --- 404 Component ---
const NotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="p-10 text-white">
      {t.global.notFound} <LocalizedLink to="/" className="underline text-amber-500">{t.global.goHome}</LocalizedLink>
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

  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <LegacyLocaleRedirect />
      <GlobalBackButton />
      
      <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:lang" element={<LocaleRoute><Home /></LocaleRoute>} />
        
        {/* Sub-pages wrapped in standard black layout */}
        <Route path="/research" element={
            <div className="min-h-screen bg-black font-sans">
                <ResearchPage />
            </div>
        } />
        <Route path="/:lang/research" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <ResearchPage />
            </div>
        </LocaleRoute>} />

        <Route path="/research/:paperId" element={
            <div className="min-h-screen bg-black font-sans">
                <ResearchArticlePage />
            </div>
        } />
        <Route path="/:lang/research/:paperId" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <ResearchArticlePage />
            </div>
        </LocaleRoute>} />
        
        <Route path="/agents" element={
            <div className="min-h-screen bg-black font-sans">
                {/* Передаем навигацию через функцию для совместимости со старым кодом Agents.tsx */}
                <AgentsPage
                  onNavigateToMotivi={() => navigateLocalized('/motivi')}
                  onNavigateToSabyAgent={() => navigateLocalized('/saby-agent')}
                />
            </div>
        } />
        <Route path="/:lang/agents" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <AgentsPage
                  onNavigateToMotivi={() => navigateLocalized('/motivi')}
                  onNavigateToSabyAgent={() => navigateLocalized('/saby-agent')}
                />
            </div>
        </LocaleRoute>} />

        <Route path="/services" element={
            <div className="min-h-screen bg-black font-sans">
                <BusinessAIPage onBack={() => navigateLocalized('/')} />
            </div>
        } />
        <Route path="/:lang/services" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <BusinessAIPage onBack={() => navigateLocalized('/')} />
            </div>
        </LocaleRoute>} />

        <Route path="/consulting" element={
            <div className="min-h-screen bg-black font-sans">
                <ConsultingPage onBack={() => navigateLocalized('/')} />
            </div>
        } />
        <Route path="/:lang/consulting" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <ConsultingPage onBack={() => navigateLocalized('/')} />
            </div>
        </LocaleRoute>} />

        <Route path="/privacy" element={
            <div className="min-h-screen bg-black font-sans">
                <PrivacyPolicyPage />
            </div>
        } />
        <Route path="/:lang/privacy" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <PrivacyPolicyPage />
            </div>
        </LocaleRoute>} />
        
        <Route path="/motivi" element={
             <div className="min-h-screen bg-black font-sans">
                <MotiviPage onBack={() => navigateLocalized('/agents')} />
             </div>
        } />
        <Route path="/:lang/motivi" element={<LocaleRoute>
             <div className="min-h-screen bg-black font-sans">
                <MotiviPage onBack={() => navigateLocalized('/agents')} />
             </div>
        </LocaleRoute>} />

        <Route path="/saby-agent" element={
             <div className="min-h-screen bg-black font-sans">
                <SabyAgentPage onBack={() => navigateLocalized('/agents')} />
             </div>
        } />
        <Route path="/:lang/saby-agent" element={<LocaleRoute>
             <div className="min-h-screen bg-black font-sans">
                <SabyAgentPage onBack={() => navigateLocalized('/agents')} />
             </div>
        </LocaleRoute>} />
        
        <Route path="/stack" element={
            <div className="min-h-screen bg-black font-sans">
                <StackPage />
            </div>
        } />
        <Route path="/:lang/stack" element={<LocaleRoute>
            <div className="min-h-screen bg-black font-sans">
                <StackPage />
            </div>
        </LocaleRoute>} />
        
        <Route path="/team" element={
             <div className="min-h-screen bg-black font-sans">
                <TeamPage 
                    onNavigateToTimur={() => navigateLocalized('/team/timur')}
                    onNavigateToArjun={() => navigateLocalized('/team/arjun')}
                />
             </div>
        } />
        <Route path="/:lang/team" element={<LocaleRoute>
             <div className="min-h-screen bg-black font-sans">
                <TeamPage 
                    onNavigateToTimur={() => navigateLocalized('/team/timur')}
                    onNavigateToArjun={() => navigateLocalized('/team/arjun')}
                />
             </div>
        </LocaleRoute>} />

        <Route path="/team/timur" element={<TimurProfile onBack={() => navigateLocalized('/team')} />} />
        <Route path="/team/arjun" element={<ArjunProfile onBack={() => navigateLocalized('/team')} />} />
        <Route path="/:lang/team/timur" element={<LocaleRoute><TimurProfile onBack={() => navigateLocalized('/team')} /></LocaleRoute>} />
        <Route path="/:lang/team/arjun" element={<LocaleRoute><ArjunProfile onBack={() => navigateLocalized('/team')} /></LocaleRoute>} />

        <Route path="/ml-club" element={
             <div className="min-h-screen bg-black font-sans">
                <MLClubPage onBack={() => navigateLocalized('/')} />
             </div>
        } />
        <Route path="/:lang/ml-club" element={<LocaleRoute>
             <div className="min-h-screen bg-black font-sans">
                <MLClubPage onBack={() => navigateLocalized('/')} />
             </div>
        </LocaleRoute>} />

        {/* 404 Redirect */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
};

export default App;
