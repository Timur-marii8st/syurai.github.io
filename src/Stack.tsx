import { useEffect } from 'react';
import {
  Code2,
  Share2,
  Flame,
  Box,
  Cpu,
  Layers,
  Zap,
  Binary,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

const StackPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useLanguage();

  const mainStack = [
    {
      name: "Python 3.11+",
      desc: t.stack.pythonDesc,
      url: "https://www.python.org/",
      icon: <Code2 size={40} />,
      color: "text-[#3776AB]",
      borderColor: "hover:border-[#3776AB]/50"
    },
    {
      name: "PyTorch",
      desc: t.stack.pytorchDesc,
      url: "https://pytorch.org/",
      icon: <Flame size={40} />,
      color: "text-[#EE4C2C]",
      borderColor: "hover:border-[#EE4C2C]/50"
    },
    {
      name: "Polars",
      desc: t.stack.polarsDesc,
      url: "https://pola.rs/",
      icon: <Share2 size={40} />,
      color: "text-[#CD792C]",
      borderColor: "hover:border-[#CD792C]/50"
    },
    {
      name: "Hugging Face",
      desc: t.stack.hfDesc,
      url: "https://huggingface.co/",
      icon: <span className="text-4xl leading-none grayscale opacity-80 group-hover:grayscale-0 transition-all">🤗</span>,
      color: "text-yellow-400",
      borderColor: "hover:border-yellow-400/50"
    }
  ];

  const secondaryStack = [
    {
      name: "JAX",
      desc: t.stack.jaxDesc,
      url: "https://jax.readthedocs.io/",
      icon: <Cpu size={20} />
    },
    {
      name: "vLLM",
      desc: t.stack.vllmDesc,
      url: "https://docs.vllm.ai/",
      icon: <Zap size={20} />
    },
    {
      name: "BitsAndBytes",
      desc: t.stack.bnbDesc,
      url: "https://github.com/TimDettmers/bitsandbytes",
      icon: <Binary size={20} />
    },
    {
      name: "PEFT",
      desc: t.stack.peftDesc,
      url: "https://github.com/huggingface/peft",
      icon: <Layers size={20} />
    },
    {
      name: "scikit-learn",
      desc: t.stack.sklearnDesc,
      url: "https://scikit-learn.org/",
      icon: <Box size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            {t.stack.title} <span className="text-amber-500">{t.stack.titleAccent}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
            {t.stack.subtitle}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {mainStack.map((tech) => (
            <a 
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:bg-white/[0.07] ${tech.borderColor}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 bg-black/40 rounded-2xl ${tech.color} ring-1 ring-white/10`}>
                  {tech.icon}
                </div>
                <ExternalLink className="text-gray-600 group-hover:text-white transition-colors" size={20} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-100 transition-colors">
                {tech.name}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm font-medium">
                {tech.desc}
              </p>
            </a>
          ))}
        </div>

        {/* Secondary Section */}
        <div className="border-t border-white/10 pt-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-amber-600 rounded-full"/>
            {t.stack.specializedTools}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryStack.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 hover:border-amber-500/30 rounded-2xl transition-all hover:bg-white/[0.05]"
              >
                <div className="mt-1 text-gray-500 group-hover:text-amber-500 transition-colors">
                  {tech.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-200 group-hover:text-white flex items-center gap-2">
                    {tech.name}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500"/>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StackPage;