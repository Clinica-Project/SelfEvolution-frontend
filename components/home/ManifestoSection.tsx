import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { Parallax } from "@/components/motion/Parallax";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";

export function ManifestoSection() {
  const reduced = useReducedMotion();

  return (
    <section id="sobre" className="relative bg-surface-background py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                manifesto
              </p>
            </Reveal>

            <h2 className="mt-8 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-content-primary">
              <LineReveal onView delay={0.05}>
                Acreditamos que evoluir
              </LineReveal>
              <LineReveal onView delay={0.14}>
                é um processo{" "}
                <span className="text-brand-primary">compartilhado</span>
              </LineReveal>
              <LineReveal onView delay={0.22}>
                — feito de escuta,{" "}
                <span className="mark-accent">ciência</span> e presença.
              </LineReveal>
            </h2>

            <Reveal delay={0.12}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-content-secondary lg:text-lg">
                Somos uma clínica interdisciplinar dedicada a oferecer um espaço{" "}
                <strong className="font-semibold text-content-primary">
                  acolhedor
                </strong>
                , com linguagem clara e atendimento profissional para cada
                história que chega até nós.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-content-primary">
                Você não está sozinho(a) nesta jornada.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden">
              <Parallax offset={16}>
                <motion.img
                  src="/hero/06-manifesto.jpg"
                  alt="Canto da clínica com poltrona, planta e luz natural"
                  width={1122}
                  height={1402}
                  className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/6] lg:min-h-[32rem]"
                  initial={reduced ? false : { scale: 1.06, opacity: 0.4 }}
                  whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.1, ease: EASE_EXPO }}
                />
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
