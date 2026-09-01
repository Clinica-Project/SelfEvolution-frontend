import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Faixas de progresso em que cada gesto está em foco. */
export const JOURNEY_STATIONS = [
  [0, 0.06, 0.2, 0.34],
  [0.28, 0.42, 0.58, 0.7],
  [0.64, 0.78, 0.94, 1],
] as const;

type Point = { x: number; y: number };

type Station = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  midX: number;
  midY: number;
};

function offsetTo(el: HTMLElement, ancestor: HTMLElement) {
  const edge = el.getBoundingClientRect();
  const origin = ancestor.getBoundingClientRect();
  return {
    x: edge.left - origin.left + ancestor.scrollLeft,
    y: edge.top - origin.top + ancestor.scrollTop,
  };
}

function readStations(root: HTMLElement): Station[] {
  const images = [...root.querySelectorAll<HTMLElement>("[data-journey-image]")];
  if (images.length < 3) return [];

  return images.slice(0, 3).map((image) => {
    const { x, y } = offsetTo(image, root);
    const width = image.offsetWidth;
    const height = image.offsetHeight;
    return {
      left: x,
      right: x + width,
      top: y,
      bottom: y + height,
      midX: x + width / 2,
      midY: y + height / 2,
    };
  });
}

const fmt = (n: number) => n.toFixed(1);

