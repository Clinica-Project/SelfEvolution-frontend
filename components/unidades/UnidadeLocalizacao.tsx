import { MapPin } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Unidade } from "@/lib/content/unidades";

export function UnidadeLocalizacao({ unit }: { unit: Unidade }) {
  return (
    <section className="relative bg-surface-background py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                Localização
              </p>
              <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-content-primary">
                Fácil de chegar, feito para o cuidado
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-content-secondary lg:text-lg">
                {unit.intro}
              </p>
              <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-content-primary">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                {unit.address}
              </p>
            </Reveal>

            <RevealGroup
              stagger={0.08}
              delayChildren={0.08}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {unit.landmarks.map((landmark) => (
                <RevealItem
                  key={landmark.title}
                  className="rounded-2xl border border-brand-primary/10 bg-white/70 px-4 py-4"
                >
                  <p className="font-display text-base font-bold tracking-[-0.02em] text-content-primary">
                    {landmark.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                    {landmark.detail}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden bg-brand-primary/5 lg:min-h-[28rem]">
              <iframe
                title={`Mapa da unidade ${unit.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(unit.mapQuery)}&hl=pt-BR&z=16&ie=UTF8&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
