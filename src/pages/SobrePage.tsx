import { PageHero } from "@/components/institucional/PageHero";
import { HistoriaSection } from "@/components/institucional/HistoriaSection";
import { MissaoVisaoSection } from "@/components/institucional/MissaoVisaoSection";
import { ParaQuemSection } from "@/components/institucional/ParaQuemSection";
import { JornadaSection } from "@/components/institucional/JornadaSection";
import { ValoresSection } from "@/components/institucional/ValoresSection";
import { PageCta } from "@/components/institucional/PageCta";
import { sobreContent } from "@/lib/content/institucional";

export function SobrePage() {
  const { hero, historia, missaoVisao, paraQuem, jornada, valores, cta } =
    sobreContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titulo={hero.titulo}
        subtitulo={hero.subtitulo}
      />
      <HistoriaSection
        eyebrow={historia.eyebrow}
        titulo={historia.titulo}
        paragrafos={historia.paragrafos}
      />
      <MissaoVisaoSection blocos={missaoVisao} />
      <ParaQuemSection
        eyebrow={paraQuem.eyebrow}
        titulo={paraQuem.titulo}
        descricao={paraQuem.descricao}
        publicos={paraQuem.publicos}
      />
      <JornadaSection
        eyebrow={jornada.eyebrow}
        titulo={jornada.titulo}
        descricao={jornada.descricao}
        passos={jornada.passos}
        muted
      />
      <ValoresSection
        eyebrow={valores.eyebrow}
        titulo={valores.titulo}
        valores={valores.valores}
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
