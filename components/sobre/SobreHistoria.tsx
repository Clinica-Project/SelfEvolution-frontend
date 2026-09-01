import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { sobreContent } from "@/lib/content/institucional";

const rise = {
  hidden: { y: "108%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay, ease: EASE_EXPO },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_EXPO },
  }),
};

export function SobreHistoria() {
  const { historia } = sobreContent;
  const reduced = useReducedMotion();
  const foto = historia.fotos[1];
  const [problema, origem, crenca] = historia.paragrafos;

  const enter = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.35 },
      };

  return (
    <section className="relative isolate bg-surface-background">
      <div className="relative flex min-h-[100svh] flex-col lg:block">
        <div className="relative min-h-[13rem] flex-1 overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:min-h-0 lg:w-[52%] lg:flex-none">
          <img
            src={foto.src}
            alt={foto.alt}
            width={1600}
            height={1067}
            className="h-full w-full object-cover object-[center_20%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-surface-background to-transparent lg:block"
          />
        </div>

        <motion.div
          className="relative mx-auto flex w-full max-w-7xl shrink-0 flex-col justify-center px-page py-10 lg:min-h-[100svh] lg:px-8 lg:py-28"
          {...enter}
        >
          <div className="max-w-xl lg:max-w-[34rem]">
            <h2 className="font-display text-[clamp(2.4rem,5.4vw,4.75rem)] font-bold leading-[0.94] tracking-[-0.04em] text-content-primary">
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" custom={0.04} variants={reduced ? undefined : rise}>
                  Uma clínica
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" custom={0.14} variants={reduced ? undefined : rise}>
                  que conversa
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block font-light italic"
                  custom={0.24}
                  variants={reduced ? undefined : rise}
                >
                  entre si
                </motion.span>
              </span>
            </h2>

            <motion.p
              className="mt-8 text-[15px] leading-relaxed text-content-muted lg:text-base"
              custom={0.36}
              variants={reduced ? undefined : fade}
            >
              {problema}
            </motion.p>
            <motion.p
              className="mt-5 text-[15px] leading-relaxed text-content-primary lg:text-base"
              custom={0.46}
              variants={reduced ? undefined : fade}
            >
              {origem}
            </motion.p>
            <motion.p
              className="mt-8 max-w-md font-display text-xl font-medium leading-snug text-brand-primary lg:text-[1.35rem]"
              custom={0.56}
              variants={reduced ? undefined : fade}
            >
              {crenca}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
