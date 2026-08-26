import { motion, useReducedMotion } from "framer-motion";
import { FloatingOrbs } from "@/components/home/FloatingOrbs";
import { LineReveal } from "@/components/motion/LineReveal";
import { EASE_EXPO } from "@/lib/motion";

type PageHeroProps = {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
};

export function PageHero({ eyebrow, titulo, subtitulo }: PageHeroProps) {
  const reduced = useReducedMotion();

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE_EXPO },
        };

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 lg:pb-20 lg:pt-40">
      <FloatingOrbs variant="soft" />

      <div className="relative mx-auto max-w-4xl px-page lg:px-8">
        <motion.p
          {...enter(0.15)}
          className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-brand-primary"
        >
          <span aria-hidden="true" className="h-px w-8 bg-brand-primary/40" />
          {eyebrow}
        </motion.p>
        <h1 className="mt-6 text-balance font-display text-display-hero font-bold text-content-primary">
          <LineReveal delay={0.28}>{titulo}</LineReveal>
        </h1>
        <motion.p
          {...enter(0.55)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-content-secondary lg:text-xl"
        >
          {subtitulo}
        </motion.p>
      </div>
    </section>
  );
}
