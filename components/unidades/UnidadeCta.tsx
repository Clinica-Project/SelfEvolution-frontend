import { motion, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { EASE_EXPO } from "@/lib/motion";
import {
  type Unidade,
  unidadeWhatsappHref,
} from "@/lib/content/unidades";

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

export function UnidadeCta({ unit }: { unit: Unidade }) {
  const reduced = useReducedMotion();
  const enter = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.35 },
      };

  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      <div className="relative mx-auto max-w-7xl lg:min-h-[min(32rem,78svh)]">
        <motion.div
          className="flex flex-col justify-center px-page py-20 lg:max-w-[52%] lg:px-8 lg:py-28"
          {...enter}
        >
          <h2 className="max-w-[12ch] font-display text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[0.96] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                custom={0.04}
                variants={reduced ? undefined : rise}
              >
                Vamos
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                custom={0.14}
                variants={reduced ? undefined : rise}
              >
                marcar?
              </motion.span>
            </span>
          </h2>

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-white/75 lg:text-lg"
            custom={0.38}
            variants={reduced ? undefined : fade}
          >
            Fale com a equipe pelo WhatsApp e agende na unidade {unit.name}.
            Presencial aqui, online para todo o Brasil.
          </motion.p>

          <motion.div className="mt-12" custom={0.5} variants={reduced ? undefined : fade}>
            <Magnetic strength={8} className="w-full sm:w-auto">
              <a
                href={unidadeWhatsappHref(unit.name)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#2BB673] px-4 sm:px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(43,182,115,0.55)] transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:bg-[#249E64] active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
                WhatsApp da clínica
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
        <img
          src={unit.structure[0]?.image ?? unit.heroImage}
          alt={unit.structure[0]?.imageAlt ?? unit.heroAlt}
          width={1600}
          height={1100}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
}
