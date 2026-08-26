import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstitucionalIcon } from "@/components/institucional/InstitucionalIcon";
import type { Publico } from "@/lib/content/institucional";

type ParaQuemSectionProps = {
  eyebrow: string;
  titulo: string;
  descricao: string;
  publicos: Publico[];
};

export function ParaQuemSection({
  eyebrow,
  titulo,
  descricao,
  publicos,
}: ParaQuemSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={titulo} description={descricao} />
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {publicos.map(({ titulo: nome, descricao: texto, icon }) => (
            <RevealItem key={nome}>
              <article className="group h-full rounded-lg border border-border bg-surface-card p-6 shadow-sm transition-all duration-300 ease-expo hover:-translate-y-1.5 hover:border-brand-primary-light/40 hover:shadow-glow">
                <div className="inline-flex rounded-md bg-brand-primary/10 p-3 text-brand-primary transition-transform duration-300 ease-expo group-hover:scale-[1.08]">
                  <InstitucionalIcon name={icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-content-primary">
                  {nome}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {texto}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
