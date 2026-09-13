import React from 'react';
import LocalizedLink from '../components/LocalizedLink';
import type { Translations } from '../i18n/translations';

/* Content of the five stations x0..x4. Everything is plain DOM text (SEO +
 * accessibility); the line, the point and the reveals live in FunctionHome.
 *
 * Each station receives vertical metrics from the layout pass: content is
 * split into an area above the curve and an area below it, so the function
 * itself always stays visible between them. */

export interface StationMetrics {
  pad: number;
  topY: number;
  bottomY: number;
  stripTop: number;
  compact: boolean; // narrow screens: top block becomes an overlay label
  contentLeft: number; // station-local x where readable content starts
  contentWidth: number; // width capped so nothing is clipped off-screen
}

interface StationProps {
  t: Translations;
  m: StationMetrics;
}

const Fig: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-fmono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-inkmute">
    {children}
  </p>
);

const Var: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="fx-var">{children}</span>
);

const topStyle = (m: StationMetrics): React.CSSProperties =>
  m.compact
    ? { left: m.contentLeft, top: m.stripTop + 10, width: m.contentWidth }
    : { left: m.pad, right: m.pad * 1.5, top: m.topY };

const bottomStyle = (m: StationMetrics): React.CSSProperties =>
  m.compact
    ? { left: m.contentLeft, width: m.contentWidth, top: m.bottomY }
    : { left: m.pad, right: m.pad, top: m.bottomY };

/* ---------------------------------------------------------------- x0 ----- */

export const StationOrigin: React.FC<{ t: Translations; m: StationMetrics }> = ({ t, m }) => (
  <div className="relative h-full text-center">
    <span className="sr-only">Syurai</span>

    <div
      className="fx-fade-up absolute px-5"
      style={{
        '--fx-fade-delay': '1.5s',
        left: m.contentLeft,
        top: m.bottomY,
        width: m.contentWidth,
      } as React.CSSProperties}
    >
      <p className="fx-math text-2xl md:text-[28px]">
        <Var>S</Var> : <Var>P</Var> → <Var>I</Var>
        <span className="fx-caret" aria-hidden="true" />
      </p>
      <p className="mt-3 font-fmono text-[10px] uppercase tracking-[0.22em] text-inkmute md:text-[11px]">
        <Var>P</Var> — {t.fx.problems} · <Var>I</Var> — {t.fx.intelligentSystems}
      </p>
      <p className="mx-auto mt-5 max-w-[30rem] font-fserif text-lg text-ink/85 md:text-xl">
        {t.fx.tagline}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
        <LocalizedLink
          to="/vibe-doku"
          className="inline-flex min-h-11 items-center justify-center border border-ink/25 bg-paper/80 px-5 font-fmono text-[11px] uppercase tracking-[0.16em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.fx.quickVibeDoku} →
        </LocalizedLink>
        <LocalizedLink
          to="/compute"
          className="inline-flex min-h-11 items-center justify-center border border-accent/50 bg-accent/10 px-5 font-fmono text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.fx.quickCompute} →
        </LocalizedLink>
      </div>
    </div>

    <p
      className="fx-fade-up absolute bottom-5 left-0 w-full font-fmono text-[10px] uppercase tracking-[0.24em] text-inkmute md:bottom-7"
      style={{ '--fx-fade-delay': '2.3s' } as React.CSSProperties}
    >
      {t.fx.scrollHint}
    </p>
  </div>
);

/* ---------------------------------------------------------------- x1 ----- */

