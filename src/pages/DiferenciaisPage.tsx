import { PageHero } from "@/components/institucional/PageHero";
import { DiferenciaisDetalhadosSection } from "@/components/institucional/DiferenciaisDetalhadosSection";
import { JornadaSection } from "@/components/institucional/JornadaSection";
import { PageCta } from "@/components/institucional/PageCta";
import { diferenciaisContent } from "@/lib/content/institucional";

export function DiferenciaisPage() {
  const { hero, diferenciais, jornada, cta } = diferenciaisContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titulo={hero.titulo}
        subtitulo={hero.subtitulo}
      />
      <DiferenciaisDetalhadosSection diferenciais={diferenciais} />
      <JornadaSection
        eyebrow={jornada.eyebrow}
        titulo={jornada.titulo}
        descricao={jornada.descricao}
        passos={jornada.passos}
      />
      <PageCta
        title={cta.titulo}
        description={cta.descricao}
        label={cta.label}
        href={cta.href}
        secondaryLabel={cta.secondaryLabel}
        secondaryHref={cta.secondaryHref}
      />
    </>
  );
}
