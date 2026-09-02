import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
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
  const enter = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.35 },
      };
  const primaryExternal = cta.href.startsWith("http");
  const secondaryExternal =
    cta.secondaryHref.startsWith("http") || cta.secondaryHref.startsWith("mailto:");

  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      <div className="relative mx-auto max-w-7xl lg:min-h-[min(36rem,82svh)]">
        <motion.div
          className="flex flex-col justify-center px-page py-20 lg:max-w-[52%] lg:px-8 lg:py-28"
          {...enter}
        >
          <h2 className="max-w-[12ch] font-display text-[clamp(2.6rem,6.4vw,5.25rem)] font-bold leading-[0.96] tracking-[-0.04em]">
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
            className="mt-8 max-w-md text-base leading-relaxed text-white/75 lg:text-lg"
            custom={0.38}
            variants={reduced ? undefined : fade}
          >
            {cta.descricao}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center"
            custom={0.5}
            variants={reduced ? undefined : fade}
          >
            <Magnetic strength={8}>
              <a
                href={cta.href}
                target={primaryExternal ? "_blank" : undefined}
                rel={primaryExternal ? "noreferrer" : undefined}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-brand-primary transition-transform duration-300 ease-expo hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            {secondaryExternal ? (
              <a
                href={cta.secondaryHref}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/70 transition-colors duration-300 ease-expo hover:text-white"
              >
                {cta.secondaryLabel}
              </a>
            ) : (
              <Link
                href={cta.secondaryHref}
                className="text-sm text-white/70 transition-colors duration-300 ease-expo hover:text-white"
              >
                {cta.secondaryLabel}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
        <img
          src={cta.image ?? "/hero/13-cta.jpg"}
          alt={cta.imageAlt ?? ""}
          width={2400}
          height={1792}
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
      </div>
    </section>
  );
}