const PointCard: React.FC<{
  point: string;
  kind: string;
  name: string;
  desc: string;
  tags?: string[];
  to: string;
  cta: string;
  accent?: boolean;
}> = ({ point, kind, name, desc, tags, to, cta, accent }) => (
  <LocalizedLink
    to={to}
    data-fx-reveal
    aria-label={`${name}: ${cta}`}
    className="group block max-w-[19rem] border border-transparent p-3 -m-3 transition hover:border-ink/20 hover:bg-ink/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
  >
    <p className="font-fmono text-[10px] uppercase tracking-[0.22em] text-inkmute">
      {point} · {kind}
    </p>
    <h3 className="mt-1.5 font-fserif text-xl leading-tight md:text-[22px]">{name}</h3>
    <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{desc}</p>
    {tags && tags.length > 0 && (
      <>
        <ul className="fx-branch mt-2.5 hidden font-fmono text-[11px] text-inkmute md:block">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p className="mt-2 font-fmono text-[10px] text-inkmute md:hidden">{tags.join(' · ')}</p>
      </>
    )}
    <span
      className={`fx-link mt-3 inline-block font-fmono text-[11px] uppercase tracking-[0.18em] ${
        accent ? 'text-accent' : 'text-ink'
      }`}
    >
      {cta}
    </span>
  </LocalizedLink>
);

