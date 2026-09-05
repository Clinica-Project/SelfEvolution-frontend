import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import {
  clinicLocations,
  type ClinicLocation,
} from "@/lib/content/home";

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    /* clipboard API unavailable */
  }

  try {
    const el = document.createElement("textarea");
    el.value = value;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

function LocationCard({ location }: { location: ClinicLocation }) {
  const [copied, setCopied] = useState(false);
  const copyValue = `${location.name} — ${location.address}`;

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copyLocation() {
    const ok = await copyText(copyValue);
    setCopied(ok);
  }

  return (
    <article>
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-primary/5 lg:aspect-[4/5] lg:min-h-[32rem]">
        <iframe
          title={`Mapa da unidade de ${location.name}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&hl=pt-BR&z=16&ie=UTF8&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-content-primary lg:text-2xl">
            {location.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-content-secondary">
            {location.address}
          </p>
        </div>
        <button
          type="button"
          onClick={copyLocation}
          title={copied ? "Localização copiada" : "Copiar localização"}
          aria-label={
            copied
              ? `Localização de ${location.name} copiada`
              : `Copiar localização de ${location.name}`
          }
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-primary/20 px-3 py-2 text-[13px] font-medium text-brand-primary transition-colors duration-300 ease-expo hover:border-brand-primary/40 hover:bg-brand-primary/5"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
    </article>
  );
}

export function LocationsSection() {
  return (
    <section
      id="unidades"
      className="relative bg-surface-background py-16 lg:py-28"
    >
      <div className="mx-auto max-w-[88rem] px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            onde estamos
          </p>
          <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary">
            Unidades presenciais
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 lg:mt-14">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-x-36 lg:gap-y-16">
            {clinicLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
