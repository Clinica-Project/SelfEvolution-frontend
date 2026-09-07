import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { LineReveal } from "@/components/motion/LineReveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { EASE_EXPO } from "@/lib/motion";
import {
  type Unidade,
  unidadeWhatsappHref,
} from "@/lib/content/unidades";

export function UnidadeHero({ unit }: { unit: Unidade }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1C1916] text-white">
      <img
        src={unit.heroImage}
        alt={unit.heroAlt}
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1C1916]/92 via-[#1C1916]/58 to-[#1C1916]/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#1C1916] to-transparent"
      />

      <div className="relative z-[1] mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-page pb-16 pt-32 lg:px-8 lg:pb-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
          {unit.city} · {unit.neighborhood}
        </p>

        <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.25rem,8vw,6.2rem)] font-bold leading-[0.94] tracking-[-0.04em]">
          <LineReveal delay={0.12} innerClassName="font-light">
            Unidade
          </LineReveal>
          <LineReveal delay={0.22}>{unit.name}</LineReveal>
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
          {unit.subtitle}
        </motion.p>

        <motion.div
          className="mt-10"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.62, ease: EASE_EXPO },
              })}
        >
          <Magnetic strength={8} className="w-full sm:w-auto">
            <a
              href={unidadeWhatsappHref(unit.name)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#2BB673] px-4 sm:px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(43,182,115,0.55)] transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:bg-[#249E64] active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
              Agendar pelo WhatsApp
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
