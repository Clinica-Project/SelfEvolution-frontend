import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

type MissaoVisaoSectionProps = {
  blocos: { titulo: string; descricao: string }[];
};

export function MissaoVisaoSection({ blocos }: MissaoVisaoSectionProps) {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <RevealGroup stagger={0.1} className="grid gap-6 md:grid-cols-2">
          {blocos.map(({ titulo, descricao }) => (
            <RevealItem key={titulo}>
              <article className="relative h-full overflow-hidden rounded-lg border border-border bg-surface-card p-8 shadow-sm lg:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-secondary"
                />
                <h2 className="font-display text-2xl font-semibold text-content-primary">
                  {titulo}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-content-secondary lg:text-lg">
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
