import { useEffect } from 'react';
import { ArrowLeft, Cpu, Terminal, Zap, Server, Code, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import arjunAvatar from '../assets/arjun-avatar.svg';

const ArjunProfile = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-amber-500/30 pt-24 pb-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Navigation */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 px-5 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group"
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16}/>
        {t.arjun.backToTeam}
      </button>

      <div className="max-w-5xl mx-auto">

        {/* Header Profile Section */}
        <div className="flex flex-col md:flex-row gap-10 items-end mb-20 border-b border-white/10 pb-10">
          <div className="relative group">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] relative bg-[#111]">
                <img
                    src={arjunAvatar}
                    alt="Arjun Patel"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white font-black uppercase text-xs px-4 py-1 rounded-full border border-black shadow-lg whitespace-nowrap">
                {t.arjun.leadBadge}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 leading-none">
              ARJUN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">PATEL</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-6">
              {t.arjun.roleTagline}
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-blue-500/50 hover:text-white transition-colors cursor-default">
                    <Server size={14} /> {t.arjun.locationLabel}
                </span>
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-blue-500/50 hover:text-white transition-colors cursor-default">
                    <Terminal size={14} /> {t.arjun.systemsLabel}
                </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-gray-300">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="text-blue-500" size={24} />
                    {t.arjun.philosophyTitle}
                </h2>
                <p>
                    {t.arjun.bio1}
                </p>
                <p>
                    {t.arjun.bio2}
                </p>
                <div className="bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg mt-4">
                    <p className="italic text-blue-100/80 text-sm">
                        {t.arjun.quote}
                    </p>
                </div>
            </div>

            <div className="md:col-span-1 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t.arjun.stackTitle}</h3>
                <SkillBar skill="C / C++ / CUDA" level={98} color="bg-blue-500" />
                <SkillBar skill="Rust (Systems)" level={95} color="bg-orange-600" />
                <SkillBar skill="Python (Internals)" level={90} color="bg-yellow-500" />
                <SkillBar skill="Distributed Systems" level={92} color="bg-purple-500" />
            </div>
        </div>

        {/* Experience & Projects */}
        <div className="grid grid-cols-1 gap-8 mb-20">
            <div className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Code size={120} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{t.arjun.contributionsTitle}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                            <Layers size={20} /> {t.arjun.cudaTitle}
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t.arjun.cudaDesc}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-white font-bold text-lg mb-2 group-hover:text-orange-300 transition-colors">
                            <Cpu size={20} /> {t.arjun.rustTitle}
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t.arjun.rustDesc}
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

const SkillBar = ({ skill, level, color }: { skill: string, level: number, color: string }) => (
    <div>
        <div className="flex justify-between text-xs font-bold uppercase text-gray-500 mb-1">
            <span>{skill}</span>
            <span>{level}%</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full shadow-[0_0_10px_rgba(255,255,255,0.3)] ${color}`} style={{ width: `${level}%` }} />
        </div>
    </div>
);

export default ArjunProfile;
