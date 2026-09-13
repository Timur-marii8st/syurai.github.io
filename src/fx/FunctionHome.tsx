import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePrefersReducedMotion } from '../components/usePrefersReducedMotion';
import {
  buildGeometry,
  computeLayout,
  STATION_COUNT,
  stationAt,
  type FxLayout,
} from './curve';
import {
  StationCompany,
  StationCompute,
  StationContact,
  StationOrigin,
  StationResearch,
  StationSystems,
  type StationMetrics,
} from './stations';

/* A website that behaves like a mathematical function being drawn in real
 * time. Vertical scroll stays the input mechanism, but visually the visitor
 * travels left → right along one continuous line from the logo to the footer.
 *
 * if (x > x_c) reveal(section)  — the DOM implements mathematical events. */

const SUBSCRIPTS = ['x₀', 'x₁', 'x₂', 'x₃', 'x₄', 'x₅'];
const REVEAL_ATTR = 'data-fx-reveal';

interface RevealItem {
  el: Element;
  x: number;
  on: boolean;
}

const offsetWorldX = (el: HTMLElement, world: HTMLElement): number => {
  let x = 0;
  let node: HTMLElement | null = el;
  while (node && node !== world) {
    x += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return x;
};

const FunctionHome: React.FC = () => {
  const { t, lang } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  const [layout, setLayout] = useState<FxLayout | null>(() =>
    computeLayout(window.innerWidth, window.innerHeight)
  );
  const [activeStation, setActiveStation] = useState(0);

  const layoutRef = useRef<FxLayout | null>(null);
  const reducedRef = useRef(reducedMotion);
  const driverRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const readoutWrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const revealsRef = useRef<RevealItem[]>([]);
  const totalLenRef = useRef(0);
  const pointXRef = useRef(20);
  const activeRef = useRef(0);
  const frameRef = useRef(0);
  const hashInitRef = useRef(false);

  const geom = useMemo(() => (layout ? buildGeometry(layout) : null), [layout]);
  const navLabels = [
    t.fx.nav.origin,
    t.fx.nav.systems,
    t.fx.nav.compute,
    t.fx.nav.research,
    t.fx.nav.company,
    t.fx.nav.contact,
  ];

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  const metrics: StationMetrics | null = (() => {
    if (!layout) return null;
    const pad = layout.isMobile ? 20 : Math.min(60, layout.stationW * 0.055);
    // A mobile station is wider than the viewport (the curve needs room to
    // oscillate), and a station-centred scroll leaves its left/right edges off
    // screen. Slide readable content into the actually-visible window and cap
    // its width to the viewport so nothing clips at the margins.
    const inset = layout.isMobile ? Math.max(0, (layout.stationW - layout.vw) / 2) : 0;
    return {
      pad,
      topY: layout.isMobile ? 0 : Math.max(84, layout.stripTop - 176),
      bottomY: layout.stripTop + layout.stripH + (layout.isMobile ? 16 : 26),
      stripTop: layout.stripTop,
      compact: layout.isMobile,
      contentLeft: pad + inset,
      contentWidth: (layout.isMobile ? layout.vw : layout.stationW) - 2 * pad,
    };
  })();

  /* ------------------------------------------------------------ update -- */

  const update = useCallback(() => {
    const lay = layoutRef.current;
    const world = worldRef.current;
    const path = pathRef.current;
    if (!lay || !world || !path) return;

    const total = totalLenRef.current;
    if (!total) return;

    const scrollY = window.scrollY;
    const hero = reducedRef.current ? 0 : lay.hero;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const introT = hero > 0 ? clamp01(scrollY / hero) : 1;
    const travelT = clamp01((scrollY - hero) / lay.travel);

    let len = travelT * total;
    let scale = 1;
    let tx = 0;
    let ty = 0;

    if (hero > 0 && scrollY <= hero) {
      const heroEase = introT ** 3 * (introT * (introT * 6 - 15) + 10);
      // Fit the native mark to the viewport, then dolly back around the exact
      // point where the function leaves the logo.
      const markW = lay.markRadius * 2.55;
      const markH = lay.markRadius * 3.05;
      const sMax = Math.min(
        10,
        (lay.vw * (lay.isMobile ? 0.86 : 0.78)) / markW,
        (lay.vh * (lay.isMobile ? 0.78 : 0.82)) / markH
      );
      scale = sMax - (sMax - 1) * heroEase;
      // At the end this resolves exactly to identity: no hand-off jump.
      const txStart = lay.vw / 2 - lay.originX * sMax;
      const tyStart = lay.vh / 2 - lay.originY * sMax;
      tx = txStart * (1 - heroEase);
      ty = tyStart * (1 - heroEase);
      len = 0;
    }

    path.style.strokeDashoffset = String(total - len);
    const pt = path.getPointAtLength(Math.min(len, total));
    pointXRef.current = pt.x;

    // The camera derives its X directly from the point on the function. It no
    // longer has an independent speed that can drift on curved sections.
    const cameraX = Math.min(lay.originX, lay.vw / 2);
    const shift = scrollY <= hero ? 0 : Math.min(lay.travel, Math.max(0, pt.x - cameraX));

    const chromeOpacity = hero > 0 ? clamp01((introT - 0.22) / 0.48) : 1;
    const travellerOpacity = scrollY < hero ? clamp01((introT - 0.72) / 0.28) : 1;
    if (headerRef.current) headerRef.current.style.opacity = String(chromeOpacity);
    if (readoutWrapRef.current) readoutWrapRef.current.style.opacity = String(chromeOpacity);

    world.style.transformOrigin = '0 0';
    world.style.transform = `translate3d(${tx - shift}px,${ty}px,0) scale(${scale})`;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${pt.x - 5.5}px,${lay.stripTop + pt.y - 5.5}px,0)`;
      dotRef.current.style.opacity = String(travellerOpacity);
    }
    if (dropRef.current) {
      const dotY = lay.stripTop + pt.y;
      const baseY = lay.stripTop + lay.base;
      const top = Math.min(dotY, baseY);
      dropRef.current.style.transform = `translate3d(${pt.x}px,${top}px,0)`;
      dropRef.current.style.height = `${Math.abs(baseY - dotY)}px`;
      dropRef.current.style.opacity =
        travellerOpacity > 0 && pt.x > 60 && pt.x < lay.worldW - 80
          ? String(travellerOpacity)
          : '0';
    }

    /* if (x > x_c) reveal(...) */
    const front = pt.x + 30;
    for (const item of revealsRef.current) {
      const on = item.x <= front;
      if (on !== item.on) {
        item.on = on;
        item.el.classList.toggle('is-in', on);
      }
    }

    if (readoutRef.current) {
      readoutRef.current.textContent = `x = ${travelT.toFixed(2)} · ${SUBSCRIPTS[stationAt(pt.x, lay)]}`;
    }

    const station = stationAt(pt.x, lay);
    if (station !== activeRef.current) {
      activeRef.current = station;
      setActiveStation(station);
    }
  }, []);

  /* ------------------------------------------------------------ layout -- */

  const measure = useCallback(() => {
    setLayout(computeLayout(window.innerWidth, window.innerHeight));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  /* After each layout / language pass: arm the dash array, collect reveal
   * thresholds, apply the current scroll position. */
  useLayoutEffect(() => {
    const world = worldRef.current;
    const path = pathRef.current;
    if (!layout || !world || !path || !geom) return;
    layoutRef.current = layout;

    const total = path.getTotalLength();
    totalLenRef.current = total;
    path.style.strokeDasharray = String(total);
    path.style.strokeDashoffset = String(total);

    const items: RevealItem[] = [];
    world.querySelectorAll(`[${REVEAL_ATTR}]`).forEach((el) => {
      el.classList.add('fx-reveal');
      const attr = (el as HTMLElement).dataset?.fxX;
      const x = attr
        ? parseFloat(attr)
        : offsetWorldX(el as HTMLElement, world);
      items.push({ el, x, on: false });
    });
    items.sort((a, b) => a.x - b.x);
    revealsRef.current = items;

    update();
  }, [layout, geom, lang, update]);

  /* ------------------------------------------------------------ events -- */

  useEffect(() => {
    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        update();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [update]);

  const scrollToStation = useCallback((i: number, smooth: boolean) => {
    const lay = layoutRef.current;
    const path = pathRef.current;
    const total = totalLenRef.current;
    if (!lay || !path || !total) return;

    const targetX = i === 0
      ? lay.originX
      : Math.min(lay.worldW - 26, (i + 0.5) * lay.stationW);
    let low = 0;
    let high = total;
    for (let step = 0; step < 22; step += 1) {
      const mid = (low + high) / 2;
      if (path.getPointAtLength(mid).x < targetX) low = mid;
      else high = mid;
    }

    window.scrollTo({
      top: (reducedRef.current ? 0 : lay.hero) + (high / total) * lay.travel,
      behavior: smooth && !reducedRef.current ? 'smooth' : 'auto',
    });
  }, []);

  const onNavClick = useCallback(
    (i: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollToStation(i, true);
      window.history.replaceState(null, '', `#x${i}`);
    },
    [scrollToStation]
  );

  /* Deep links: syurai.online/#x2 */
  useEffect(() => {
    if (!layout || hashInitRef.current) return;
    hashInitRef.current = true;
    const match = window.location.hash.match(/^#x([0-5])$/);
    if (match) scrollToStation(parseInt(match[1], 10), false);
  }, [layout, scrollToStation]);

  /* Arrow keys move along the coordinate. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      const lay = layoutRef.current;
      if (!lay) return;
      const next = stationAt(pointXRef.current, lay) + (e.key === 'ArrowRight' ? 1 : -1);
      if (next < 0 || next >= STATION_COUNT) return;
      e.preventDefault();
      scrollToStation(next, true);
      window.history.replaceState(null, '', `#x${next}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scrollToStation]);

  /* ------------------------------------------------------------ render -- */

  const anchors = geom?.anchors;
  const anchorLabels: { key: string; label: string; x: number; y: number; above: boolean }[] =
    layout && anchors
      ? [
          { key: 'p1', label: 'P₁', x: anchors.p1.x, y: anchors.p1.y, above: true },
          { key: 'p2', label: 'P₂', x: anchors.p2.x, y: anchors.p2.y, above: false },
          { key: 'p3', label: 'P₃', x: anchors.p3.x, y: anchors.p3.y, above: true },
          { key: 'p4', label: 'P₄', x: anchors.p4.x, y: anchors.p4.y, above: false },
          { key: 'c1', label: 'C₁', x: anchors.c1.x, y: anchors.c1.y, above: false },
          { key: 'c2', label: 'C₂', x: anchors.c2.x, y: anchors.c2.y, above: true },
          { key: 'c3', label: 'C₃', x: anchors.c3.x, y: anchors.c3.y, above: true },
          { key: 't1', label: 'T₁', x: anchors.t1.x, y: anchors.t1.y, above: false },
          { key: 't2', label: 'T₂', x: anchors.t2.x, y: anchors.t2.y, above: true },
        ]
      : [];

  return (
    <div className="bg-paper text-ink selection:bg-accent/25">
      {/* Coordinate navigation ------------------------------------------ */}
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-40 will-change-[opacity]">
        <div className="flex h-14 items-center justify-between px-4 md:h-16 md:px-8">
          <a
            href="#x0"
            onClick={onNavClick(0)}
            className="font-fmono text-[11px] uppercase tracking-[0.3em] text-ink"
          >
            Syurai
            <span className="text-accent" aria-hidden="true">
              {' '}
              ●
            </span>
          </a>
          <nav aria-label="Sections">
            <ul className="flex items-center gap-3 font-fmono text-xs sm:gap-4 md:gap-7">
              {SUBSCRIPTS.map((sub, i) => (
                <li key={sub}>
                  <a
                    href={`#x${i}`}
                    onClick={onNavClick(i)}
                    className={`fx-navlink ${activeStation === i ? 'is-active' : ''}`}
                  >
                    {sub}
                    <span className="fx-navlabel font-fmono text-[9.5px] uppercase tracking-[0.22em]">
                      {navLabels[i]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Live coordinate readout ---------------------------------------- */}
      <div
        ref={readoutWrapRef}
        className="fixed bottom-5 left-5 z-40 font-fmono text-[11px] text-inkmute"
        aria-hidden="true"
      >
        <span ref={readoutRef}>x = 0.00 · x₀</span>
      </div>

      {/* Scroll driver: hero zoom + travel + one viewport ----- */}
      <div
        ref={driverRef}
        style={{
          height: layout
            ? (reducedMotion ? layout.travel : layout.hero + layout.travel) + layout.vh
            : '100vh',
        }}
      >
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: layout ? layout.vh : '100vh' }}
        >
          {layout && geom && metrics && anchors && (
            <div
              ref={worldRef}
              className="absolute left-0 top-0 h-full will-change-transform"
              style={{ width: layout.worldW, transformOrigin: '0 0' }}
            >
              {/* the function itself */}
              <svg
                className="absolute left-0 overflow-visible"
                style={{ top: layout.stripTop, width: layout.worldW, height: layout.stripH }}
                aria-hidden="true"
              >
                {/* The logo is native geometry in the same coordinate system
                    as mainD. Its right-going axis is the function itself. */}
                <g>
                  <path
                    d={geom.logo.axesD}
                    fill="none"
                    strokeWidth={1.15}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ stroke: 'rgb(var(--fx-ink) / 0.72)' }}
                  />
                  <path
                    d={geom.logo.sD}
                    fill="none"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ stroke: 'rgb(var(--fx-ink))' }}
                  />
                  <circle
                    cx={layout.originX}
                    cy={layout.base}
                    r={2.4}
                    strokeWidth={1.2}
                    vectorEffect="non-scaling-stroke"
                    style={{ fill: 'rgb(var(--fx-paper))', stroke: 'rgb(var(--fx-ink))' }}
                  />
                  <g
                    textAnchor="middle"
                    style={{
                      fill: 'rgb(var(--fx-ink))',
                      fontFamily: "'STIX Two Text', 'Times New Roman', serif",
                    }}
                  >
                    <text
                      x={layout.originX}
                      y={layout.base - geom.logo.radius * 1.16}
                      fontSize={geom.logo.radius * 0.22}
                    >
                      S
                    </text>
                    <text
                      x={layout.originX + geom.logo.radius * 1.12}
                      y={layout.base + geom.logo.radius * 0.09}
                      fontSize={geom.logo.radius * 0.22}
                    >
                      Y
                    </text>
                    <text
                      x={layout.originX - geom.logo.radius * 1.02}
                      y={layout.base + geom.logo.radius * 0.9}
                      fontSize={geom.logo.radius * 0.22}
                    >
                      U
                    </text>
                    <text
                      x={layout.originX}
                      y={layout.base + geom.logo.radius * 1.43}
                      fontSize={geom.logo.radius * 0.34}
                      letterSpacing="0.16em"
                    >
                      syurai
                    </text>
                  </g>
                </g>

                {/* asymptote the limit converges to */}
                <line
                  x1={geom.asymptote.x1}
                  y1={geom.asymptote.y}
                  x2={geom.asymptote.x2}
                  y2={geom.asymptote.y}
                  strokeWidth={1}
                  strokeDasharray="7 8"
                  style={{ stroke: 'rgb(var(--fx-ink) / 0.45)' }}
                  className="fx-reveal"
                  data-fx-reveal
                  data-fx-x={layout.stationW * 5 + layout.stationW * 0.28}
                />
                {/* converging lines of the company station */}
                <path
                  d={geom.ghostA}
                  fill="none"
                  strokeWidth={1.1}
                  strokeDasharray="5 7"
                  style={{ stroke: 'rgb(var(--fx-ink) / 0.5)' }}
                  className="fx-reveal"
                  data-fx-reveal
                  data-fx-x={layout.stationW * 4 + layout.stationW * 0.05}
                />
                <path
                  d={geom.ghostB}
                  fill="none"
                  strokeWidth={1.1}
                  strokeDasharray="5 7"
                  style={{ stroke: 'rgb(var(--fx-ink) / 0.5)' }}
                  className="fx-reveal"
                  data-fx-reveal
                  data-fx-x={layout.stationW * 4 + layout.stationW * 0.05}
                />
                {/* one continuous line: logo → footer */}
                <path
                  ref={pathRef}
                  d={geom.mainD}
                  fill="none"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ stroke: 'rgb(var(--fx-ink))' }}
                />
                {/* product / people points on the curve */}
                {anchorLabels.map((a) => (
                  <circle
                    key={a.key}
                    cx={a.x}
                    cy={a.y + Math.sin(a.x * 0.52) * 0.75 + Math.sin(a.x * 0.19 + 2.1) * 0.65}
                    r={4.6}
                    strokeWidth={1.6}
                    style={{ fill: 'rgb(var(--fx-paper))', stroke: 'rgb(var(--fx-ink))' }}
                    className="fx-reveal"
                    data-fx-reveal
                    data-fx-x={a.x - 60}
                  />
                ))}
                {/* QED square where the limit lands */}
                <rect
                  x={anchors.end.x - 5}
                  y={anchors.end.y - 5}
                  width={10}
                  height={10}
                  style={{ fill: 'rgb(var(--fx-ink))' }}
                  className="fx-reveal"
                  data-fx-reveal
                  data-fx-x={anchors.end.x - 120}
                />
              </svg>

              {/* point labels + origin marker */}
              {anchorLabels.map((a) => (
                <span
                  key={a.key}
                  data-fx-reveal
                  data-fx-x={a.x - 60}
                  className="fx-reveal absolute font-fmono text-[10px] text-inkmute"
                  style={{
                    left: a.x + 9,
                    top: layout.stripTop + a.y + (a.above ? -22 : 10),
                  }}
                >
                  {a.label}
                </span>
              ))}
              {/* stations */}
              <section
                aria-label={`x₀ — ${navLabels[0]}`}
                className="absolute top-0 h-full"
                style={{ left: 0, width: layout.stationW }}
              >
                <StationOrigin t={t} m={metrics} />
              </section>
              <section
                aria-label={`x₁ — ${navLabels[1]}`}
                className="absolute top-0 h-full"
                style={{ left: layout.stationW, width: layout.stationW }}
              >
                <StationSystems t={t} m={metrics} />
              </section>
              <section
                aria-label={`x₂ — ${navLabels[2]}`}
                className="absolute top-0 h-full"
                style={{ left: layout.stationW * 2, width: layout.stationW }}
              >
                <StationCompute t={t} m={metrics} />
              </section>
              <section
                aria-label={`x₃ — ${navLabels[3]}`}
                className="absolute top-0 h-full"
                style={{ left: layout.stationW * 3, width: layout.stationW }}
              >
                <StationResearch t={t} m={metrics} />
              </section>
              <section
                aria-label={`x₄ — ${navLabels[4]}`}
                className="absolute top-0 h-full"
                style={{ left: layout.stationW * 4, width: layout.stationW }}
              >
                <StationCompany t={t} m={metrics} />
              </section>
              <section
                aria-label={`x₅ — ${navLabels[5]}`}
                className="absolute top-0 h-full"
                style={{ left: layout.stationW * 5, width: layout.stationW }}
              >
                <StationContact t={t} m={metrics} />
              </section>

              {/* the travelling point */}
              <div
                ref={dropRef}
                className="absolute left-0 top-0 w-0 border-l border-dashed border-ink/30 opacity-0"
                aria-hidden="true"
              />
              <div ref={dotRef} className="fx-point left-0 top-0 opacity-0" aria-hidden="true">
                {!reducedMotion && <span className="fx-point-halo" />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionHome;
