import { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useLanguage();
  const sections = [
    { title: t.privacy.s1Title, body: t.privacy.s1Body },
    { title: t.privacy.s2Title, body: t.privacy.s2Body },
    { title: t.privacy.s3Title, body: t.privacy.s3Body },
    { title: t.privacy.s4Title, body: t.privacy.s4Body },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            {t.privacy.linkLabel}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{t.privacy.title}</h1>
          <p className="text-lg text-gray-400 font-light">{t.privacy.subtitle}</p>
        </div>

        <div className="grid gap-6 mb-12">
          {sections.map((section) => (
            <section key={section.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-3">{t.privacy.contactTitle}</h2>
          <p className="text-gray-400 leading-relaxed">
            <a href="mailto:4gg528@gmail.com" className="text-amber-300 hover:text-amber-200 transition-colors underline">
              4gg528@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
