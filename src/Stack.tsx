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

// --- Data ---

const mainStack = [
  {
    name: "Python 3.11+",
    desc: "The fundamental language for modern AI development. Used with strong typing and async capabilities.",
    url: "https://www.python.org/",
    icon: <Code2 size={40} />,
    color: "text-[#3776AB]",
    borderColor: "hover:border-[#3776AB]/50"
  },
  {
    name: "PyTorch",
    desc: "The primary framework for deep learning research and dynamic neural network architecture implementation.",
    url: "https://pytorch.org/",
    icon: <Flame size={40} />,
    color: "text-[#EE4C2C]",
    borderColor: "hover:border-[#EE4C2C]/50"
  },
  {
    name: "Polars",
    desc: "Blazingly fast DataFrames library implemented in Rust. Replaces Pandas for high-performance data processing.",
    url: "https://pola.rs/",
    icon: <Share2 size={40} />,
    color: "text-[#CD792C]",
    borderColor: "hover:border-[#CD792C]/50"
  },
  {
    name: "Hugging Face",
    desc: "The ecosystem for Transformers, Datasets, and Hub. Used for accessing SOTA open-source models.",
    url: "https://huggingface.co/",
    icon: <span className="text-4xl leading-none grayscale opacity-80 group-hover:grayscale-0 transition-all">🤗</span>,
    color: "text-yellow-400",
    borderColor: "hover:border-yellow-400/50"
  }
];

const secondaryStack = [
  {
    name: "JAX",
    desc: "High-performance numerical computing with composable transformations.",
    url: "https://jax.readthedocs.io/",
    icon: <Cpu size={20} />
  },
  {
    name: "vLLM",
    desc: "High-throughput and memory-efficient LLM serving engine.",
    url: "https://docs.vllm.ai/",
    icon: <Zap size={20} />
  },
  {
    name: "BitsAndBytes",
    desc: "Lightweight wrappers for CUDA custom functions, 8-bit optimizers, and quantization.",
    url: "https://github.com/TimDettmers/bitsandbytes",
    icon: <Binary size={20} />
  },
  {
    name: "PEFT",
    desc: "Parameter-Efficient Fine-Tuning methods (LoRA, Prefix Tuning).",
    url: "https://github.com/huggingface/peft",
    icon: <Layers size={20} />
  },
  {
    name: "scikit-learn",
    desc: "Simple and efficient tools for predictive data analysis and classic ML algorithms.",
    url: "https://scikit-learn.org/",
    icon: <Box size={20} />
  }
];

const StackPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            TECH <span className="text-amber-500">STACK</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
            A curated selection of tools optimized for speed, scalability, and state-of-the-art AI research.
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
            Also using / Specialized Tools
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