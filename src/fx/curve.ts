/* Geometry of the single continuous line.
 *
 * The whole page is one function y = f(x): the visitor's scroll drives a
 * point along the x-axis and the line is drawn at exactly that speed.
 * Every station bends the function differently (brief: "каждый раздел —
 * изменение самой функции"), but the line itself never breaks.
 */

export interface FxLayout {
  vw: number;
  vh: number;
  stationW: number;
  worldW: number;
  travel: number;
  stripH: number;
  stripTop: number;
  base: number;
  isMobile: boolean;
  hero: number;
  markRadius: number;
  originX: number;
  originY: number;
}

export interface CurvePoint {
  x: number;
  y: number;
}

export interface CurveGeometry {
  mainD: string;
  logo: {
    axesD: string;
    sD: string;
    radius: number;
  };
  ghostA: string;
  ghostB: string;
  asymptote: { x1: number; x2: number; y: number };
  anchors: Record<string, CurvePoint>;
}

export const STATION_COUNT = 6;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const computeLayout = (vw: number, vh: number): FxLayout => {
  const isMobile = vw < 768;
  // Mobile: one station == one viewport, so station content remains aligned
  // with the visible window throughout the journey.
  const stationW = isMobile ? vw : clamp(vw * 0.86, 760, 1240);
  const worldW = stationW * STATION_COUNT;
  const travel = Math.max(worldW - vw, 1);
  const stripH = isMobile ? clamp(vh * 0.4, 220, 330) : clamp(vh * 0.52, 300, 470);
  const stripTop = (vh - stripH) / 2;
  const base = stripH * 0.6;
  const hero = Math.round(vh * 0.4);
  const markRadius = clamp(stripH * 0.25, 64, 102);
  const originX = stationW / 2;
  const originY = stripTop + base;
  return {
    vw,
    vh,
    stationW,
    worldW,
    travel,
    stripH,
    stripTop,
    base,
    isMobile,
    hero,
    markRadius,
    originX,
    originY,
  };
};

/* Deterministic hand tremor: a liner pen never draws a perfectly straight
 * 1px line. Same input -> same wobble, so resizes don't jitter the curve. */
const tremor = (i: number, amplitude = 1) =>
  (Math.sin(i * 0.52) * 0.75 + Math.sin(i * 0.19 + 2.1) * 0.65) * amplitude;

