import { useEffect } from 'react';
import { ArrowLeft, Brain, Cpu, Globe, Github, Mail, Sparkles, Award, FileText } from 'lucide-react';
import timurPhoto from '../assets/timur-s.webp';
import { useLanguage } from '../contexts/LanguageContext';

const TimurProfile = ({ onBack }: { onBack: () => void }) => {
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
        {t.timur.backToTeam}
      </button>

      <div className="max-w-5xl mx-auto">
        
        {/* Header Profile Section */}
        <div className="flex flex-col md:flex-row gap-10 items-end mb-20 border-b border-white/10 pb-10">
          <div className="relative group">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] relative bg-[#111]">
                <img 
                    src={timurPhoto} 
                    alt="Timur Sabitov" 
                    className="w-full h-full object-cover transition-all duration-700"
                />
            </div>
            {/* Декоративный элемент "Founder" */}
            <div className="absolute -bottom-4 -right-4 bg-amber-600 text-black font-black uppercase text-xs px-4 py-1 rounded-full border border-black shadow-lg">
                Founder
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 leading-none">
              TIMUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700">SABITOV</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-6">
              {t.timur.role}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors cursor-default">
                    <Globe size={14} /> {t.timur.location}
                </span>
                <a href="mailto:4gg528@gmail.com" className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors">
                    <Mail size={14} /> {t.global.contactDirect}
                </a>
                <a href="https://github.com/Timur-marii8st" target="_blank" className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors">
                    <Github size={14} /> GitHub
                </a>
                <a href="https://drive.google.com/file/d/1eyXqbGstkaMxQT4B3WtU0BuUfMVTxJOL/view?usp=sharing" target="_blank" className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors">
                    <FileText size={14} /> Resume
                </a>
            </div>
          </div>
        </div>

        {/* Vision / Bio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-gray-300">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={24} /> 
                    Vision & Architecture
                </h2>
                <p>
                    ML Engineer and independent AI researcher with end-to-end experience shipping ML systems to production. Specializing in <strong>LLMs, NLP, multi-agent systems, and mechanistic interpretability</strong>. Author of a research paper on implicit psychological models in LLMs using Sparse Autoencoders (arXiv, pending). Open-source contributor to <strong>Sakana AI (ShinkaEvolve)</strong>.
                </p>
                <p>
                    Founder of <span className="text-white font-bold">Syurai Lab</span> — an independent AI research lab focused on agentic AI and interpretability. Currently working as AI Architect / ML Engineer at <strong>IT Park Tatarstan</strong>, designing end-to-end procurement automation systems with integrated LLM pipelines. Previously architected async inference services and full-stack ML pipelines at AI Manager startup, achieving <strong>5-10x ETL speedup</strong> with Polars.
                </p>
                <div className="bg-amber-900/10 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
                    <p className="italic text-amber-100/80 text-sm">
                        "The future of AI isn't just bigger parameters. It's about interpretable latent spaces and efficient, biological-inspired memory retrieval."
                    </p>
                </div>
            </div>
            
            <div className="md:col-span-1 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Core Competencies</h3>
                <SkillBar skill="LLM / NLP / RAG" level={98} />
                <SkillBar skill="Multi-Agent Systems" level={95} />
                <SkillBar skill="Mechanistic Interpretability" level={92} />
                <SkillBar skill="PyTorch / ML Pipelines" level={96} />
                <SkillBar skill="Polars / Data Engineering" level={99} />
            </div>
        </div>

        {/* Projects & Research */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Research Card */}
            <div className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Brain size={120} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Research Breakthroughs</h3>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">Published / Pre-print</p>
                
                <ul className="space-y-6">
                    <li>
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-amber-300 transition-colors">Do Language Models Build Implicit Psychological Models of Speakers?</div>
                        <p className="text-sm text-gray-400">
                            Evidence from Sparse Autoencoder Latents — arXiv (pending endorsement). Investigated whether LLMs (Gemma 3 4B) encode implicit psychological speaker models detectable via Sparse Autoencoders, contributing to mechanistic interpretability research.
                        </p>
                    </li>
                    <li>
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-amber-300 transition-colors">Hierarchical Memory for Agents</div>
                        <p className="text-sm text-gray-400">
                            Ongoing R&D: hierarchical optimized memory for AI agents and mechanistic interpretability of LLMs.
                        </p>
                    </li>
                </ul>
            </div>

            {/* Engineering Card */}
            <div className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Cpu size={120} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Engineering Feats</h3>
                <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">Production & Implementation</p>
                
                <ul className="space-y-6">
                    <li>
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors">SwarmForge — AI-Native IT Platform</div>
                        <p className="text-sm text-gray-400">
                            Hierarchical multi-agent architecture: <strong>Opus → Sonnet → Haiku</strong> orchestrating a fully digital IT company with AI agents as employees. Built with FastAPI, Celery, Redis, PostgreSQL, Next.js.
                        </p>
                    </li>
                    <li>
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors">Wikki Agent (Edge AI)</div>
                        <p className="text-sm text-gray-400">
                            Local AI agent with RAG for private documents. <strong>Rust/Tauri</strong> for minimal-RAM edge inference. Function Calling + MCP server for tool-augmented generation without fine-tuning.
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        {/* Awards / Hackathons */}
        <div className="border border-white/10 rounded-2xl p-6 flex items-center gap-6 bg-[#050505]">
            <Award className="text-yellow-500 shrink-0" size={40} />
            <div>
                <h4 className="text-white font-bold text-lg">Open Source & Community</h4>
                <p className="text-gray-500 text-sm">
                    Core contributor to Sakana AI (ShinkaEvolve). Founder of ML Club at School 21 (Sber). CTG Analyzer achieving 0.9796 PR-AUC in medical diagnostics.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

const SkillBar = ({ skill, level }: { skill: string, level: number }) => (
    <div>
        <div className="flex justify-between text-xs font-bold uppercase text-gray-500 mb-1">
            <span>{skill}</span>
            <span>{level}%</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${level}%` }} />
        </div>
    </div>
);

export default TimurProfile;