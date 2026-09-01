import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { LineReveal } from "@/components/motion/LineReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

const SLIDE_MS = 6500;

const SLIDES = [
  {
    src: "/hero/01-escuta.jpg",
    alt: "Sessão de escuta com caderno e luz natural",
    label: "Escuta",
  },
  {
    src: "/hero/02-equipe.jpg",
    alt: "Equipe interdisciplinar reunida em consulta na clínica",
    label: "Equipe",
  },
  {
    src: "/hero/03-infancia.jpg",
    alt: "Acompanhamento infantil com blocos de madeira",
    label: "Infância",
  },
  {
    src: "/hero/04-online.jpg",
    alt: "Atendimento online em um escritório calmo",
    label: "Online",
  },
  {
    src: "/hero/05-espaco.jpg",
    alt: "Sala de espera da clínica, clara e silenciosa",
    label: "Espaço",
  },
] as const;

export function HeroSection() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const enter = (delay: number, y = 24) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_EXPO },
        };

  return (
    <section
      ref={containerRef}
      className="relative isolate h-[100svh] overflow-hidden bg-white"
    >
      <motion.div
        aria-hidden="true"
        style={desktop && !reduced ? { y: photoY } : undefined}
        className="absolute inset-0 will-change-transform"
      >
        <HeroCarousel />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/70 to-transparent lg:w-[62%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black/25 to-transparent"
      />

      <div className="pointer-events-none relative z-[2] mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-page pb-16 pt-28 lg:justify-center lg:px-8 lg:pb-20">
        <div className="pointer-events-auto">
        <motion.p
          {...enter(0.15, 12)}
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary"
        >
          <span aria-hidden="true" className="h-px w-10 bg-brand-primary/60" />
          clínica interdisciplinar
        </motion.p>

        <h1 className="mt-7 font-display leading-[0.95] tracking-[-0.04em] text-content-primary">
          <LineReveal delay={0.25}>
            <span className="block text-[clamp(3rem,9vw,7.5rem)] font-light">
              Cuidado
            </span>
          </LineReveal>
          <LineReveal delay={0.38}>
            <span className="block text-[clamp(3rem,9vw,7.5rem)] font-bold">
              que evolui
            </span>
          </LineReveal>
          <LineReveal delay={0.5}>
            <span className="mt-1 block text-[clamp(3rem,9vw,7.5rem)] font-bold text-brand-primary">
              com{" "}
              <span className="relative inline-block">
                você
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[0.12em] w-full origin-left rounded-full bg-brand-accent-yellow"
                  initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.85, delay: 1.05, ease: EASE_EXPO }}
                />
              </span>
            </span>
          </LineReveal>
        </h1>

        <motion.div {...enter(0.72, 14)} className="mt-10">
          <Magnetic strength={10}>
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-primary px-7 py-3.5 text-[15px] font-semibold text-content-inverse shadow-[0_16px_40px_-16px_rgba(107,78,145,0.55)] transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:bg-brand-primary-dark active:scale-[0.98]"
            >
              Conheça nossos serviços
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Magnetic>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroCarousel() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const remainingMs = useRef(SLIDE_MS);
  const current = SLIDES[index] ?? SLIDES[0];

  useEffect(() => {
    remainingMs.current = SLIDE_MS;
  }, [index]);

  useEffect(() => {
    if (reduced || paused) return;

    const startedAt = Date.now();
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, remainingMs.current);

    return () => {
      remainingMs.current = Math.max(400, remainingMs.current - (Date.now() - startedAt));
      window.clearTimeout(id);
    };
  }, [reduced, paused, index]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={2752}
          height={1536}
          fetchPriority={index === 0 ? "high" : "low"}
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: reduced ? 1 : 1.06,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: reduced ? 0.2 : 1.4, ease: EASE_EXPO },
            scale: { duration: reduced ? 0 : SLIDE_MS / 1000, ease: "linear" },
          }}
          className="absolute inset-0 z-[1] h-full w-full object-cover object-[70%_center]"
        />
      </AnimatePresence>

      <div className="absolute inset-x-6 bottom-6 z-10 flex items-end gap-2 lg:inset-x-10 lg:bottom-8">
        {SLIDES.map((slide, i) => {
          const active = i === index;

          return (
            <button
              key={slide.src}
              type="button"
              aria-label={`Mostrar ${slide.label}`}
              aria-current={active ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/40"
            >
              <span
                key={active ? `fill-${index}` : slide.src}
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand-primary",
                  active && reduced && "scale-x-100",
                  active && !reduced && "animate-hero-progress",
                  !active && "scale-x-0"
                )}
                style={{
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
