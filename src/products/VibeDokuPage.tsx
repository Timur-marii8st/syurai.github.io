import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  FileCheck2,
  FileSearch,
  Gavel,
  GitBranch,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type VibeDokuPageProps = {
  onBack: () => void;
};

const contactEmail = '4gg528@gmail.com';

const VibeDokuPage: React.FC<VibeDokuPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const copy = t.vibeDoku;
  const workflows = [
    { code: '01', icon: <FileSearch size={25} />, title: copy.procurementTitle, desc: copy.procurementDesc },
    { code: '02', icon: <Scale size={25} />, title: copy.legalTitle, desc: copy.legalDesc },
    { code: '03', icon: <FileCheck2 size={25} />, title: copy.executionTitle, desc: copy.executionDesc },
  ];
  const steps = [
    { icon: <Workflow size={20} />, title: copy.step1Title, desc: copy.step1Desc },
    { icon: <FileSearch size={20} />, title: copy.step2Title, desc: copy.step2Desc },
    { icon: <Gavel size={20} />, title: copy.step3Title, desc: copy.step3Desc },
    { icon: <CheckCircle2 size={20} />, title: copy.step4Title, desc: copy.step4Desc },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05050a] text-slate-200 selection:bg-violet-400/25">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#05050a]/80 px-5 py-5 backdrop-blur-xl md:px-8">
        <button type="button" onClick={onBack} className="flex items-center gap-2 font-fmono text-[11px] uppercase tracking-[0.18em] text-slate-400 transition hover:text-white">
          <ArrowLeft size={15} /> {copy.backToAgents}
        </button>
        <span className="font-fmono text-xs uppercase tracking-[0.24em] text-violet-200">Vibe-Doku / Syurai</span>
      </nav>

      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(124,58,237,.18),transparent_36%),radial-gradient(circle_at_15%_75%,rgba(14,165,233,.11),transparent_30%)]" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/5 px-4 py-2 font-fmono text-[11px] uppercase tracking-[0.18em] text-violet-200">
              <Bot size={14} /> {copy.badge}
            </p>
            <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl md:text-9xl">{copy.heroTitle}</h1>
            <p className="mt-5 font-fserif text-2xl leading-tight text-violet-200 md:text-4xl">{copy.heroAccent}</p>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">{copy.heroDesc}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={`mailto:${contactEmail}?subject=Vibe-Doku%20pilot`} className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-200 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-white">
                {copy.ctaPrimary} <ArrowRight size={17} />
              </a>
              <a href="#workflow" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-bold text-white transition hover:border-violet-200/50 hover:bg-white/5">
                {copy.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl p-4 md:p-8">
            <div className="absolute inset-0 rotate-2 rounded-[2rem] border border-violet-300/15 bg-violet-300/[0.025]" aria-hidden="true" />
            <div className="relative -rotate-1 rounded-[2rem] border border-white/10 bg-[#090912]/90 p-6 shadow-2xl md:p-8">
              <div className="flex items-center justify-between border-b border-white/8 pb-5">
                <span className="font-fmono text-xs uppercase tracking-[0.18em] text-violet-200">contract / evidence</span>
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.7)]" />
              </div>
              <div className="mt-7 space-y-5">
                {['source.document', 'fact.counterparty', 'check.registry', 'decision.review'].map((line, index) => (
                  <div key={line} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 font-fmono text-xs">
                    <span className="text-slate-600">{index + 1}</span>
                    <span className="text-slate-300">{line}</span>
                    <span className={index === 3 ? 'text-amber-300' : 'text-emerald-300'}>{index === 3 ? 'human' : 'verified'}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-violet-300/15 bg-violet-300/[0.04] p-4 text-sm text-slate-400">
                <GitBranch className="shrink-0 text-violet-300" size={19} />
                procurement → legal → execution
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.018] px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-9 gap-y-4 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-400">
          <span className="flex items-center gap-2"><LockKeyhole size={14} className="text-violet-300" />{copy.proofLocal}</span>
          <span className="flex items-center gap-2"><Database size={14} className="text-violet-300" />{copy.proofSaby}</span>
          <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-violet-300" />{copy.proofFailClosed}</span>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-20 px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{copy.flowsTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">{copy.flowsDesc}</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {workflows.map((flow) => (
              <article key={flow.code} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition hover:border-violet-300/30 md:p-9">
                <span className="absolute right-6 top-5 font-fmono text-5xl font-black text-white/[0.035]">{flow.code}</span>
                <div className="text-violet-300">{flow.icon}</div>
                <h3 className="mt-10 text-2xl font-bold text-white">{flow.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-400">{flow.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-400/[0.08] to-sky-400/[0.025] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex items-center justify-center border-b border-white/8 p-12 lg:border-b-0 lg:border-r">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-violet-300/25">
              <div className="absolute inset-5 rounded-full border border-dashed border-violet-300/20" />
              <ShieldCheck className="text-violet-200" size={54} strokeWidth={1.2} />
            </div>
          </div>
          <div className="p-7 md:p-12">
            <p className="font-fmono text-[10px] uppercase tracking-[0.2em] text-violet-300">evidence-first</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">{copy.principleTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{copy.principleDesc}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#080810] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{copy.pipelineTitle}</h2>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="bg-[#080810] p-6 md:p-7">
                <div className="flex items-center justify-between text-violet-300">
                  {step.icon}<span className="font-fmono text-xs text-slate-600">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="font-fmono text-[10px] uppercase tracking-[0.2em] text-violet-300">deployment perimeter</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">{copy.stackTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">{copy.stackDesc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Python 3.11+', 'FastAPI', 'SQLite', 'Ollama', 'Saby JSON-RPC', 'LibreOffice', 'pandoc', 'DOCX'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 font-fmono text-xs text-slate-300">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-violet-300/20 bg-violet-300/[0.045] p-8 text-center md:p-14">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{copy.ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">{copy.ctaDesc}</p>
          <a href={`mailto:${contactEmail}?subject=Vibe-Doku%20pilot`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-200 px-7 py-4 text-sm font-bold text-slate-950 transition hover:bg-white">
            {copy.ctaButton} <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default VibeDokuPage;
