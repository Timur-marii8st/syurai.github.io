import { useEffect } from 'react';
import { ArrowLeft, Brain, Cpu, Globe, Github, Mail, Sparkles, Award } from 'lucide-react';
import timurPhoto from '../assets/timur-s.webp'; 

const TimurProfile = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-amber-500/30 pt-24 pb-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-50 px-5 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group"
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16}/> 
        Back to Team
      </button>

      <div className="max-w-5xl mx-auto">
        
        {/* Header Profile Section */}
        <div className="flex flex-col md:flex-row gap-10 items-end mb-20 border-b border-white/10 pb-10">
          <div className="relative group">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)] relative bg-[#111]">
                <img 
                    src={timurPhoto} 
                    alt="Timur Sabitov" 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
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
              ML Engineer | Cognitive Architect | NLP Researcher
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors cursor-default">
                    <Globe size={14} /> Kazan, HQ (Global R&D)
                </span>
                <a href="mailto:4gg528@gmail.com" className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors">
                    <Mail size={14} /> Contact Direct
                </a>
                <a href="https://github.com/Timur-marii8st" target="_blank" className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 hover:border-amber-500/50 hover:text-white transition-colors">
                    <Github size={14} /> GitHub
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
                    I am an ML Engineer focused on the edge of what's possible in <strong>Artificial General Intelligence (AGI)</strong> precursors. My work bridges the gap between raw Large Language Model capabilities and autonomous, agentic behavior.
                </p>
                <p>
                    Currently leading R&D at <span className="text-white font-bold">Syurai.ai</span>, pioneering <strong>hierarchical memory systems</strong> that allow AI agents to maintain long-term context and psychological coherence. I don't just train models; I build cognitive architectures that <em>think</em>, <em>remember</em>, and <em>act</em>.
                </p>
                <div className="bg-amber-900/10 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
                    <p className="italic text-amber-100/80 text-sm">
                        "The future of AI isn't just bigger parameters. It's about interpretable latent spaces and efficient, biological-inspired memory retrieval."
                    </p>
                </div>
            </div>
            
            <div className="md:col-span-1 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Core Competencies</h3>
                <SkillBar skill="LLM Architectures & RAG" level={98} />
                <SkillBar skill="Rust / High-Load Compute" level={90} />
                <SkillBar skill="NLP" level={95} />
                <SkillBar skill="Autonomous Agents" level={92} />
                <SkillBar skill="Polars / Big Data" level={99} />
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
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-amber-300 transition-colors">Zero-Shot Psychometrics in LLMs</div>
                        <p className="text-sm text-gray-400">
                            Pioneering research proving the Linear Representation Hypothesis in Latent Spaces. Demonstrated 98% accuracy in extracting introversion/extraversion traits without fine-tuning.
                        </p>
                    </li>
                    <li>
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-amber-300 transition-colors">Hierarchical Memory for Agents</div>
                        <p className="text-sm text-gray-400">
                            Developing a novel architecture mimicking human hippocampal indexing to solve the context window limit for lifelong learning agents.
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
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors">Wikki Agent (Edge AI)</div>
                        <p className="text-sm text-gray-400">
                            Engineered a local-first AI assistant using <strong>Rust & Tauri</strong>. Achieved inference on consumer hardware by optimizing memory allocation, effectively democratizing secure AI.
                        </p>
                    </li>
                    <li>
                        <div className="text-white font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors">Retail Core ML System</div>
                        <p className="text-sm text-gray-400">
                            Architected an End-to-End forecasting system using <strong>Polars</strong> (10x speedup over Pandas) and PyTorch. Deployed async FastAPI microservices handling real-time inference for business recommendations.
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        {/* Awards / Hackathons */}
        <div className="border border-white/10 rounded-2xl p-6 flex items-center gap-6 bg-[#050505]">
            <Award className="text-yellow-500 shrink-0" size={40} />
            <div>
                <h4 className="text-white font-bold text-lg">Kaggle Competitor & Hackathon Winner</h4>
                <p className="text-gray-500 text-sm">
                    Consistently ranking in top percentiles. Developer of "CTG Analyzer" achieving 0.9796 PR-AUC in medical diagnostics.
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