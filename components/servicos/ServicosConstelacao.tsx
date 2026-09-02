import { useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useIsDesktop } from "@/components/sobre/scroll";
import { getLenisInstance } from "@/lib/lenis-instance";
import { servicosContent } from "@/lib/content/institucional";
import { EASE_EXPO, HEADER_SCROLL_OFFSET } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";
import { ServicoIconAnimado } from "@/components/servicos/ServicoIconAnimado";
import {
  EDGES,
  NODES_DESKTOP,
  NODES_MOBILE,
} from "@/components/servicos/constelacao";

function scrollToServico(slug: string) {
  const el = document.getElementById(`servico-${slug}`);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_SCROLL_OFFSET });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

type EdgeProps = {
  progress: MotionValue<number>;
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
  highlighted: boolean;
  dimmed: boolean;
  reduced: boolean;
};

function ConstellationEdge({
  progress,
  from,
  to,
  delay,
  highlighted,
  dimmed,
  reduced,
}: EdgeProps) {
  const pathLength = useTransform(progress, [delay, Math.min(1, delay + 0.28)], [0, 1]);
  const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#servico-line)"
      strokeWidth={highlighted ? 1.8 : 1}
      strokeLinecap="round"
      style={reduced ? undefined : { pathLength }}
      className="origin-center"
      animate={{
        opacity: dimmed ? 0.08 : highlighted ? 1 : 0.42,
      }}
      transition={{ duration: 0.35, ease: EASE_EXPO }}
    />
  );
}

export function ServicosConstelacao() {
  const { intro, servicos } = servicosContent;
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const nodes = desktop ? NODES_DESKTOP : NODES_MOBILE;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "center 0.55"],
  });

  const related = useMemo(() => {
    if (active === null) return null;
    return new Set([active, ...servicos[active].relacionados]);
  }, [active, servicos]);

  return (
    <section
      ref={sectionRef}
      className="grain-overlay relative isolate overflow-hidden border-y border-border/70 bg-surface-muted/40 py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-page lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-primary">
          {intro.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold tracking-[-0.035em] text-content-primary">
          {intro.titulo}
        </h2>
        <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-content-secondary lg:text-lg">
          {intro.descricao}
        </p>
        <p className="mt-3 text-sm text-content-muted">
          Passe o cursor — ou toque — numa especialidade para ver com quem ela conversa.
        </p>
      </div>

      <div
        className={cn(
          "relative mx-auto mt-12 max-w-7xl px-page lg:mt-16 lg:px-8"
        )}
      >
        <div
          className={cn("relative", desktop ? "h-[min(42rem,72svh)]" : "h-[44rem]")}
          onMouseLeave={() => setActive(null)}
        >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="servico-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B4E91" />
              <stop offset="55%" stopColor="#6297F5" />
              <stop offset="100%" stopColor="#b39ddb" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], index) => {
            const highlighted = active !== null && (a === active || b === active);
            const dimmed = active !== null && !highlighted;
            return (
              <ConstellationEdge
                key={`${a}-${b}`}
                progress={scrollYProgress}
                from={nodes[a]}
                to={nodes[b]}
                delay={index * 0.05}
                highlighted={highlighted}
                dimmed={dimmed}
                reduced={Boolean(reduced)}
              />
            );
          })}
        </svg>

        {servicos.map((servico, index) => {
          const node = nodes[index];
          const isOn = related === null || related.has(index);
          const isActive = active === index;
          return (
            <button
              key={servico.slug}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              onClick={() => scrollToServico(servico.slug)}
              aria-label={`${servico.titulo}. Ver detalhes`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={cn(
                "group absolute z-[1] flex w-[7.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5 sm:w-36",
                "transition-[opacity,transform] duration-500 ease-expo",
                isOn ? "opacity-100" : "opacity-25"
              )}
            >
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full border bg-surface-card text-brand-primary shadow-sm transition-[box-shadow,border-color,transform] duration-500 ease-expo sm:h-16 sm:w-16",
                  isActive
                    ? "scale-110 border-transparent shadow-glow ring-2 ring-brand-primary/30"
                    : "border-border group-hover:border-brand-primary-light/50 group-hover:shadow-md"
                )}
                style={
                  isActive
                    ? {
                        backgroundImage:
                          "linear-gradient(#fff, #fff), linear-gradient(135deg, #6B4E91, #6297F5, #c4b5e0)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }
                    : undefined
                }
              >
                <span className="h-6 w-6 sm:h-7 sm:w-7">
                  <ServicoIconAnimado name={servico.icon} />
                </span>
              </span>
              <span
                className={cn(
                  "text-center font-display text-[11px] font-bold leading-tight tracking-[-0.02em] sm:text-sm",
                  isActive ? "text-brand-primary" : "text-content-primary"
                )}
              >
                {node.label}
              </span>
            </button>
          );
        })}
        </div>
      </div>
    </section>
  );
}
