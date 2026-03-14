import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
// Убрали импорт next/image
// Импортируем картинку (убедись, что путь правильный относительно этого файла!)
import heroBg from './assets/motivi_logo.webp'; 

interface AgentsPageProps {
  onNavigateToMotivi: () => void;
  onNavigateToSabyAgent: () => void;
}

const AgentsPage: React.FC<AgentsPageProps> = ({ onNavigateToMotivi, onNavigateToSabyAgent }) => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">AGENTS</h2>
            <p className="text-xl text-gray-400 max-w-xl font-light">
              Autonomous systems designed to solve complex tasks. 
              From personal productivity to deep research.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Active Agents</div>
            <div className="text-3xl font-mono">02</div>
          </div>
        </div>

        {/* Masonry Grid (Starting with 1 big item) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          
          {/* Motivi Card - Spans 2 cols on desktop for emphasis */}
          <div 
            onClick={onNavigateToMotivi}
            className="group relative col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10"
          >
            {/* Background Image Placeholder - Warm Tones */}
            <div className="absolute inset-0 bg-gray-800">
                {/* ЗАМЕНА: Используем обычный img вместо Image */}
                <img 
                    src={heroBg}
                    alt="Motivi AI"
                    // w-full h-full заменяют свойство fill
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

            {/* Content Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                {/* Tag */}
                <div className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                    <Sparkles size={12} fill="currentColor" /> Productivity
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">Motivi_AI</h3>
                
                <p className="text-gray-300 text-lg mb-6 line-clamp-2 group-hover:line-clamp-none transition-all max-w-lg">
                    A proactive Telegram planning assistant with cognitive memory and long-term goal tracking.
                </p>

                {/* Hidden Details that fade in */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2 text-sm font-bold text-white">
                    Explore Project <ArrowRight size={16} />
                </div>
            </div>
          </div>

          {/* Saby-Agent Card */}
          <div
            onClick={onNavigateToSabyAgent}
            className="group col-span-1 relative rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] flex flex-col justify-between p-8"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(100,160,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,255,0.5) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Top row */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles size={11} fill="currentColor" /> Enterprise
              </div>
              <div className="text-gray-700 text-4xl font-black opacity-30 group-hover:opacity-50 transition-opacity">02</div>
            </div>

            {/* Agent indicators */}
            <div className="relative z-10 flex flex-col gap-2 my-6">
              {[
                { label: 'Procurement', color: 'bg-blue-400', width: 'w-4/5' },
                { label: 'Legal', color: 'bg-indigo-400', width: 'w-3/5' },
                { label: 'Execution', color: 'bg-cyan-400', width: 'w-2/3' },
              ].map(agent => (
                <div key={agent.label} className="flex items-center gap-3">
                  <div className={`h-1 ${agent.width} ${agent.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  <span className="text-gray-500 text-xs font-mono group-hover:text-gray-300 transition-colors">{agent.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom content */}
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Saby-Agent</h3>
              <p className="text-gray-400 text-sm mb-5 line-clamp-2 group-hover:line-clamp-none transition-all">
                Three autonomous agents that automate your full contract lifecycle inside Saby EDO.
              </p>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-sm font-bold text-blue-400">
                Explore Project <ArrowRight size={15} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentsPage;