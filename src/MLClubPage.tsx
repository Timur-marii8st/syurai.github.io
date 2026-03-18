import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import { ArrowRight, MessageCircle, Calendar, Zap } from 'lucide-react';

// Fade-in on scroll
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface MLClubPageProps {
  onBack: () => void;
}

const MLClubPage: React.FC<MLClubPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const parallaxY = scrollY * 0.4;
  const bgOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#EAE0D5] font-sans selection:bg-violet-500/30 overflow-x-hidden relative animate-in fade-in duration-700">
      {/* Background: parallax painting */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[150vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('/backml.avif')",
            transform: `translateY(-${parallaxY}px)`,
            opacity: bgOpacity,
            willChange: 'transform, opacity',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/40 via-[#0a0c10]/70 to-[#0a0c10]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/60 via-transparent to-[#0a0c10]/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bW9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="fixed top-6 left-6 z-50 px-5 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
          {t.mlclub.backToHome}
        </button>

        {/* Hero */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          {/* ML CLUB — massive title */}
          <h1 className="relative font-black text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-tighter leading-[0.85] select-none mb-8">
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-violet-400/60 via-blue-300/30 to-transparent blur-[50px] transform scale-105 z-0" aria-hidden="true">
              ML CLUB
            </span>
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-violet-300/80 via-blue-200/40 to-transparent blur-[10px] z-10" aria-hidden="true">
              ML CLUB
            </span>
            <span className="relative z-20 text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6ff] via-[#c4b5fd] to-[#7c3aed] drop-shadow-[0_2px_20px_rgba(139,92,246,0.4)]">
              ML CLUB
            </span>
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-violet-200/90 tracking-wider uppercase mb-4">
            {t.mlclub.subtitle}
          </p>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed">
            {t.mlclub.mission}
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 animate-bounce text-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 pb-32">

          {/* What we do */}
          <FadeInSection className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-gradient-to-br from-[#12141a]/80 to-[#0a0c10]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 hover:border-violet-500/40 hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.25)] transition-all duration-500">
                <Calendar className="text-violet-400 mb-4" size={36} strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white/90 mb-2">{t.mlclub.meetingsTitle}</h3>
                <p className="text-white/60 font-light leading-relaxed">{t.mlclub.meetingsDesc}</p>
              </div>

              <a
                href="https://t.me/kznmlchat"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-[#12141a]/80 to-[#0a0c10]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 hover:border-blue-500/40 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.25)] transition-all duration-500"
              >
                <MessageCircle className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={36} strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white/90 mb-2">{t.mlclub.joinChat}</h3>
                <p className="text-white/60 font-light leading-relaxed mb-4">{t.mlclub.joinChatDesc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                  t.me/kznmlchat
                </span>
              </a>

              <div className="group bg-gradient-to-br from-[#12141a]/80 to-[#0a0c10]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 hover:border-amber-500/40 hover:shadow-[0_0_60px_-15px_rgba(217,119,6,0.25)] transition-all duration-500">
                <Zap className="text-amber-400 mb-4" size={36} strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white/90 mb-2">AI & ML</h3>
                <p className="text-white/60 font-light leading-relaxed">Deep Learning, NLP, Computer Vision, LLMs, Reinforcement Learning, Kaggle, Hackathons</p>
              </div>
            </div>
          </FadeInSection>

          {/* Photo gallery */}
          <FadeInSection className="mb-20" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-10 text-center tracking-wide">
              {t.mlclub.galleryTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-violet-500/30 transition-all duration-500">
                <img
                  src="/hackaml.JPG"
                  alt="Hackathon"
                  className="w-full h-[22rem] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-sm font-bold text-violet-300 uppercase tracking-wider">{t.mlclub.hackathonCaption}</span>
                </div>
              </div>

              <div className="group relative rounded-[2rem] overflow-hidden border border-white/10 hover:border-violet-500/30 transition-all duration-500">
                <img
                  src="/mlclub-people.jpg"
                  alt="ML Club Meetup"
                  className="w-full h-[22rem] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-sm font-bold text-violet-300 uppercase tracking-wider">{t.mlclub.meetupCaption}</span>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection delay={300}>
            <div className="text-center">
              <a
                href="https://t.me/kznmlchat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] hover:scale-105"
              >
                <MessageCircle size={22} />
                {t.mlclub.joinChat}
              </a>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default MLClubPage;
