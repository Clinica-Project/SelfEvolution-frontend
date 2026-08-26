import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export function ManifestoSection() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-surface-card py-28 lg:py-40">
      {/* Watermark tipográfico */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-10 select-none font-display text-[clamp(8rem,22vw,18rem)] font-bold leading-none tracking-[-0.06em] text-brand-primary/[0.04] lg:top-0"
      >
        sobre
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-page lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
              manifesto
            </p>
            <div
              aria-hidden="true"
              className="mt-8 h-24 w-px bg-gradient-to-b from-brand-primary to-brand-primary/0"
            />
          </Reveal>

          {/* Rosácea — assinatura visual Instagram */}
          <Reveal delay={0.15} className="mt-16 hidden lg:block">
            <div className="relative h-44 w-44">
              <span className="absolute left-1/2 top-0 h-[62%] w-[62%] -translate-x-1/2 rounded-full bg-brand-primary/50 mix-blend-multiply" />
              <span className="absolute bottom-0 left-0 h-[62%] w-[62%] rounded-full bg-brand-secondary/45 mix-blend-multiply" />
              <span className="absolute bottom-0 right-0 h-[62%] w-[62%] rounded-full bg-brand-accent-teal/45 mix-blend-multiply" />
              <span className="absolute left-1/2 top-[18%] h-[62%] w-[62%] -translate-x-1/2 rounded-full bg-brand-accent-yellow/40 mix-blend-multiply" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-content-primary">
            <LineReveal onView delay={0.05}>
              Acreditamos que evoluir
            </LineReveal>
            <LineReveal onView delay={0.14}>
              é um processo{" "}
              <span className="text-brand-primary">compartilhado</span>
            </LineReveal>
            <LineReveal onView delay={0.22}>
              — feito de escuta,
            </LineReveal>
            <LineReveal onView delay={0.3}>
              <span className="mark-accent">ciência</span> e presença.
            </LineReveal>
          </h2>

          <RevealGroup stagger={0.1} className="mt-12 grid gap-8 sm:grid-cols-2">
            <RevealItem>
              <p className="text-base leading-relaxed text-content-secondary lg:text-lg">
                Somos uma clínica interdisciplinar dedicada a oferecer um espaço{" "}
                <strong className="font-semibold text-content-primary">
                  acolhedor
                </strong>
                , com linguagem clara e atendimento profissional para cada história
                que chega até nós.
              </p>
            </RevealItem>
            <RevealItem>
              <blockquote className="border-l-2 border-brand-primary/40 pl-5 font-display text-xl font-medium leading-snug text-content-primary">
                Você não está sozinho(a) nesta jornada.
              </blockquote>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-content-muted">
                SelfEvolution · essência
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
