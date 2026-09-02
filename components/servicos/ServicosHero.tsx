import { motion, useReducedMotion } from "framer-motion";
import { LineReveal } from "@/components/motion/LineReveal";
import { EASE_EXPO } from "@/lib/motion";
import { servicosContent } from "@/lib/content/institucional";

export function ServicosHero() {
  const { hero } = servicosContent;
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1C1916] text-white">
      <img
        src="/hero/02-equipe.jpg"
        alt="Equipe reunida na clínica"
        width={1600}
        height={1067}
        className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1C1916]/90 via-[#1C1916]/55 to-[#1C1916]/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#1C1916] to-transparent"
      />

      <div className="relative z-[1] mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-page pb-16 pt-32 lg:px-8 lg:pb-20">
        <p className="font-serif text-sm italic text-white/55">{hero.eyebrow}</p>

        <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,8vw,6.4rem)] font-bold leading-[0.94] tracking-[-0.04em]">
          <LineReveal delay={0.12} innerClassName="font-light">
            {hero.tituloLinhas[0]}
          </LineReveal>
          <LineReveal delay={0.22}>{hero.tituloLinhas[1]}</LineReveal>
          <LineReveal delay={0.32} innerClassName="font-light italic">
            {hero.tituloLinhas[2]}
          </LineReveal>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-white/78 lg:text-lg"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, delay: 0.52, ease: EASE_EXPO },
              })}
        >
          {hero.subtitulo}
        </motion.p>
      </div>
    </section>
  );
}
