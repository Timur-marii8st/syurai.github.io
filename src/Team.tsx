import React, { useEffect } from 'react';
import { ArrowRight, UserPlus, Fingerprint, Code2 } from 'lucide-react';
import timurPhoto from './assets/timur-s.webp';
import { useLanguage } from './contexts/LanguageContext';

interface TeamPageProps {
  onNavigateToTimur: () => void;
  onNavigateToArjun: () => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onNavigateToTimur, onNavigateToArjun }) => {
  useEffect(() => {
     window.scrollTo(0, 0);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{t.team.title}</h2>
            <p className="text-xl text-gray-400 max-w-xl font-light">
              {t.team.subtitle.split('\n')[0]} <br/>{t.team.subtitle.split('\n')[1]}
            </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">

          {/* 1. Timur Card (Main Founder) - Spans 2 cols */}
          <div
            onClick={onNavigateToTimur}
            className="group relative col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden cursor-pointer bg-[#0e0e0e] border border-white/10 hover:border-amber-500/50 transition-all duration-500"
          >
             {/* Background Image/Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-90" />

             {/* Image */}
             <div className="absolute inset-0 flex justify-end">
                <img
                    src={timurPhoto}
                    alt="Timur Sabitov"
                    className="h-full w-full md:w-2/3 object-cover object-center md:object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
             </div>

             {/* Content */}
             <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                   {t.team.founderLabel}
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 leading-none uppercase">
                    Timur<br/>Sabitov
                </h3>
                <p className="text-gray-300 text-sm md:text-base mb-6 max-w-sm font-light leading-relaxed">
                    {t.team.timurRole}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    {t.team.viewProfile} <ArrowRight size={16} />
                </div>
             </div>
          </div>

          {/* 2. Arjun Card (Lead Engineer) - 1 Col */}
          <div
            onClick={onNavigateToArjun}
            className="group relative col-span-1 row-span-1 rounded-3xl overflow-hidden cursor-pointer bg-[#0e0e0e] border border-white/10 hover:border-blue-500/50 transition-all duration-500"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />

             <div className="absolute inset-0 flex justify-center items-start pt-4">
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=c0aede&skinColor=brown"
                    alt="Arjun Patel"
                    className="h-[120%] w-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
             </div>

             <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <div className="inline-flex items-center gap-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                   <Code2 size={10} /> {t.team.systemsLeadLabel}
                </div>
                <h3 className="text-2xl font-black text-white mb-1 leading-none uppercase">
                    Arjun<br/>Patel
                </h3>
                <p className="text-gray-400 text-xs font-mono mb-4">
                    {t.team.arjunTech}
                </p>
             </div>
          </div>
           <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScQPwfyjVZwOOMhb9_oZuNXdgihatNQmLAUfnrt3_ZWIFog0Q/viewform?usp=headerd"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative col-span-1 md:col-span-3 lg:col-span-1 bg-[#050505] border border-dashed border-white/10 hover:border-white/30 rounded-3xl p-6 flex flex-col justify-center items-center text-center transition-all duration-300 hover:bg-white/[0.02] cursor-pointer"
          >
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <UserPlus size={24} className="text-gray-600 group-hover:text-white transition-colors" />
             </div>

             <h3 className="text-lg font-bold text-white mb-1">{t.team.joinCore}</h3>
             <p className="text-gray-500 text-xs mb-4 max-w-[200px]">
                {t.team.lookingFor}
             </p>

             <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 font-bold rounded-full text-xs hover:bg-white hover:text-black transition-all">
                {t.team.applyNow} <Fingerprint size={14} />
             </span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default TeamPage;
