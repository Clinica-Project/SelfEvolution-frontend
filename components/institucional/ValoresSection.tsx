import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstitucionalIcon } from "@/components/institucional/InstitucionalIcon";
import type { Valor } from "@/lib/content/institucional";

type ValoresSectionProps = {
  eyebrow: string;
  titulo: string;
  valores: Valor[];
};

export function ValoresSection({ eyebrow, titulo, valores }: ValoresSectionProps) {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={titulo} align="center" />
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {valores.map(({ titulo: nome, descricao, icon, accent }) => (
            <RevealItem key={nome}>
              <article className="group h-full rounded-lg border border-border bg-surface-card p-6 text-center shadow-sm transition-all duration-300 ease-expo hover:-translate-y-1.5 hover:shadow-md">
                <div
                  className={`mx-auto inline-flex rounded-md p-3.5 transition-transform duration-300 ease-expo group-hover:scale-[1.08] ${accent}`}
                >
                  <InstitucionalIcon name={icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-content-primary">
                  {nome}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {descricao}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
