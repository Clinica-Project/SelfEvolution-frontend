import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/lib/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  unidadeCities,
  unidadePath,
  unidadesByCity,
  unidadesIndex,
} from "@/lib/content/unidades";

export function UnidadesLista() {
  return (
    <section className="relative bg-surface-background pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            {unidadesIndex.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.04em] text-content-primary">
            {unidadesIndex.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-secondary lg:text-lg">
            {unidadesIndex.subtitle}
          </p>
        </Reveal>

        {unidadeCities.map((city) => {
          const items = unidadesByCity(city);
          return (
            <div key={city} className="mt-10 sm:mt-16 lg:mt-20">
              <Reveal>
                <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-content-primary lg:text-3xl">
                  {city}
                </h2>
                <p className="mt-1 text-sm text-content-secondary">
                  {items.length} {items.length === 1 ? "unidade" : "unidades"}
                </p>
              </Reveal>

              <RevealGroup
                stagger={0.06}
                className="mt-5 grid gap-4 sm:mt-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {items.map((unit) => (
                  <RevealItem key={unit.slug}>
                    <Link
                      href={unidadePath(unit.slug)}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-primary/10 bg-white transition-colors duration-300 ease-expo hover:border-brand-primary/25"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-brand-primary/5">
                        <img
                          loading="lazy"
                          src={unit.heroImage}
                          alt=""
                          width={900}
                          height={560}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-5 py-5">
                        <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-content-primary">
                          {unit.name}
                        </h3>
                        <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-content-secondary">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" />
                          {unit.address}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {unit.spaces.map((space) => (
                            <li
                              key={space.id}
                              className="rounded-full bg-brand-primary/8 px-2.5 py-1 text-[11px] font-semibold text-brand-primary"
                            >
                              {space.label}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-brand-primary">
                          Ver unidade
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </p>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </div>
    </section>
  );
}
