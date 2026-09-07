import { Brain, Building2, Puzzle } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Unidade, UnidadeSpaceId } from "@/lib/content/unidades";

const ICONS: Record<UnidadeSpaceId, typeof Building2> = {
  atendimento: Building2,
  psicologia: Brain,
  infancia: Puzzle,
};

export function UnidadeEspacos({ unit }: { unit: Unidade }) {
  return (
    <section className="relative bg-[#F8F4FC] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            Espaços de atendimento
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-content-primary">
            Salas pensadas para o encontro clínico
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-content-secondary lg:text-lg">
            Ambientes reservados para escuta, avaliação e acompanhamento — sem
            pressa, com privacidade.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {unit.spaces.map((space) => {
            const Icon = ICONS[space.id];
            return (
              <RevealItem
                key={space.id}
                className="rounded-3xl border border-brand-primary/10 bg-white px-6 py-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.03em] text-content-primary">
                  {space.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {space.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
