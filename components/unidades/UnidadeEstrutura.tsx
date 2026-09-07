import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";
import type { Unidade } from "@/lib/content/unidades";

export function UnidadeEstrutura({ unit }: { unit: Unidade }) {
  const [activeId, setActiveId] = useState(unit.structure[0]?.id);
  const active =
    unit.structure.find((item) => item.id === activeId) ?? unit.structure[0];

  if (!active) return null;

  return (
    <section className="relative bg-surface-background py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            Estrutura
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-content-primary">
            Conforto em cada espaço
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-content-secondary lg:text-lg">
            Recepção, salas de atendimento e detalhes pensados para você se
            sentir acolhido do primeiro minuto ao fim da sessão.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {unit.structure.map((item) => {
            const selected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "min-h-11 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-300 ease-expo",
                  selected
                    ? "bg-brand-primary text-white"
                    : "bg-brand-primary/8 text-brand-primary hover:bg-brand-primary/14"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-[16/11] overflow-hidden bg-brand-primary/5 lg:col-span-7">
            <img
              key={active.image}
              src={active.image}
              alt={active.imageAlt}
              width={1600}
              height={1100}
              className={cn(
                "absolute inset-0 h-full w-full",
                active.imageFit === "contain" ? "object-contain" : "object-cover"
              )}
              style={
                active.imagePosition
                  ? { objectPosition: active.imagePosition }
                  : undefined
              }
            />
          </div>
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-content-primary lg:text-3xl">
              {active.label}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-content-secondary">
              {active.description}
            </p>
            <ul className="mt-6 space-y-3">
              {active.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-content-primary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
