import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Loader2,
  Mail,
  Rocket,
  Send,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LocalizedLink from '../components/LocalizedLink';

type ServiceKind = 'services' | 'consulting';

type ServiceLandingPageProps = {
  kind: ServiceKind;
  onBack: () => void;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const contactEmail = '4gg528@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contactEmail}`;

const styles = {
  services: {
    bg: 'bg-[#050505] selection:bg-amber-500/30',
    accent: 'text-amber-300',
    border: 'border-amber-500/30',
    softBorder: 'border-amber-500/15',
    panel: 'from-amber-500/10 to-transparent',
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
    icon: 'text-amber-300',
    button: 'bg-amber-300 text-black hover:bg-amber-200',
    focus: 'focus:border-amber-300/60 focus:ring-amber-300/20',
  },
  consulting: {
    bg: 'bg-[#040608] selection:bg-cyan-500/30',
    accent: 'text-cyan-300',
    border: 'border-cyan-500/30',
    softBorder: 'border-cyan-500/15',
    panel: 'from-cyan-500/10 to-transparent',
    badge: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
    icon: 'text-cyan-300',
    button: 'bg-cyan-200 text-black hover:bg-cyan-100',
    focus: 'focus:border-cyan-300/60 focus:ring-cyan-300/20',
  },
};

const capabilityIcons = [
  <Workflow size={30} />,
  <Bot size={30} />,
  <Rocket size={30} />,
];

const stackByKind: Record<ServiceKind, string[]> = {
  services: ['CRM API', 'Sales automation', 'Lead scoring', 'Task routing', 'Reporting agents', 'Human approval'],
  consulting: ['Claude Code', 'Codex', 'Cursor', 'Code review loops', 'Team playbooks', 'Delivery process'],
};

const labelClass = 'block text-xs font-bold uppercase tracking-widest text-white/45 mb-2';
const inputBase =
  'w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:ring-2';

const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({ kind, onBack }) => {
  const { t } = useLanguage();
  const copy = t[kind];
  const theme = styles[kind];
  const points = [
    { title: copy.point1Title, desc: copy.point1Desc },
    { title: copy.point2Title, desc: copy.point2Desc },
    { title: copy.point3Title, desc: copy.point3Desc },
  ];
  const processSteps = [
    { title: copy.process1Title, desc: copy.process1Desc },
    { title: copy.process2Title, desc: copy.process2Desc },
    { title: copy.process3Title, desc: copy.process3Desc },
  ];
  const faqItems = [
    { q: copy.faq1q, a: copy.faq1a },
    { q: copy.faq2q, a: copy.faq2a },
    { q: copy.faq3q, a: copy.faq3a },
    { q: copy.faq4q, a: copy.faq4a },
  ];
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());

    setFormStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          _subject: `[Syurai] ${kind === 'services' ? 'CRM agents' : 'Consulting'} request`,
          _template: 'table',
        }),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <main className={`min-h-screen ${theme.bg} text-gray-200 font-sans overflow-x-hidden`}>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} />
          {copy.backToHome}
        </button>
        <div className="font-bold tracking-tighter text-xl text-white">SYURAI</div>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.panel} pointer-events-none`} />
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.badge} text-xs font-bold tracking-widest uppercase mb-8`}>
              <BrainCircuit size={14} />
              {copy.badge}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.92] mb-8">
              {copy.titleTop}
              <br />
              <span className={theme.accent}>{copy.titleBottom}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
              {copy.intro}
            </p>
          </div>

          <div className={`rounded-3xl border ${theme.border} bg-black/35 p-6 md:p-8 shadow-2xl shadow-black/30`}>
            <div className="grid gap-4">
              {points.map((point, index) => (
                <div
                  key={point.title}
                  className={`rounded-2xl border ${theme.softBorder} bg-white/[0.035] p-5`}
                >
                  <div className={`${theme.icon} mb-4`}>
                    {capabilityIcons[index]}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{point.title}</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.015] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3">
          {stackByKind[kind].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-10">{copy.processTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <div key={step.title} className={`rounded-3xl border ${theme.softBorder} bg-white/[0.03] p-6`}>
              <div className={`${theme.accent} text-4xl font-black mb-4`}>0{index + 1}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className={`rounded-3xl border ${theme.border} bg-gradient-to-b ${theme.panel} p-6 md:p-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10">
            <div>
              <div className={`${theme.icon} mb-5`}>
                <CheckCircle2 size={34} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
                {copy.formTitle}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">{copy.formDesc}</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {copy.formPrivacy}{' '}
                <LocalizedLink to="/privacy" className="underline hover:text-gray-300 transition-colors">
                  {t.privacy.linkLabel}
                </LocalizedLink>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label>
                  <span className={labelClass}>{copy.formName}</span>
                  <input name="name" required className={`${inputBase} ${theme.focus}`} />
                </label>
                <label>
                  <span className={labelClass}>{copy.formEmail}</span>
                  <input name="email" type="email" required className={`${inputBase} ${theme.focus}`} />
                </label>
              </div>
              <label>
                <span className={labelClass}>{copy.formCompany}</span>
                <input name="company" className={`${inputBase} ${theme.focus}`} />
              </label>
              <label>
                <span className={labelClass}>{copy.formMessage}</span>
                <textarea name="message" required rows={5} className={`${inputBase} ${theme.focus} resize-y`} />
              </label>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition-colors disabled:cursor-wait disabled:opacity-70 ${theme.button}`}
              >
                {formStatus === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {formStatus === 'sending' ? copy.formSending : copy.formSubmit}
              </button>
              <p role="status" aria-live="polite" className="text-sm min-h-5">
                {formStatus === 'success' && <span className="text-green-400">{copy.formSuccess}</span>}
                {formStatus === 'error' && <span className="text-red-400">{copy.formError}</span>}
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={15} />
                {contactEmail}
              </a>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-28">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-10">{copy.faqTitle}</h2>
        <div className="grid gap-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className={`group rounded-2xl border ${theme.softBorder} bg-white/[0.03] px-6 py-5 open:bg-white/[0.05] transition-colors`}
            >
              <summary className={`cursor-pointer list-none flex items-center justify-between gap-4 text-base md:text-lg font-bold text-white [&::-webkit-details-marker]:hidden`}>
                {item.q}
                <span className={`${theme.accent} text-2xl leading-none transition-transform duration-300 group-open:rotate-45`} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServiceLandingPage;
