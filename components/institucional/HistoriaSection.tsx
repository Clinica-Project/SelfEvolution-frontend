import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

type HistoriaSectionProps = {
  eyebrow: string;
  titulo: string;
  paragrafos: string[];
};

/** Bloco editorial centrado — história / por que existimos. */
export function HistoriaSection({ eyebrow, titulo, paragrafos }: HistoriaSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-page text-center lg:px-8">
        <RevealGroup stagger={0.12}>
          <RevealItem>
            <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-brand-primary">
              <span aria-hidden="true" className="h-px w-8 bg-brand-primary/40" />
              {eyebrow}
            </p>
          </RevealItem>

          <h2 className="mt-7 text-balance font-display text-display-section font-bold text-content-primary">
            <LineReveal onView delay={0.06}>
              {titulo}
            </LineReveal>
          </h2>

          {paragrafos.map((paragrafo) => (
            <RevealItem key={paragrafo.slice(0, 32)}>
              <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-content-secondary">
                {paragrafo}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