const catmull = (ctrl: CurvePoint[], samplesPerSeg = 16): CurvePoint[] => {
  if (ctrl.length < 2) return ctrl.slice();
  const out: CurvePoint[] = [ctrl[0]];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = ctrl[i - 1] ?? ctrl[i];
    const p1 = ctrl[i];
    const p2 = ctrl[i + 1];
    const p3 = ctrl[i + 2] ?? p2;
    for (let j = 1; j <= samplesPerSeg; j++) {
      const t = j / samplesPerSeg;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x:
          0.5 *
          (2 * p1.x +
            (p2.x - p0.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (3 * p1.x - p0.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (p2.y - p0.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (3 * p1.y - p0.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  return out;
};

const toPath = (points: CurvePoint[], wobbleAmp = 1): string => {
  if (points.length === 0) return '';
  const d: string[] = [];
  points.forEach((p, i) => {
    // The first point is the logo's exact origin; never wobble the seam.
    const y = p.y + (i === 0 ? 0 : tremor(i, wobbleAmp));
    d.push(`${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${y.toFixed(1)}`);
  });
  return d.join(' ');
};

const sampleAt = (points: CurvePoint[], frac: number): CurvePoint => {
  const idx = clamp(Math.round(frac * (points.length - 1)), 0, points.length - 1);
  return points[idx];
};

export const buildGeometry = (layout: FxLayout): CurveGeometry => {
  const { stationW, worldW, base, stripH, originX, markRadius } = layout;
  const s = (i: number) => i * stationW;
  const amp = clamp(stripH * 0.26, 60, 108);

  const anchors: Record<string, CurvePoint> = {};

  /* x0 mark: a native, single-stroke reconstruction of the original logo.
   * Its horizontal axis ends at the very first point of mainD, so there is no
   * image/path seam and both parts share the same camera transform. */
  const r = markRadius;
  const axesD = [
    `M${originX - r * 1.18} ${base} L${originX + r * 0.95} ${base}`,
    `M${originX - r * 1.18} ${base} l${r * 0.13} ${-r * 0.075}`,
    `M${originX - r * 1.18} ${base} l${r * 0.13} ${r * 0.075}`,
    `M${originX} ${base + r * 1.03} L${originX} ${base - r * 1.03}`,
    `M${originX} ${base - r * 1.03} l${-r * 0.075} ${r * 0.13}`,
    `M${originX} ${base - r * 1.03} l${r * 0.075} ${r * 0.13}`,
    `M${originX} ${base + r * 1.03} l${-r * 0.075} ${-r * 0.13}`,
    `M${originX} ${base + r * 1.03} l${r * 0.075} ${-r * 0.13}`,
    `M${originX - r * 0.83} ${base + r * 0.72} L${originX + r * 0.83} ${base - r * 0.72}`,
    `M${originX + r * 0.83} ${base - r * 0.72} l${-r * 0.15} ${r * 0.025}`,
    `M${originX + r * 0.83} ${base - r * 0.72} l${-r * 0.055} ${r * 0.14}`,
    `M${originX - r * 0.83} ${base + r * 0.72} l${r * 0.15} ${-r * 0.025}`,
    `M${originX - r * 0.83} ${base + r * 0.72} l${r * 0.055} ${-r * 0.14}`,
  ].join(' ');
  const sD = [
    `M${originX - r * 0.24} ${base - r * 0.91}`,
    `C${originX - r * 0.93} ${base - r * 0.65}`,
    `${originX - r * 0.82} ${base - r * 0.2}`,
    `${originX} ${base}`,
    `C${originX + r * 0.82} ${base + r * 0.2}`,
    `${originX + r * 0.93} ${base + r * 0.65}`,
    `${originX + r * 0.24} ${base + r * 0.91}`,
  ].join(' ');

  /* x0 — origin: the line starts as a straight axis. */
  const axis: CurvePoint[] = [
    { x: originX, y: base },
    { x: s(1), y: base },
  ];

  /* x1 — systems: the function bends through product points P1..P4. */
  const p1: CurvePoint = { x: s(1) + stationW * 0.16, y: base - amp };
  const p2: CurvePoint = { x: s(1) + stationW * 0.38, y: base + amp * 0.62 };
  const p3: CurvePoint = { x: s(1) + stationW * 0.61, y: base - amp * 0.66 };
  const p4: CurvePoint = { x: s(1) + stationW * 0.84, y: base + amp * 0.42 };
  anchors.p1 = p1;
  anchors.p2 = p2;
  anchors.p3 = p3;
  anchors.p4 = p4;
  const systems = catmull([
    { x: s(1), y: base },
    p1,
    p2,
    p3,
    p4,
    { x: s(2), y: base },
  ]);

  /* x2 — compute: measured capacity rises into a stable operating plateau. */
  const c1: CurvePoint = { x: s(2) + stationW * 0.18, y: base + amp * 0.42 };
  const c2: CurvePoint = { x: s(2) + stationW * 0.48, y: base - amp * 0.72 };
  const c3: CurvePoint = { x: s(2) + stationW * 0.78, y: base - amp * 0.3 };
  const compute = catmull([
    { x: s(2), y: base },
    c1,
    c2,
    c3,
    { x: s(3), y: base },
  ]);
  anchors.c1 = c1;
  anchors.c2 = c2;
  anchors.c3 = c3;

  /* x3 — research: a decaying oscillation. */
  const research: CurvePoint[] = [];
  const cycles = 4; // sin(cycles * pi * t) ends at 0, so seams stay continuous
  const steps = 96;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = amp * (1 - 0.55 * t);
    research.push({ x: s(3) + stationW * t, y: base - a * Math.sin(cycles * Math.PI * t) });
  }

  /* x4 — company: several lines converge into one. */
  const companyCtrl: CurvePoint[] = [
    { x: s(4), y: base },
    { x: s(4) + stationW * 0.34, y: base + amp * 0.3 },
    { x: s(4) + stationW * 0.62, y: base - amp * 0.22 },
    { x: s(5), y: base },
  ];
  const company = catmull(companyCtrl);
  anchors.t1 = sampleAt(company, 0.34);
  anchors.t2 = sampleAt(company, 0.72);

  const ghostA = catmull([
    { x: s(4) + stationW * 0.02, y: base - amp * 1.15 },
    { x: s(4) + stationW * 0.3, y: base - amp * 0.7 },
    { x: s(4) + stationW * 0.62, y: base - amp * 0.2 },
  ]);
  const ghostB = catmull([
    { x: s(4) + stationW * 0.02, y: base + amp * 0.95 },
    { x: s(4) + stationW * 0.3, y: base + amp * 0.6 },
    { x: s(4) + stationW * 0.62, y: base + amp * 0.24 },
  ]);

  /* x5 — contact: the function approaches its limit. */
  const asymY = base - clamp(stripH * 0.16, 34, 58);
  const limit = catmull([
    { x: s(5), y: base },
    { x: s(5) + stationW * 0.26, y: base - amp * 0.3 },
    { x: s(5) + stationW * 0.55, y: asymY + 8 },
    { x: worldW - 26, y: asymY },
  ]);
  anchors.origin = { x: originX, y: base };
  anchors.end = limit[limit.length - 1];

  const mainD = toPath(
    [...axis, ...systems.slice(1), ...compute.slice(1), ...research.slice(1), ...company.slice(1), ...limit.slice(1)],
    1
  );

  return {
    mainD,
    logo: { axesD, sD, radius: r },
    ghostA: toPath(ghostA, 0.8),
    ghostB: toPath(ghostB, 0.8),
    asymptote: { x1: s(5) + stationW * 0.3, x2: worldW - 12, y: asymY },
    anchors,
  };
};

/* Which station the travelling point is currently in (for nav highlight). */
export const stationAt = (x: number, layout: FxLayout): number =>
  clamp(Math.floor(x / layout.stationW), 0, STATION_COUNT - 1);