export const StationSystems: React.FC<StationProps> = ({ t, m }) => (
  <>
    <div
      data-fx-reveal
      className={m.compact ? 'absolute bg-paper/85 p-2.5' : 'absolute'}
      style={topStyle(m)}
    >
      <div className={m.compact ? '' : 'flex flex-wrap items-start justify-between gap-x-12 gap-y-6'}>
        <div className="max-w-[24rem]">
          <Fig>{t.fx.systems.fig}</Fig>
          <h2 className="mt-2 font-fserif text-3xl md:text-4xl">{t.fx.systems.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-[15px]">
            {t.fx.systems.intro}
          </p>
          {/* Signature correction: the buzzword struck out, the substance
              written back in by hand — «AI → systems that act». */}
          <p className="mt-4 hidden font-fserif text-lg leading-tight md:block" aria-hidden="true">
            <span className="fx-strike">{t.fx.strikeFrom}</span>
            <span className="mx-2 align-middle font-fmono text-xs text-inkmute">→</span>
            <span className="fx-note inline-block align-middle text-2xl leading-none">
              {t.fx.strikeTo}
            </span>
          </p>
        </div>
        {!m.compact && (
          <div className="flex items-center gap-2.5 pt-4 font-fserif text-[17px] md:text-[19px]">
            <span>
              <Var>f</Var>(<Var>x</Var>)&nbsp;=
            </span>
            <span className="fx-brace text-[3em] font-light text-ink/80 select-none" aria-hidden="true">
              {'{'}
            </span>
            <span className="grid gap-0.5">
              <span>
                {t.fx.systems.agents},&nbsp; <Var>x</Var> ∈ <Var>A</Var>
              </span>
              <span>
                {t.fx.systems.automation},&nbsp; <Var>x</Var> ∈ <Var>B</Var>
              </span>
              <span>
                {t.fx.systems.compute},&nbsp; <Var>x</Var> ∈ <Var>C</Var>
              </span>
              <span>
                {t.fx.systems.research},&nbsp; <Var>x</Var> ∈ <Var>D</Var>
              </span>
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="absolute grid grid-cols-2 gap-6 md:gap-10" style={bottomStyle(m)}>
      <PointCard
        point="P₁"
        kind="product"
        name="Motivi"
        desc={t.fx.systems.motiViDesc}
        tags={t.fx.systems.motiViTags.split(' · ')}
        to="/motivi"
        cta={t.fx.systems.open}
      />
      <PointCard
        point="P₂"
        kind="product"
        name="Vibe-Doku"
        desc={t.fx.systems.vibeDokuDesc}
        tags={t.fx.systems.vibeDokuTags.split(' · ')}
        to="/vibe-doku"
        cta={t.fx.systems.open}
      />
      <PointCard
        point="P₃"
        kind={t.fx.systems.servicesLabel}
        name={t.fx.systems.crmTitle}
        desc={t.fx.systems.crmDesc}
        to="/services"
        cta={`${t.fx.systems.crmCta} →`}
        accent
      />
      <PointCard
        point="P₄"
        kind={t.fx.systems.computeLabel}
        name={t.fx.systems.consultingTitle}
        desc={t.fx.systems.consultingDesc}
        to="/consulting"
        cta={`${t.fx.systems.consultingCta} →`}
        accent
      />
    </div>
  </>
);

/* ---------------------------------------------------------------- x2 ----- */

export const StationCompute: React.FC<StationProps> = ({ t, m }) => {
  const systems = [
    { code: 'C₁', title: t.fx.compute.developerTitle, detail: t.fx.compute.developerDetail },
    { code: 'C₂', title: t.fx.compute.serverTitle, detail: t.fx.compute.serverDetail },
    { code: 'C₃', title: t.fx.compute.projectTitle, detail: t.fx.compute.projectDetail },
  ];

  return (
    <>
      <div
        data-fx-reveal
        className={m.compact ? 'absolute bg-paper/90 p-2.5' : 'absolute'}
        style={topStyle(m)}
      >
        <div className="max-w-[34rem]">
          <Fig>{t.fx.compute.fig}</Fig>
          <h2 className="mt-2 font-fserif text-3xl md:text-4xl">{t.fx.compute.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-[15px]">{t.fx.compute.intro}</p>
        </div>
      </div>

      <LocalizedLink
        to="/compute"
        data-fx-reveal
        aria-label={t.fx.compute.cta}
        className="group absolute block border border-ink/15 bg-paper/75 p-4 transition hover:border-accent/55 hover:bg-accent/[0.045] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:p-5"
        style={bottomStyle(m)}
      >
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {systems.map((system) => (
            <article key={system.code}>
              <p className="font-fmono text-[10px] uppercase tracking-[0.18em] text-accent">{system.code}</p>
              <h3 className="mt-2 font-fserif text-base leading-tight md:text-xl">{system.title}</h3>
              <p className="mt-1.5 hidden text-sm leading-relaxed text-ink/70 sm:block">{system.detail}</p>
            </article>
          ))}
        </div>
        <span className="fx-link mt-5 inline-block font-fmono text-[11px] uppercase tracking-[0.18em] text-accent">
          {t.fx.compute.cta} →
        </span>
      </LocalizedLink>
    </>
  );
};

/* ---------------------------------------------------------------- x3 ----- */

const Theorem: React.FC<{
  index: string;
  title: string;
  meta: string;
  to: string;
  readLabel: string;
}> = ({ index, title, meta, to, readLabel }) => (
  <article data-fx-reveal className="max-w-[24rem]">
    <p className="font-fmono text-[10px] uppercase tracking-[0.22em] text-inkmute">Thm {index}</p>
    <h3 className="mt-1.5 font-fserif text-base leading-snug md:text-lg">{title}</h3>
    <p className="mt-1.5 font-fmono text-[10.5px] leading-relaxed text-inkmute">{meta}</p>
    <LocalizedLink
      to={to}
      className="fx-link mt-2.5 inline-block font-fmono text-[11px] uppercase tracking-[0.18em] text-ink"
    >
      {readLabel}
    </LocalizedLink>
  </article>
);

export const StationResearch: React.FC<StationProps> = ({ t, m }) => (
  <>
    <div
      data-fx-reveal
      className={m.compact ? 'absolute bg-paper/85 p-2.5' : 'absolute'}
      style={topStyle(m)}
    >
      <div className={m.compact ? '' : 'flex flex-wrap items-start justify-between gap-x-12 gap-y-4'}>
        <div className="max-w-[24rem]">
          <Fig>{t.fx.research.fig}</Fig>
          <h2 className="mt-2 font-fserif text-3xl md:text-4xl">{t.fx.research.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-[15px]">
            {t.fx.research.intro}
          </p>
        </div>
        {!m.compact && (
          <div className="pt-6">
            <LocalizedLink
              to="/research"
              className="fx-link font-fmono text-[11px] uppercase tracking-[0.18em] text-ink"
            >
              {t.fx.research.all}
            </LocalizedLink>
            <p className="fx-note mt-3 text-xl" aria-hidden="true">
              {t.fx.research.note}
            </p>
          </div>
        )}
      </div>
    </div>

    <div className="absolute" style={bottomStyle(m)}>
      {m.compact && (
        <LocalizedLink
          data-fx-reveal
          to="/research"
          className="fx-link mb-4 inline-block font-fmono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          {t.fx.research.all}
        </LocalizedLink>
      )}
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        <Theorem
          index="1 (2026)"
          title={t.fx.research.paper1Title}
          meta={t.fx.research.paper1Meta}
          to="/research/psych-scope-2026"
          readLabel={t.fx.research.read}
        />
        <Theorem
          index="2 (2025)"
          title={t.fx.research.paper2Title}
          meta={t.fx.research.paper2Meta}
          to="/research/psych-llm-2025"
          readLabel={t.fx.research.read}
        />
      </div>
    </div>
  </>
);

/* ---------------------------------------------------------------- x4 ----- */

const Person: React.FC<{
  point: string;
  name: string;
  role: string;
  to: string;
  profileLabel: string;
}> = ({ point, name, role, to, profileLabel }) => (
  <article data-fx-reveal className="max-w-[19rem]">
    <p className="font-fmono text-[10px] uppercase tracking-[0.22em] text-inkmute">{point}</p>
    <h3 className="mt-1.5 font-fserif text-xl md:text-[22px]">{name}</h3>
    <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{role}</p>
    <LocalizedLink
      to={to}
      className="fx-link mt-2.5 inline-block font-fmono text-[11px] uppercase tracking-[0.18em] text-ink"
    >
      {profileLabel}
    </LocalizedLink>
  </article>
);

export const StationCompany: React.FC<StationProps> = ({ t, m }) => (
  <>
    <div
      data-fx-reveal
      className={m.compact ? 'absolute bg-paper/85 p-2.5' : 'absolute'}
      style={topStyle(m)}
    >
      <div className={m.compact ? '' : 'flex flex-wrap items-start justify-between gap-x-12 gap-y-4'}>
        <div className="max-w-[24rem]">
          <Fig>{t.fx.company.fig}</Fig>
          <h2 className="mt-2 font-fserif text-3xl md:text-4xl">{t.fx.company.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-[15px]">
            {t.fx.company.intro}
          </p>
        </div>
        {!m.compact && (
          <div className="grid gap-2 pt-5 font-fmono text-[11px] text-inkmute">
            <span>
              {t.fx.company.stackLabel} python · pytorch · polars · rust · cuda{' '}
              <LocalizedLink to="/stack" className="fx-link text-ink">
                {t.fx.company.stackAll}
              </LocalizedLink>
            </span>
            <span>
              {t.fx.company.mlclub}{' '}
              <LocalizedLink to="/ml-club" className="fx-link text-ink">
                {t.fx.company.mlclubOpen}
              </LocalizedLink>
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="absolute" style={bottomStyle(m)}>
      {m.compact && (
        <p
          data-fx-reveal
          className="mb-4 font-fmono text-[10.5px] leading-relaxed text-inkmute"
        >
          {t.fx.company.stackLabel} python · pytorch · polars · rust · cuda ·{' '}
          <LocalizedLink to="/stack" className="fx-link text-ink">
            {t.fx.company.stackAll}
          </LocalizedLink>
          <br />
          {t.fx.company.mlclub}{' '}
          <LocalizedLink to="/ml-club" className="fx-link text-ink">
            {t.fx.company.mlclubOpen}
          </LocalizedLink>
        </p>
      )}
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        <Person
          point="T₁ · founder"
          name={t.fx.company.timurName}
          role={t.fx.company.timurRole}
          to="/team/timur"
          profileLabel={t.fx.company.profile}
        />
        <Person
          point="T₂ · systems"
          name={t.fx.company.arjunName}
          role={t.fx.company.arjunRole}
          to="/team/arjun"
          profileLabel={t.fx.company.profile}
        />
      </div>
      <a
        data-fx-reveal
        href="mailto:4gg528@gmail.com?subject=Joining%20the%20Syurai%20team"
        className="fx-note mt-5 inline-block text-xl md:text-2xl"
      >
        {t.fx.company.hiring} →
      </a>
    </div>
  </>
);

/* ---------------------------------------------------------------- x5 ----- */

export const StationContact: React.FC<StationProps> = ({ t, m }) => (
  <>
    <div
      data-fx-reveal
      className={m.compact ? 'absolute bg-paper/85 p-2.5' : 'absolute'}
      style={topStyle(m)}
    >
      <div className={m.compact ? '' : 'flex flex-wrap items-start justify-between gap-x-12 gap-y-4'}>
        <div>
          <Fig>{t.fx.contact.fig}</Fig>
          <div className="mt-4 flex items-end gap-3 font-fserif">
            <span className="flex flex-col items-center leading-none">
              <span className="text-2xl md:text-3xl">lim</span>
              <span className="mt-1.5 text-xs text-inkmute">
                <Var>x</Var> → ∞
              </span>
            </span>
            <span className="text-2xl md:text-3xl">
              <Var>f</Var>(<Var>x</Var>)
            </span>
          </div>
        </div>
        {!m.compact && (
          <p className="fx-note pt-8 text-xl" aria-hidden="true">
            y = {t.fx.nav.contact}
          </p>
        )}
      </div>
    </div>

    <div className="absolute" style={bottomStyle(m)}>
      <p
        data-fx-reveal
        className="max-w-[36rem] font-fserif text-xl leading-snug md:text-[26px]"
      >
        {t.fx.contact.punch}
      </p>

      <div
        data-fx-reveal
        className="mt-5 flex flex-col gap-5 md:flex-row md:items-start md:gap-14"
      >
        <div>
          <p className="font-fmono text-[10px] uppercase tracking-[0.22em] text-inkmute">
            {t.fx.contact.writeUs}
          </p>
          <a
            href="mailto:4gg528@gmail.com"
            className="fx-link mt-1.5 inline-block font-fserif text-lg md:text-xl"
          >
            4gg528@gmail.com
          </a>
        </div>
        <div className="grid gap-2 font-fmono text-[11px] uppercase tracking-[0.16em]">
          <LocalizedLink to="/services" className="fx-link text-ink">
            {t.fx.contact.servicesCta}
          </LocalizedLink>
          <LocalizedLink to="/consulting" className="fx-link text-ink">
            {t.fx.contact.consultingCta}
          </LocalizedLink>
          <LocalizedLink to="/compute" className="fx-link text-ink">
            {t.fx.contact.computeCta}
          </LocalizedLink>
          <a
            href="https://t.me/kznmlchat"
            target="_blank"
            rel="noopener noreferrer"
            className="fx-link text-ink"
          >
            {t.fx.contact.communityCta} ↗
          </a>
        </div>
      </div>

      <footer
        data-fx-reveal
        className="mt-6 flex flex-col gap-2 border-t border-ink/15 pt-4 font-fmono text-[9.5px] uppercase tracking-[0.18em] text-inkmute md:flex-row md:items-center md:gap-6"
      >
        <span>© 2026 Syurai</span>
        <LocalizedLink to="/privacy" className="fx-link">
          {t.fx.contact.privacy}
        </LocalizedLink>
        <span>{t.fx.contact.rights}</span>
        <span className="text-ink" aria-hidden="true">
          ∎
        </span>
      </footer>
    </div>
  </>
);
