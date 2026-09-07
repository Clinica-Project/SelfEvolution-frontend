import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  getNearbyUnidades,
  unidadePath,
  type Unidade,
} from "@/lib/content/unidades";

export function UnidadeProximas({ unit }: { unit: Unidade }) {
  const nearby = getNearbyUnidades(unit);
  if (nearby.length === 0) return null;

  return (
    <section className="relative bg-surface-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            Outras unidades
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-content-primary">
            Unidades próximas a {unit.name}
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {nearby.map((item) => (
            <RevealItem key={item.slug}>
              <Link
                href={unidadePath(item.slug)}
                className="group block overflow-hidden rounded-3xl border border-brand-primary/10 bg-white transition-colors duration-300 ease-expo hover:border-brand-primary/25"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-brand-primary/5">
                  <img
                    src={item.heroImage}
                    alt=""
                    width={800}
                    height={550}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-5 py-5">
                  <p className="font-display text-lg font-bold tracking-[-0.03em] text-content-primary">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                    {item.address}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-primary">
                    Ver unidade
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
