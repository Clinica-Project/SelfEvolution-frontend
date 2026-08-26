import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HomeIcon } from "@/components/home/HomeIcon";
import { differentials } from "@/lib/content/home";
import { cn } from "@/lib/utils/cn";

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-surface-card py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
              por que selfevolution
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary">
              Um jeito diferente{" "}
              <span className="font-light italic text-brand-primary">de cuidar</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-content-secondary">
              Estrutura clínica com olhar humano — do primeiro contato ao
              acompanhamento contínuo.
            </p>
          </div>
        </Reveal>

        <RevealGroup stagger={0.14} className="mt-20 space-y-0">
          {differentials.map(({ title, description, icon }, index) => {
            const n = String(index + 1).padStart(2, "0");
            const reverse = index === 1;
            return (
              <RevealItem key={title}>
                <article
                  className={cn(
                    "group relative grid items-center gap-8 border-t border-brand-primary/10 py-14 lg:grid-cols-12 lg:gap-10",
                    index === differentials.length - 1 && "border-b"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute font-display text-[clamp(6rem,14vw,11rem)] font-bold leading-none tracking-[-0.06em] text-brand-primary/[0.05] transition-colors duration-500 group-hover:text-brand-primary/[0.09]",
                      reverse ? "right-0 top-1/2 -translate-y-1/2" : "left-0 top-1/2 -translate-y-1/2"
                    )}
                  >
                    {n}
                  </span>

                  <div
                    className={cn(
                      "relative lg:col-span-2",
                      reverse && "lg:col-start-11 lg:row-start-1 lg:justify-self-end"
                    )}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition-transform duration-500 ease-expo group-hover:scale-110">
                      <HomeIcon
                        name={icon}
                        className="h-7 w-7 transition-transform duration-500 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div
                    className={cn(
                      "relative lg:col-span-7",
                      reverse
                        ? "lg:col-start-3 lg:row-start-1 lg:text-right"
                        : "lg:col-start-4"
                    )}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-content-muted">
                      pilar {n}
                    </p>
                    <h3
                      className={cn(
                        "mt-3 font-display font-bold tracking-[-0.02em] text-content-primary",
                        index === 0
                          ? "text-[clamp(1.75rem,3vw,2.75rem)]"
                          : "text-[clamp(1.5rem,2.5vw,2.25rem)]"
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        "mt-4 text-base leading-relaxed text-content-secondary",
                        reverse ? "ml-auto max-w-md" : "max-w-md"
                      )}
                    >
                      {description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
