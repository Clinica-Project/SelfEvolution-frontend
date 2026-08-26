import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HomeIcon } from "@/components/home/HomeIcon";
import { ServicesMarquee } from "@/components/home/ServicesMarquee";
import { services } from "@/lib/content/home";
import { cn } from "@/lib/utils/cn";

/** Layout bento: featured grande + cards com escalas variadas. */
const SPAN: Record<number, string> = {
  0: "sm:col-span-2 lg:col-span-4 lg:row-span-2", // featured
  1: "lg:col-span-4",
  2: "lg:col-span-4",
  3: "lg:col-span-4",
  4: "lg:col-span-4",
  5: "lg:col-span-4",
  6: "lg:col-span-4",
  7: "lg:col-span-4", // CTA
};

export function ServicesSection() {
  return (
    <section id="servicos" className="relative bg-[#F7F2FB] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
              nossas especialidades
            </p>
            <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary">
              Cuidado integrado{" "}
              <span className="font-light text-brand-primary">em cada área</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-content-secondary">
              Equipe multidisciplinar para acompanhar mente, comportamento,
              aprendizagem e desenvolvimento — em um só lugar.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.08} className="mt-12">
        <ServicesMarquee />
      </Reveal>

      <div className="mx-auto mt-14 max-w-7xl px-page lg:px-8">
        <RevealGroup
          stagger={0.07}
          className="grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          {services.map(({ title, description, icon }, index) => {
            const n = String(index + 1).padStart(2, "0");
            const featured = index === 0;

            return (
              <RevealItem key={title} className={cn(SPAN[index] ?? "lg:col-span-4")}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden transition-all duration-500 ease-expo hover:-translate-y-1.5",
                    featured
                      ? "min-h-[22rem] justify-between rounded-[1.75rem] bg-brand-primary p-8 text-content-inverse shadow-[0_24px_60px_-28px_rgba(107,78,145,0.55)] lg:p-10"
                      : "rounded-[1.5rem] border border-brand-primary/8 bg-surface-card p-7 hover:border-brand-primary/20 hover:shadow-card-hover"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute font-display font-bold leading-none",
                      featured
                        ? "-right-6 -top-8 text-[9rem] text-white/[0.08]"
                        : "-right-2 top-2 text-6xl text-brand-primary/[0.06] transition-colors duration-500 group-hover:text-brand-primary/[0.12]"
                    )}
                  >
                    {n}
                  </span>

                  <span
                    className={cn(
                      "relative flex items-center justify-center transition-transform duration-500 ease-expo group-hover:scale-105",
                      featured
                        ? "h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-sm"
                        : "h-11 w-11 rounded-xl bg-brand-primary/10 text-brand-primary group-hover:scale-110"
                    )}
                  >
                    <HomeIcon name={icon} className={featured ? "h-6 w-6" : "h-5 w-5"} />
                  </span>

                  <div className={cn("relative", featured ? "mt-auto pt-16" : "mt-8")}>
                    <h3
                      className={cn(
                        "font-display font-semibold tracking-[-0.01em]",
                        featured
                          ? "text-3xl font-bold lg:text-4xl"
                          : "text-xl text-content-primary"
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 leading-relaxed",
                        featured
                          ? "max-w-sm text-base text-white/80"
                          : "text-sm text-content-secondary"
                      )}
                    >
                      {description}
                    </p>
                    {!featured && (
                      <span
                        aria-hidden="true"
                        className="mt-6 block h-px w-10 origin-left bg-brand-primary/30 transition-transform duration-500 ease-expo group-hover:scale-x-[2.2]"
                      />
                    )}
                  </div>
                </article>
              </RevealItem>
            );
          })}

          <RevealItem className={SPAN[7]}>
            <a
              href="#contato"
              className="group flex h-full min-h-[13rem] flex-col justify-between rounded-[1.5rem] border border-dashed border-brand-primary/30 bg-transparent p-7 transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-primary hover:bg-brand-primary/[0.04]"
            >
              <p className="font-display text-xl font-semibold text-content-primary">
                Não sabe por onde começar?
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                Fale com a clínica
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
