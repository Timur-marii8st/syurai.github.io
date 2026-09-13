import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Braces,
  CheckCircle2,
  Cpu,
  Gauge,
  HardDrive,
  Loader2,
  Mail,
  Network,
  Send,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import LocalizedLink from '../components/LocalizedLink';
import { useLanguage } from '../contexts/LanguageContext';

type ComputePageProps = {
  onBack: () => void;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const contactEmail = '4gg528@gmail.com';
const formEndpoint = `https://formsubmit.co/ajax/${contactEmail}`;

const ComputePage: React.FC<ComputePageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const copy = t.compute;
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const offers = [
    { icon: <Cpu size={26} />, title: copy.developerTitle, desc: copy.developerDesc, code: 'C₁' },
    { icon: <Server size={26} />, title: copy.enterpriseTitle, desc: copy.enterpriseDesc, code: 'C₂' },
    { icon: <Network size={26} />, title: copy.projectTitle, desc: copy.projectDesc, code: 'C₃' },
  ];
  const methods = [
    { icon: <Braces size={18} />, label: copy.methodModel },
    { icon: <HardDrive size={18} />, label: copy.methodContext },
    { icon: <Boxes size={18} />, label: copy.methodLoad },
    { icon: <Gauge size={18} />, label: copy.methodLatency },
    { icon: <CheckCircle2 size={18} />, label: copy.methodQuality },
  ];
  const steps = [
    { title: copy.step1Title, desc: copy.step1Desc },
    { title: copy.step2Title, desc: copy.step2Desc },
    { title: copy.step3Title, desc: copy.step3Desc },
    { title: copy.step4Title, desc: copy.step4Desc },
  ];

  const scrollToForm = () => document.getElementById('compute-request')?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());

    setFormStatus('sending');
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _subject: '[Syurai Compute] Configuration request', _template: 'table' }),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#03070a] text-slate-200 selection:bg-cyan-300/25">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#03070a]/80 px-5 py-5 backdrop-blur-xl md:px-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 font-fmono text-[11px] uppercase tracking-[0.18em] text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={15} />
          {copy.backToHome}
        </button>
        <span className="font-fmono text-xs uppercase tracking-[0.24em] text-cyan-200">Syurai / Compute</span>
      </nav>

      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 md:px-8">
        <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(rgba(34,211,238,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.45) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black, transparent 90%)',
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-7 inline-flex items-center gap-2 border border-cyan-300/25 bg-cyan-300/5 px-4 py-2 font-fmono text-[11px] uppercase tracking-[0.2em] text-cyan-200">
              <Cpu size={14} /> {copy.badge}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.93] tracking-[-0.055em] text-white sm:text-6xl md:text-8xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">{copy.heroDesc}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={scrollToForm} className="inline-flex items-center justify-center gap-2 bg-cyan-200 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-white">
                {copy.ctaPrimary} <ArrowRight size={17} />
              </button>
              <a href={`mailto:${contactEmail}?subject=Syurai%20Compute%20specification`} className="inline-flex items-center justify-center border border-white/15 px-6 py-4 text-sm font-bold text-white transition hover:border-cyan-200/50 hover:bg-white/5">
                {copy.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl border border-cyan-200/20 bg-black/35 p-5 shadow-[0_0_100px_-40px_rgba(34,211,238,.45)] md:p-7">
            <div className="mb-8 flex items-center justify-between font-fmono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <span>workload → system</span><span className="text-cyan-300">benchmark required</span>
            </div>
            <div className="space-y-3">
              {[
                ['model / precision', 'input'],
                ['memory / context', 'constraint'],
                ['latency / throughput', 'acceptance'],
                ['hardware + software', 'solution'],
              ].map(([left, right], index) => (
                <div key={left} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border border-white/8 bg-white/[0.025] p-4">
                  <span className="font-fmono text-xs text-cyan-300">0{index + 1}</span>
                  <span className="font-fmono text-xs text-slate-300">{left}</span>
                  <span className="font-fmono text-[9px] uppercase tracking-widest text-slate-600">{right}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-cyan-300 via-cyan-300/30 to-transparent" />
            <p className="mt-4 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">acceptance test before handover</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.018] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{copy.offerTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">{copy.offerDesc}</p>
          </div>
          <div className="grid gap-px bg-white/10 lg:grid-cols-3">
            {offers.map((offer) => (
              <article key={offer.code} className="group bg-[#050a0e] p-7 transition hover:bg-cyan-300/[0.035] md:p-9">
                <div className="flex items-start justify-between">
                  <span className="text-cyan-300">{offer.icon}</span>
                  <span className="font-fmono text-xs text-slate-600">{offer.code}</span>
                </div>
                <h3 className="mt-12 text-2xl font-bold text-white">{offer.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-400">{offer.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-fmono text-[11px] uppercase tracking-[0.2em] text-cyan-300">benchmark protocol</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">{copy.methodTitle}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {methods.map((method, index) => (
              <div key={method.label} className={`${index === methods.length - 1 ? 'sm:col-span-2' : ''} flex items-center gap-4 border border-white/10 bg-white/[0.025] p-5`}>
                <span className="text-cyan-300">{method.icon}</span>
                <span className="text-sm font-semibold text-slate-200">{method.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050a0e] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{copy.processTitle}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="border-t border-cyan-300/35 pt-5">
                <span className="font-fmono text-xs text-cyan-300">0{index + 1}</span>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex gap-4 border border-cyan-300/15 bg-cyan-300/[0.035] p-5 text-sm leading-relaxed text-slate-300 md:p-6">
            <ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={21} />
            <p>{copy.partnerNote}</p>
          </div>
        </div>
      </section>

      <section id="compute-request" className="scroll-mt-24 px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.06] to-transparent p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Workflow className="text-cyan-300" size={32} />
            <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl">{copy.formTitle}</h2>
            <p className="mt-5 leading-relaxed text-slate-400">{copy.formDesc}</p>
            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              {copy.formPrivacy}{' '}
              <LocalizedLink to="/privacy" className="underline transition hover:text-white">{t.privacy.linkLabel}</LocalizedLink>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {copy.formName}
                <input required name="name" className="border border-white/10 bg-black/35 px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60" />
              </label>
              <label className="grid gap-2 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {copy.formEmail}
                <input required type="email" name="email" className="border border-white/10 bg-black/35 px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60" />
              </label>
            </div>
            <label className="grid gap-2 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {copy.formCompany}
              <input name="company" className="border border-white/10 bg-black/35 px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60" />
            </label>
            <label className="grid gap-2 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {copy.formTask}
              <textarea required name="task" rows={5} className="resize-y border border-white/10 bg-black/35 px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {copy.formBudget}
                <input name="budget" className="border border-white/10 bg-black/35 px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60" />
              </label>
              <label className="grid gap-2 font-fmono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {copy.formDeadline}
                <input name="deadline" className="border border-white/10 bg-black/35 px-4 py-3 text-base normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60" />
              </label>
            </div>
            <button disabled={formStatus === 'sending'} className="mt-2 inline-flex items-center justify-center gap-2 bg-cyan-200 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-70">
              {formStatus === 'sending' ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
              {formStatus === 'sending' ? copy.formSending : copy.formSubmit}
            </button>
            <p role="status" aria-live="polite" className="min-h-5 text-sm">
              {formStatus === 'success' && <span className="text-emerald-300">{copy.formSuccess}</span>}
              {formStatus === 'error' && <span className="text-rose-300">{copy.formError}</span>}
            </p>
            <a href={`mailto:${contactEmail}`} className="inline-flex items-center justify-center gap-2 text-sm text-slate-500 transition hover:text-white">
              <Mail size={15} /> {contactEmail}
            </a>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ComputePage;
