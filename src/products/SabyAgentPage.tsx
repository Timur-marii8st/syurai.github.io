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
import { useLanguage } from '../contexts/LanguageContext';

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

  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#040608] text-gray-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} /> {t.saby.backToAgents}
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
              <Zap size={11} fill="currentColor" /> {t.saby.badge}
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.88]">
              {t.saby.heroLine1}<br />
              {t.saby.heroLine2}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-500">
                {t.saby.heroLine3}
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={250}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t.saby.heroDesc}
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-green-400" /> {t.saby.trustReadOnly}</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1.5"><Lock size={13} className="text-blue-400" /> {t.saby.trustOnPremise}</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-blue-400" /> {t.saby.trustTests}</span>
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
              <MetricCard value="3" label={t.saby.metricsAgents} />
              <MetricCard value="100k ₽" label={t.saby.metricsContract} />
              <MetricCard value="12" label={t.saby.metricsLegal} />
              <MetricCard value="0" label={t.saby.metricsCloud} />
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Three Agent Workers */}
      <div className="max-w-7xl mx-auto px-4 mb-28">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-6">
            {t.saby.agentsTitle}
          </h2>
          <p className="text-gray-400 pl-6 mb-16 max-w-2xl">
            {t.saby.agentsSubtitle}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeInSection delay={100}>
            <AgentWorkerCard
              number="01"
              icon={<FileText size={36} />}
              name={t.saby.procurementName}
              subtitle={t.saby.procurementSub}
              colorFrom="from-blue-950/60"
              colorTo="to-blue-900/10"
              borderColor="border-blue-700/30"
              textColor="text-blue-400"
              features={[
                t.saby.procurementF1,
                t.saby.procurementF2,
                t.saby.procurementF3,
                t.saby.procurementF4,
                t.saby.procurementF5,
              ]}
            />
          </FadeInSection>

          <FadeInSection delay={200}>
            <AgentWorkerCard
              number="02"
              icon={<Scale size={36} />}
              name={t.saby.legalName}
              subtitle={t.saby.legalSub}
              colorFrom="from-indigo-950/60"
              colorTo="to-indigo-900/10"
              borderColor="border-indigo-700/30"
              textColor="text-indigo-400"
              features={[
                t.saby.legalF1,
                t.saby.legalF2,
                t.saby.legalF3,
                t.saby.legalF4,
                t.saby.legalF5,
              ]}
            />
          </FadeInSection>

          <FadeInSection delay={300}>
            <AgentWorkerCard
              number="03"
              icon={<BarChart3 size={36} />}
              name={t.saby.executionName}
              subtitle={t.saby.executionSub}
              colorFrom="from-cyan-950/60"
              colorTo="to-cyan-900/10"
              borderColor="border-cyan-700/30"
              textColor="text-cyan-400"
              features={[
                t.saby.executionF1,
                t.saby.executionF2,
                t.saby.executionF3,
                t.saby.executionF4,
                t.saby.executionF5,
              ]}
            />
          </FadeInSection>
        </div>
      </div>

      {/* Key Capabilities */}
      <div className="max-w-7xl mx-auto px-4 mb-28">
        <FadeInSection>
          <h2 className="text-4xl font-bold text-white mb-16 border-l-4 border-blue-500 pl-6">
            {t.saby.capabilitiesTitle}
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FadeInSection delay={100}>
            <FeatureCard
              icon={<Cpu size={28} />}
              title={t.saby.localAiTitle}
              desc={t.saby.localAiDesc}
            />
          </FadeInSection>

          <FadeInSection delay={150}>
            <FeatureCard
              icon={<Search size={28} />}
              title={t.saby.registriesTitle}
              desc={t.saby.registriesDesc}
            />
          </FadeInSection>

          <FadeInSection delay={200}>
            <FeatureCard
              icon={<ShieldCheck size={28} />}
              title={t.saby.legalCheckTitle}
              desc={t.saby.legalCheckDesc}
            />
          </FadeInSection>

          <FadeInSection delay={250}>
            <FeatureCard
              icon={<FileText size={28} />}
              title={t.saby.templatesTitle}
              desc={t.saby.templatesDesc}
            />
          </FadeInSection>

          <FadeInSection delay={300}>
            <FeatureCard
              icon={<Mail size={28} />}
              title={t.saby.emailTitle}
              desc={t.saby.emailDesc}
            />
          </FadeInSection>

          <FadeInSection delay={350}>
            <FeatureCard
              icon={<Lock size={28} />}
              title={t.saby.readonlyTitle}
              desc={t.saby.readonlyDesc}
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
                  {t.saby.techTitle}<br />
                  <span className="text-blue-400">{t.saby.techAccent}</span>
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t.saby.techDesc}
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
            {t.saby.timelineTitle}
          </h2>
        </FadeInSection>

        <div className="space-y-0">
          {[
            { step: '01', title: t.saby.step1Title, desc: t.saby.step1Desc },
            { step: '02', title: t.saby.step2Title, desc: t.saby.step2Desc },
            { step: '03', title: t.saby.step3Title, desc: t.saby.step3Desc },
            { step: '04', title: t.saby.step4Title, desc: t.saby.step4Desc },
            { step: '05', title: t.saby.step5Title, desc: t.saby.step5Desc },
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
              <Zap size={11} fill="currentColor" /> {t.saby.ctaBadge}
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.saby.ctaTitle}
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              {t.saby.ctaDesc}
            </p>
            <a
              href="mailto:contact@syurai.ai"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-100 transition-colors"
            >
              <Mail size={18} /> {t.saby.ctaButton}
            </a>
          </div>
        </FadeInSection>
      </div>

    </div>
  );
};

export default SabyAgentPage;
