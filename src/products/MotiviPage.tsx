import React, { useEffect, useRef, useState } from 'react';
import {
  Brain, Calendar, Activity, Mic, Shield, Zap, ArrowLeft, Star
} from 'lucide-react';
import MotiviChat from '../assets/motivi_chat.webp';
import { useLanguage } from '../../contexts/LanguageContext';

// --- Animation Helper: Fade In on Scroll ---
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 }); // Trigger when 10% visible

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Sub-components ---
const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-gradient-to-br from-white/5 to-transparent border border-amber-500/10 hover:border-amber-500/30 p-6 rounded-2xl transition-all hover:bg-white/10 group">
    <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-amber-500/50 transition-colors cursor-default">
    {children}
  </span>
);

// --- Main Page ---
const MotiviPage = ({ onBack }: { onBack: () => void }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-amber-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 mix-blend-difference text-white flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:text-amber-400 transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} /> {t.motivi.backToAgents}
        </button>
        <div className="font-bold tracking-tighter text-xl">MOTIVI_AI</div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Warm ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-black to-black z-0 pointer-events-none" />
        <div className="absolute top-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wide mb-6 uppercase">
              <Zap size={12} fill="currentColor" /> {t.motivi.badge}
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
              {t.motivi.heroLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">{t.motivi.heroLine2}</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t.motivi.heroDesc}
            </p>
          </FadeInSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-gray-600">
           ↓
        </div>
      </div>

      {/* Image Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 mb-32">
        <FadeInSection delay={300}>
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-amber-900/20 aspect-video relative group">
             {/* Placeholder for future screenshot */}
             <img
               src={MotiviChat}
               alt="Motivi Interface"
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
             <div className="absolute bottom-8 left-8">
               <p className="text-white font-bold text-xl">{t.motivi.screenshotCaption}</p>
               <p className="text-gray-400 text-sm">{t.motivi.screenshotSub}</p>
             </div>
          </div>
        </FadeInSection>
      </div>

      {/* Key Features Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-white mb-16 border-l-4 border-amber-500 pl-6">
            {t.motivi.featuresTitle}
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FadeInSection delay={100}>
            <FeatureCard
              icon={<Brain size={32} />}
              title={t.motivi.memoryTitle}
              desc={t.motivi.memoryDesc}
            />
          </FadeInSection>

          <FadeInSection delay={200}>
            <FeatureCard
              icon={<Activity size={32} />}
              title={t.motivi.proactiveTitle}
              desc={t.motivi.proactiveDesc}
            />
          </FadeInSection>

          <FadeInSection delay={300}>
            <FeatureCard
              icon={<Calendar size={32} />}
              title={t.motivi.calendarTitle}
              desc={t.motivi.calendarDesc}
            />
          </FadeInSection>

          <FadeInSection delay={400}>
            <FeatureCard
              icon={<Star size={32} />}
              title={t.motivi.habitTitle}
              desc={t.motivi.habitDesc}
            />
          </FadeInSection>

          <FadeInSection delay={500}>
            <FeatureCard
              icon={<Mic size={32} />}
              title={t.motivi.multimodalTitle}
              desc={t.motivi.multimodalDesc}
            />
          </FadeInSection>

          <FadeInSection delay={600}>
            <FeatureCard
              icon={<Shield size={32} />}
              title={t.motivi.secureTitle}
              desc={t.motivi.secureDesc}
            />
          </FadeInSection>
        </div>
      </div>

      {/* Tech Stack Marquee / List */}
      <div className="border-y border-white/5 bg-white/[0.02] py-20 mb-32">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-bold text-white mb-4">{t.motivi.techTitle}<br /><span className="text-amber-500">{t.motivi.techAccent}</span></h2>
                <p className="text-gray-400 text-sm">
                  {t.motivi.techDesc}
                </p>
              </div>
              <div className="md:w-2/3 flex flex-wrap gap-3">
                <TechBadge>Python 3.11</TechBadge>
                <TechBadge>Aiogram 3.x</TechBadge>
                <TechBadge>PostgreSQL 16</TechBadge>
                <TechBadge>pgvector</TechBadge>
                <TechBadge>Docker Compose</TechBadge>
                <TechBadge>Async SQLAlchemy</TechBadge>
                <TechBadge>Google Tink</TechBadge>
                <TechBadge>OpenRouter</TechBadge>
                <TechBadge>APScheduler</TechBadge>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* CTA / Footer */}
      <div className="max-w-4xl mx-auto px-4 text-center pb-32">
        <FadeInSection>
          <div className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">{t.motivi.ctaTitle}</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              {t.motivi.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/motivi_ai_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap size={20} className="text-amber-600" fill="currentColor" />
                {t.motivi.ctaPrimary}
              </a>
              <a
                href="https://github.com/Timur-marii8st/Motivi-Ai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              >
                {t.motivi.ctaSecondary}
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>

    </div>
  );
};

export default MotiviPage;
