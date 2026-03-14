import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Scale,
  BarChart3,
  ShieldCheck,
  Cpu,
  Mail,
  CheckCircle2,
  Zap,
  Lock,
  Search,
} from 'lucide-react';

// --- Animation Helper ---
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => setVisible(e.isIntersecting)),
      { threshold: 0.1 }
    );
    const ref = domRef.current;
    if (ref) observer.observe(ref);
    return () => { if (ref) observer.unobserve(ref); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Sub-components ---
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="bg-gradient-to-br from-white/5 to-transparent border border-blue-500/10 hover:border-blue-400/30 p-6 rounded-2xl transition-all duration-300 hover:bg-white/8 group">
    <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-blue-500/50 transition-colors cursor-default">
    {children}
  </span>
);

const MetricCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">{value}</div>
    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{label}</div>
  </div>
);

// --- Agent Worker Card ---
const AgentWorkerCard = ({
  number,
  icon,
  name,
  subtitle,
  features,
  colorFrom,
  colorTo,
  borderColor,
  textColor,
}: {
  number: string;
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  features: string[];
  colorFrom: string;
  colorTo: string;
  borderColor: string;
  textColor: string;
}) => (
  <div className={`relative bg-gradient-to-br ${colorFrom} ${colorTo} border ${borderColor} rounded-3xl p-8 overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
    <div className="absolute top-6 right-6 font-black text-6xl opacity-5 text-white select-none">{number}</div>
    <div className={`${textColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
    <p className={`${textColor} text-sm font-semibold uppercase tracking-wider mb-6 opacity-80`}>{subtitle}</p>
    <ul className="space-y-2">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
          <CheckCircle2 size={14} className={`${textColor} mt-0.5 shrink-0`} />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Page ---
const SabyAgentPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#040608] text-gray-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} /> Back to Agents
        </button>
        <div className="font-bold tracking-tighter text-xl text-white">SABY_AGENT</div>
      </nav>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-700/10 rounded-full blur-[130px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(100,160,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl pt-24 pb-16">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest mb-8 uppercase">
              <Zap size={11} fill="currentColor" /> Autonomous Multi-Agent System
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.88]">
              CONTRACT<br />
              WORK ON<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-500">
                AUTOPILOT
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={250}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Three autonomous AI agents handle the entire contract lifecycle —
              from drafting to execution control — directly inside your Saby EDO workflow.
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-green-400" /> READ-ONLY access to Saby</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1.5"><Lock size={13} className="text-blue-400" /> On-premise AI, no data leaves</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-blue-400" /> 795+ passing tests</span>
            </div>
          </FadeInSection>
        </div>

        <div className="absolute bottom-10 animate-bounce text-gray-700 text-xl select-none">↓</div>
      </div>

      {/* Metrics */}
      <div className="border-y border-white/5 bg-white/[0.015] py-16 mb-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <MetricCard value="3" label="Autonomous agents" />
              <MetricCard value="100k ₽" label="Contract ceiling (EP)" />
              <MetricCard value="12" label="Legal check points" />
              <MetricCard value="0" label="Data sent to cloud" />
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Three Agent Workers */}
      <div className="max-w-7xl mx-auto px-4 mb-28">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-6">
            Three Agents. One System.
          </h2>
          <p className="text-gray-400 pl-6 mb-16 max-w-2xl">
            Each agent runs independently with its own database and configuration,
            yet they share data to keep your contract lifecycle consistent.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeInSection delay={100}>
            <AgentWorkerCard
              number="01"
              icon={<FileText size={36} />}
              name="Procurement"
              subtitle="Закупки · EP ≤ 100 000 ₽"
              colorFrom="from-blue-950/60"
              colorTo="to-blue-900/10"
              borderColor="border-blue-700/30"
              textColor="text-blue-400"
              features={[
                'Reads service memos from Saby and extracts specs with AI',
                'Verifies contractors against RNP, inoagent, MSP registries',
                'Selects the right contract template automatically',
                'Generates a ready-to-sign DOCX with AI commentary',
                'Sends a summary email with a 12-point legal checklist',
              ]}
            />
          </FadeInSection>

          <FadeInSection delay={200}>
            <AgentWorkerCard
              number="02"
              icon={<Scale size={36} />}
              name="Legal"
              subtitle="Юрслужба · 3 task types"
              colorFrom="from-indigo-950/60"
              colorTo="to-indigo-900/10"
              borderColor="border-indigo-700/30"
              textColor="text-indigo-400"
              features={[
                'Classifies incoming tasks: termination, addendum, or review',
                'OCR-reads scanned PDFs with a local 0.9B vision model',
                'Drafts termination agreements and addenda from templates',
                'Performs a 5-point AI checklist on termination documents',
                'Resolves contractor data via Saby + DaData fallback',
              ]}
            />
          </FadeInSection>

          <FadeInSection delay={300}>
            <AgentWorkerCard
              number="03"
              icon={<BarChart3 size={36} />}
              name="Execution Control"
              subtitle="Контроль исполнения · 6 checks"
              colorFrom="from-cyan-950/60"
              colorTo="to-cyan-900/10"
              borderColor="border-cyan-700/30"
              textColor="text-cyan-400"
              features={[
                'Polls incoming shipment docs (acts, UPD, invoices)',
                'Matches documents to contracts via 4 binding strategies',
                'Flags overspend, missed deadlines, and sum discrepancies',
                'Syncs state from both Procurement and Legal databases',
                'Alerts via email before contract expiry (14 / 7 days)',
              ]}
            />
          </FadeInSection>
        </div>
      </div>

      {/* Key Capabilities */}
      <div className="max-w-7xl mx-auto px-4 mb-28">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-white mb-16 border-l-4 border-blue-500 pl-6">
            Under the Hood
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FadeInSection delay={100}>
            <FeatureCard
              icon={<Cpu size={28} />}
              title="Local AI — Zero Cloud"
              desc="All LLM inference runs on-premise via Ollama. Your contracts, memos, and counterparty data never touch an external AI API."
            />
          </FadeInSection>

          <FadeInSection delay={150}>
            <FeatureCard
              icon={<Search size={28} />}
              title="Federal Registry Checks"
              desc="Automatic screening against RNP (FZ-44 + FZ-223), Ministry of Justice inoagent list, SME registry, and self-employed tax status."
            />
          </FadeInSection>

          <FadeInSection delay={200}>
            <FeatureCard
              icon={<ShieldCheck size={28} />}
              title="12-Point Legal Checklist"
              desc="Every generated contract is reviewed by an AI legal checker: subject, price, deadlines, liability, force-majeure, anti-corruption clause, and more."
            />
          </FadeInSection>

          <FadeInSection delay={250}>
            <FeatureCard
              icon={<FileText size={28} />}
              title="Smart Template Engine"
              desc="10 procurement templates and 5 legal templates — services, supply, works, GPC, self-employed, license, lease, terminations, addenda."
            />
          </FadeInSection>

          <FadeInSection delay={300}>
            <FeatureCard
              icon={<Mail size={28} />}
              title="Rich Email Reports"
              desc="Structured HTML reports with color-coded event logs (INFO / WARNING / ERROR), AI commentary, legal checklist, and DOCX attachment."
            />
          </FadeInSection>

          <FadeInSection delay={350}>
            <FeatureCard
              icon={<Lock size={28} />}
              title="Read-Only by Design"
              desc="Agents never write to Saby. Every action is local: state in SQLite, output as DOCX files, notifications via SMTP. No accidental modifications."
            />
          </FadeInSection>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="border-y border-white/5 bg-white/[0.015] py-20 mb-28">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Built on<br />
                  <span className="text-blue-400">Proven Stack</span>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Open-source core, containerized deployment,
                  and a local AI model — full control, no vendor lock-in.
                </p>
              </div>
              <div className="md:w-2/3 flex flex-wrap gap-3">
                <TechBadge>Python 3.11</TechBadge>
                <TechBadge>FastAPI</TechBadge>
                <TechBadge>Pydantic v2</TechBadge>
                <TechBadge>Ollama LLM</TechBadge>
                <TechBadge>PaddleOCR VL</TechBadge>
                <TechBadge>SQLite</TechBadge>
                <TechBadge>Docker Compose</TechBadge>
                <TechBadge>Jinja2</TechBadge>
                <TechBadge>LibreOffice headless</TechBadge>
                <TechBadge>Saby JSON-RPC</TechBadge>
                <TechBadge>DaData API</TechBadge>
                <TechBadge>SMTP</TechBadge>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* How it works — timeline */}
      <div className="max-w-4xl mx-auto px-4 mb-28">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-white mb-16 border-l-4 border-blue-500 pl-6">
            From Memo to DOCX in Minutes
          </h2>
        </FadeInSection>

        <div className="space-y-0">
          {[
            { step: '01', title: 'Memo arrives in Saby', desc: 'Agent polls Saby EDO and picks up a new service memo (Служебная записка) task.' },
            { step: '02', title: 'AI extracts structure', desc: 'Local LLM reads the memo and technical specification, extracts payment scheme, items, and contractor name.' },
            { step: '03', title: 'Contractor verified', desc: 'INN lookup via DaData, then cross-checked against four federal registries. Blocked instantly if flagged.' },
            { step: '04', title: 'Contract generated', desc: 'The right template is filled with validated data and converted to a properly formatted DOCX file.' },
            { step: '05', title: 'Legal review & report', desc: 'AI runs a 12-point legal checklist. A rich HTML email with the DOCX attachment lands in the specialist\'s inbox.' },
          ].map((item, i) => (
            <FadeInSection key={i} delay={i * 80}>
              <div className="flex gap-6 pb-10 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 text-xs font-black shrink-0">
                    {item.step}
                  </div>
                  {i < 4 && <div className="flex-1 w-px bg-blue-900/40 mt-2" />}
                </div>
                <div className="pb-2">
                  <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center pb-32">
        <FadeInSection>
          <div className="bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 rounded-3xl p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest mb-6 uppercase">
              <Zap size={11} fill="currentColor" /> Proprietary Product
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Automate your contract workflow
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Saby-Agent is deployed on-premise for enterprise clients working with
              Saby (СБИС) EDO. Reach out to discuss deployment for your organization.
            </p>
            <a
              href="mailto:contact@syurai.ai"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-100 transition-colors"
            >
              <Mail size={18} /> Contact Us
            </a>
          </div>
        </FadeInSection>
      </div>

    </div>
  );
};

export default SabyAgentPage;
