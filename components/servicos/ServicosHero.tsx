import { motion, useReducedMotion } from "framer-motion";
import { LineReveal } from "@/components/motion/LineReveal";
import { EASE_EXPO } from "@/lib/motion";
import { servicosContent } from "@/lib/content/institucional";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: EASE_EXPO },
});

function DrawRule({ className, delay }: { className?: string; delay: number }) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 2"
      className={className}
      fill="none"
    >
      <motion.path
        d="M0 1h72"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.15, delay, ease: EASE_EXPO }}
      />
    </svg>
  );
}

export function ServicosHero() {
  const { hero } = servicosContent;
  const reduced = useReducedMotion();
  const fade = reduced ? {} : enter(0.55);

  return (
    <section className="grain-overlay relative isolate overflow-hidden pb-20 pt-32 lg:min-h-[88svh] lg:pb-28 lg:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-brand-primary/15 blur-[120px] animate-float-a" />
        <div className="absolute right-[-8rem] top-32 h-[24rem] w-[24rem] rounded-full bg-brand-secondary/20 blur-[130px] animate-float-b" />
        <div className="absolute bottom-[-6rem] left-1/3 h-64 w-64 rounded-full bg-[#c4b5e0]/40 blur-[100px] animate-float-c" />
        <ConstellationDust />
      </div>

      <div className="relative z-[1] mx-auto max-w-5xl px-page lg:px-8">
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-brand-primary">
          <DrawRule className="h-[2px] w-10 text-brand-primary/70 lg:w-16" delay={0.12} />
          <motion.span {...(reduced ? {} : enter(0.18))}>{hero.eyebrow}</motion.span>
          <DrawRule className="hidden h-[2px] w-16 text-brand-primary/40 sm:block" delay={0.28} />
        </div>

        <h1 className="mt-7 font-display text-[clamp(2.8rem,8vw,6.2rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-content-primary">
          {hero.tituloLinhas.map((linha, index) => (
            <LineReveal key={linha} delay={0.28 + index * 0.1}>
              {linha}
            </LineReveal>
          ))}
        </h1>

        <motion.p
          {...fade}
          className="mt-8 max-w-xl text-lg font-light leading-relaxed text-content-secondary lg:text-xl"
        >
          {hero.subtitulo}
        </motion.p>
      </div>
    </section>
  );
}

function ConstellationDust() {
  const dots = [
    [12, 22],
    [28, 18],
    [41, 30],
    [63, 16],
    [78, 24],
    [88, 38],
    [18, 58],
    [34, 72],
    [52, 64],
    [71, 78],
    [86, 68],
    [9, 42],
    [47, 48],
    [93, 54],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-brand-primary/25"
    >
      {dots.map(([x, y], index) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 3 === 0 ? 0.55 : 0.35} fill="currentColor" />
      ))}
      <path
        d="M12 22 L28 18 L41 30 L63 16 L78 24 M18 58 L34 72 L52 64 L71 78 M41 30 L47 48 L52 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.12"
        strokeDasharray="0.6 1.4"
        opacity="0.7"
      />
    </svg>
  );
}