function len(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function dir(a: Point, b: Point): Point {
  const d = len(a, b) || 1;
  return { x: (b.x - a.x) / d, y: (b.y - a.y) / d };
}

/** Trilha nos vãos do zigue-zague, com cantos largos. */
function riverPath(points: Point[], radius: number) {
  if (points.length < 2) return "";

  let d = `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;

  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    const into = dir(prev, curr);
    const out = dir(curr, next);
    const rad = Math.min(radius, len(prev, curr) / 2.05, len(curr, next) / 2.05);
    const start = { x: curr.x - into.x * rad, y: curr.y - into.y * rad };
    const end = { x: curr.x + out.x * rad, y: curr.y + out.y * rad };
    const handle = rad * 0.58;

    d += ` L ${fmt(start.x)} ${fmt(start.y)}`;
    d += ` C ${fmt(start.x + into.x * handle)} ${fmt(start.y + into.y * handle)}, ${fmt(end.x - out.x * handle)} ${fmt(end.y - out.y * handle)}, ${fmt(end.x)} ${fmt(end.y)}`;
  }

  const last = points[points.length - 1];
  d += ` L ${fmt(last.x)} ${fmt(last.y)}`;
  return d;
}

/** Fundo do 1 → vão → lateral do 2 → vão → topo do 3. */
function buildTrailDesktop(a: Station, b: Station, c: Station) {
  const start = { x: a.left + (a.right - a.left) * 0.58, y: a.bottom + 6 };
  const kissX = b.left - 22;
  const end = { x: c.left + (c.right - c.left) * 0.58, y: c.top - 6 };
  const midAB = a.bottom + (b.top - a.bottom) * 0.46;
  const midBC = b.bottom + (c.top - b.bottom) * 0.5;

  return riverPath(
    [
      start,
      { x: start.x, y: midAB },
      { x: kissX, y: midAB },
      { x: kissX, y: midBC },
      { x: end.x, y: midBC },
      end,
    ],
    140
  );
}

function buildTrailMobile(a: Station, b: Station, c: Station) {
  const x = Math.max(a.left - 16, 16);
  const midAB = (a.bottom + b.top) / 2;
  const midBC = (b.bottom + c.top) / 2;

  return [
    `M ${fmt(x)} ${fmt(a.top + 8)}`,
    `C ${fmt(x + 18)} ${fmt(midAB - 12)}, ${fmt(x - 14)} ${fmt(midAB + 12)}, ${fmt(x)} ${fmt(b.top - 8)}`,
    `C ${fmt(x + 16)} ${fmt(midBC - 10)}, ${fmt(x - 12)} ${fmt(midBC + 10)}, ${fmt(x)} ${fmt(c.top - 8)}`,
  ].join(" ");
}

function buildStops(a: Station, b: Station, c: Station, mobile: boolean): Point[] {
  if (mobile) {
    const x = Math.max(a.left - 16, 16);
    return [
      { x, y: a.top + 8 },
      { x, y: b.top - 8 },
      { x, y: c.top - 8 },
    ];
  }

  return [
    { x: a.left + (a.right - a.left) * 0.58, y: a.bottom + 6 },
    { x: b.left - 22, y: b.midY },
    { x: c.left + (c.right - c.left) * 0.58, y: c.top - 6 },
  ];
}

type JourneyTrailProps = {
  progress: MotionValue<number>;
  reduced: boolean;
  rootRef: RefObject<HTMLElement | null>;
};

export function JourneyTrail({ progress, reduced, rootRef }: JourneyTrailProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [box, setBox] = useState({ w: 100, h: 800 });
  const [stations, setStations] = useState<Station[]>([]);

  const draw = useSpring(progress, {
    stiffness: reduced ? 280 : 62,
    damping: reduced ? 40 : 20,
    mass: reduced ? 0.2 : 0.42,
    restDelta: 0.001,
  });

  const dashOffset = useTransform(draw, [0, 1], [1, 0]);
  const nibX = useMotionValue(0);
  const nibY = useMotionValue(0);
  const nibScale = useTransform(draw, [0, 0.03, 0.96, 1], [0.35, 1, 1, 0.82]);
  const nibOpacity = useTransform(draw, [0, 0.02, 0.98, 1], [0, 1, 1, 0.85]);

  const stop0 = useTransform(draw, [0.02, 0.1, 0.24, 0.36], [0.22, 1, 1, 0.28]);
  const stop1 = useTransform(draw, [0.36, 0.46, 0.58, 0.7], [0.22, 1, 1, 0.28]);
  const stop2 = useTransform(draw, [0.72, 0.84, 1], [0.22, 1, 1]);
  const stopOpacities = [stop0, stop1, stop2];
  const scale0 = useTransform(draw, [0.02, 0.1, 0.24, 0.36], [0.7, 1.15, 1.15, 0.85]);
  const scale1 = useTransform(draw, [0.36, 0.46, 0.58, 0.7], [0.7, 1.15, 1.15, 0.85]);
  const scale2 = useTransform(draw, [0.72, 0.84, 1], [0.7, 1.15, 1.15]);
  const stopScales = [scale0, scale1, scale2];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const { width, height } = root.getBoundingClientRect();
      if (width < 8 || height < 8) return;
      setBox({ w: width, h: height });
      setStations(readStations(root));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    root.querySelectorAll("[data-journey-image]").forEach((node) => observer.observe(node));
    const images = root.querySelectorAll("[data-journey-image] img");
    images.forEach((img) => img.addEventListener("load", update));
    return () => {
      observer.disconnect();
      images.forEach((img) => img.removeEventListener("load", update));
    };
  }, [desktop, rootRef]);

  const syncNib = (value: number) => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    if (total < 1) return;
    const t = Math.max(0, Math.min(1, value));
    const point = path.getPointAtLength(t * total);
    nibX.set(point.x);
    nibY.set(point.y);
  };

  useMotionValueEvent(draw, "change", syncNib);

  useEffect(() => {
    syncNib(draw.get());
  }, [stations, draw]);

  const trail =
    stations.length === 3
      ? desktop
        ? buildTrailDesktop(stations[0], stations[1], stations[2])
        : buildTrailMobile(stations[0], stations[1], stations[2])
      : "";
  const stops = stations.length === 3 ? buildStops(stations[0], stations[1], stations[2], !desktop) : [];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-visible">
      {trail ? (
        <svg
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          className="absolute inset-0 overflow-visible"
        >
          <path
            d={trail}
            fill="none"
            stroke="#6B4E91"
            strokeWidth={desktop ? 10 : 8}
            strokeOpacity={0.06}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={trail}
            fill="none"
            stroke="#6B4E91"
            strokeWidth={desktop ? 2.25 : 1.9}
            strokeOpacity={0.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            ref={pathRef}
            d={trail}
            fill="none"
            stroke="#6B4E91"
            strokeWidth={desktop ? 3 : 2.4}
            strokeOpacity={0.82}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: reduced ? 0 : dashOffset }}
          />

          {stops.map((stop, index) => (
            <motion.g
              key={index}
              style={{
                x: stop.x,
                y: stop.y,
                opacity: reduced ? 1 : stopOpacities[index],
                scale: reduced ? 1 : stopScales[index],
              }}
            >
              <circle r={9} fill="#6B4E91" fillOpacity={0.1} />
              <circle r={4} fill="#6B4E91" />
            </motion.g>
          ))}

          {reduced ? null : (
            <motion.g
              style={{
                x: nibX,
                y: nibY,
                scale: nibScale,
                opacity: nibOpacity,
              }}
            >
              <circle r={13} fill="#6B4E91" fillOpacity={0.14} />
              <circle r={5} fill="#6B4E91" />
            </motion.g>
          )}
        </svg>
      ) : null}
    </div>
  );
}
