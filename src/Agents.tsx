import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
// Убрали импорт next/image
// Импортируем картинку (убедись, что путь правильный относительно этого файла!)
import heroBg from './assets/motivi_logo.webp'; 

interface AgentsPageProps {
  onNavigateToMotivi: () => void;
}

const AgentsPage: React.FC<AgentsPageProps> = ({ onNavigateToMotivi }) => {
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
            <div className="text-3xl font-mono">01</div>
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

          {/* Coming Soon Card (Placeholder to fill grid) */}
          <div className="col-span-1 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed">
            <div className="text-gray-600 text-6xl font-black opacity-20">02</div>
            <div>
                <h4 className="text-xl font-bold text-gray-400 mb-2">Research Agent</h4>
                <p className="text-gray-600 text-sm">Deep research automation and paper analysis. Coming Q2 2026.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentsPage;