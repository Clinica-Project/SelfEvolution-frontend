import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { RippleInk, useRipple } from "@/components/motion/Ripple";
import { EASE_EXPO } from "@/lib/motion";
import { servicosContent } from "@/lib/content/institucional";

const rise = {
  hidden: { y: "108%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.95, delay, ease: EASE_EXPO },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: EASE_EXPO },
  }),
};

export function ServicosCta() {
  const { cta } = servicosContent;
  const reduced = useReducedMotion();
  const primaryRipple = useRipple();
  const secondaryRipple = useRipple();
  const enter = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.35 },
      };
  const primaryExternal = cta.href.startsWith("http");

  return (
    <section className="grain-overlay relative overflow-hidden text-white">
      <div aria-hidden="true" className="mesh-cta absolute inset-0" />

      <div className="relative z-[1] mx-auto max-w-7xl px-page py-24 lg:px-8 lg:py-32">
        <motion.div className="max-w-2xl" {...enter}>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span className="block" custom={0.04} variants={reduced ? undefined : rise}>
                Não sabe
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span className="block" custom={0.14} variants={reduced ? undefined : rise}>
                por onde começar?
              </motion.span>
            </span>
          </h2>

          <motion.p
            className="mt-8 max-w-md text-base font-light leading-relaxed text-white/80 lg:text-lg"
            custom={0.38}
            variants={reduced ? undefined : fade}
          >
            {cta.descricao}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            custom={0.5}
            variants={reduced ? undefined : fade}
          >
            <Magnetic strength={8}>
              <a
                href={cta.href}
                target={primaryExternal ? "_blank" : undefined}
                rel={primaryExternal ? "noreferrer" : undefined}
                onPointerDown={primaryRipple.onPointerDown}
                className="btn-shine group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-brand-primary transition-transform duration-300 ease-expo hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <RippleInk ripples={primaryRipple.ripples} className="bg-brand-primary/20" />
                {cta.label}
                <ArrowRight
                  className="relative h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            <Magnetic strength={5}>
              <Link
                href={cta.secondaryHref}
                onPointerDown={secondaryRipple.onPointerDown}
                className="btn-shine relative inline-flex items-center overflow-hidden rounded-full border border-white/50 px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-white/10"
              >
                <RippleInk ripples={secondaryRipple.ripples} />
                {cta.secondaryLabel}
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
