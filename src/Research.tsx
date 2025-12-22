import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Download, ChevronRight } from 'lucide-react';
// Импортируем компонент статьи
import PsychProfilingPaper from './articles/PsychProfilingPaper';

// --- Types ---
interface PaperMetadata {
  id: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  tags: string[];
}

// --- Metadata Registry ---
// Здесь мы храним только метаданные для списка.
const papers: PaperMetadata[] = [
  {
    id: 'psych-llm-2025',
    title: 'Evaluating the Capabilities of Modern LLMs for Zero-Shot Automatic Psychological Profiling',
    authors: ['Timur B. Sabitov'],
    date: 'Dec 14, 2025',
    abstract: 'Investigating the capability of Large Language Models to infer MBTI types and Big Five traits based solely on text analysis in a zero-shot setting. Comparisons between Qwen, DeepSeek V3.2 and Gemini 3.0 Pro.',
    tags: ['Preprint', 'Psychometrics', 'LLM Analysis']
  }
];

// --- Main Component ---
const ResearchPage = () => {
  const [activePaperId, setActivePaperId] = useState<string | null>(null);

  // Scroll to top when opening a paper
  useEffect(() => {
    if (activePaperId) {
      window.scrollTo(0, 0);
    }
  }, [activePaperId]);

  // View: Single Article
  if (activePaperId) {
    const paper = papers.find(p => p.id === activePaperId);
    
    // Safety check
    if (!paper) return null;

    return (
      <div className="min-h-screen bg-black text-gray-300 pt-24 pb-20 px-4 animate-in fade-in duration-500">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <button 
            onClick={() => setActivePaperId(null)}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Research
          </button>

          {/* Paper Header */}
          <div className="border-b border-white/10 pb-8 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              {paper.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
               <div className="flex items-center gap-2 text-blue-400">
                  <User size={16} />
                  <span>{paper.authors.join(', ')}</span>
               </div>
               <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={16} />
                  <span>{paper.date}</span>
               </div>
               <div className="flex gap-2">
                 {paper.tags.map(tag => (
                   <span key={tag} className="flex items-center gap-1 text-gray-500 border border-white/10 px-2 py-1 rounded bg-white/5 text-xs">
                      {tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          {/* Dynamic Content Loading */}
          {/* В будущем здесь можно сделать switch/case для разных ID */}
          {activePaperId === 'psych-llm-2025' && <PsychProfilingPaper />}

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <button 
              onClick={() => setActivePaperId(null)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              ← Back to list
            </button>
            <a 
            href="https://drive.google.com/file/d/1m3oH60JBD1fJl4Tnapcf92625YBOFykW/view"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
              <Download size={16} />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    );
  }

  // View: List of Papers
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Research</h2>
          <p className="text-xl text-gray-400 max-w-2xl font-light">
            Exploring the frontiers of agentic architectures, latent space psychology, and interpretable AI.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 gap-6">
          {papers.map((paper) => (
            <div 
              key={paper.id}
              onClick={() => setActivePaperId(paper.id)}
              className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight className="text-white" />
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Meta Column */}
                <div className="md:w-1/4 flex flex-col gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-2"><Calendar size={14} /> {paper.date}</span>
                  <span className="text-blue-400 font-medium">{paper.authors[0]}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                     {paper.tags.map(tag => (
                       <span key={tag} className="border border-white/10 rounded px-2 py-1 text-xs">{tag}</span>
                     ))}
                  </div>
                </div>

                {/* Content Column */}
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors leading-tight">
                    {paper.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {paper.abstract}
                  </p>
                  <span className="inline-block text-sm font-semibold border-b border-transparent group-hover:border-white transition-all pb-0.5 text-blue-400 group-hover:text-white">
                    Read Publication
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;