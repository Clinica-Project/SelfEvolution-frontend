import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ScrollProgressLine } from "@/components/motion/ScrollProgressLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstitucionalIcon } from "@/components/institucional/InstitucionalIcon";
import type { DiferencialDetalhado } from "@/lib/content/institucional";

type DiferenciaisDetalhadosSectionProps = {
  diferenciais: DiferencialDetalhado[];
};

export function DiferenciaisDetalhadosSection({
  diferenciais,
}: DiferenciaisDetalhadosSectionProps) {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-page lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="o que nos torna diferentes"
              title="Diferenciais que aparecem no dia a dia"
              description="Mais do que promessas: cada diferencial se traduz em um benefício concreto para quem é cuidado aqui."
            />
          </div>
        </Reveal>

        <ScrollProgressLine>
        <RevealGroup stagger={0.1} className="divide-y divide-border">
          {diferenciais.map(
            ({ titulo, descricao, beneficio, icon, accent }, index) => (
              <RevealItem key={titulo}>
                <article className="group flex gap-6 py-9 transition-transform duration-300 ease-expo hover:translate-x-1 lg:gap-8">
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <div
                      className={`inline-flex rounded-md p-3.5 transition-transform duration-300 ease-expo group-hover:scale-[1.08] ${accent}`}
                    >
                      <InstitucionalIcon name={icon} className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium tabular-nums text-content-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="pt-1">
                    <h3 className="font-display text-2xl font-semibold text-content-primary">
                      {titulo}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-content-secondary lg:text-lg">
                      {descricao}
                    </p>
                    <p className="mt-4 max-w-xl rounded-r-md border-l-2 border-brand-primary/50 bg-brand-primary/[0.05] py-2.5 pl-4 pr-3 text-sm leading-relaxed text-content-primary">
                      <strong className="font-semibold">Na prática:</strong>{" "}
                      {beneficio}
                    </p>
                  </div>
                </article>
              </RevealItem>
            )
          )}
        </RevealGroup>
        </ScrollProgressLine>
      </div>
    </section>
  );
}
