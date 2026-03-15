import React from 'react';
import { useLanguage } from './contexts/LanguageContext';
import { BookOpen } from 'lucide-react';

const EducationPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#EAE0D5] font-sans flex flex-col items-center justify-center px-6 animate-in fade-in duration-700">
      <div className="text-center max-w-xl">
        <div className="mx-auto w-20 h-20 mb-8 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
          <BookOpen size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300">
          {t.education.title}
        </h1>
        <p className="text-lg text-white/60 mb-8">{t.education.subtitle}</p>
        <div className="inline-block px-6 py-3 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 font-bold text-sm uppercase tracking-wider">
          {t.education.comingSoon}
        </div>
        <p className="mt-6 text-white/40 font-light leading-relaxed">
          {t.education.comingSoonDesc}
        </p>
      </div>
    </div>
  );
};

export default EducationPage;
