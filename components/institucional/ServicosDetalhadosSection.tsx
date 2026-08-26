import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { InstitucionalIcon } from "@/components/institucional/InstitucionalIcon";
import type { ServicoDetalhado } from "@/lib/content/institucional";

type ServicosDetalhadosSectionProps = {
  intro: { eyebrow: string; titulo: string; descricao: string };
  servicos: ServicoDetalhado[];
};

export function ServicosDetalhadosSection({
  intro,
  servicos,
}: ServicosDetalhadosSectionProps) {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={intro.eyebrow}
            title={intro.titulo}
            description={intro.descricao}
          />
        </Reveal>

        <RevealGroup stagger={0.08} className="mt-14 grid gap-6 [perspective:1000px] lg:grid-cols-2">
          {servicos.map(
            ({ titulo, descricao, paraQuem, oQueEsperar, formatos, icon }, index) => (
              <RevealItem key={titulo}>
                <TiltCard className="h-full">
                <article className="group relative h-full overflow-hidden rounded-lg border border-border bg-surface-card p-7 shadow-sm transition-all duration-300 ease-expo hover:-translate-y-1.5 hover:border-brand-primary-light/40 hover:shadow-glow lg:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-4 font-display text-6xl font-bold text-brand-primary/[0.05]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex rounded-md bg-brand-primary/10 p-3 text-brand-primary transition-transform duration-300 ease-expo group-hover:scale-[1.08]">
                      <InstitucionalIcon name={icon} className="h-5 w-5" />
                    </div>
                    <div className="flex gap-2">
                      {formatos.map((formato) => (
                        <Badge key={formato} variant="secondary">
                          {formato}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold text-content-primary">
                    {titulo}
                  </h3>
                  <p className="mt-3 leading-relaxed text-content-secondary">
                    {descricao}
                  </p>

                  <dl className="mt-6 space-y-4 border-t border-border pt-6">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary">
                        Para quem
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-content-secondary">
                        {paraQuem}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary">
                        O que esperar
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-content-secondary">
                        {oQueEsperar}
                      </dd>
                    </div>
                  </dl>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-secondary transition-transform duration-500 ease-expo group-hover:scale-x-100"
                  />
                </article>
                </TiltCard>
              </RevealItem>
            )
          )}
        </RevealGroup>
      </div>
    </section>
  );
}
