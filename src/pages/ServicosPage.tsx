import { PageHero } from "@/components/institucional/PageHero";
import { ServicosDetalhadosSection } from "@/components/institucional/ServicosDetalhadosSection";
import { PageCta } from "@/components/institucional/PageCta";
import { servicosContent } from "@/lib/content/institucional";

export function ServicosPage() {
  const { hero, intro, servicos, cta } = servicosContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titulo={hero.titulo}
        subtitulo={hero.subtitulo}
      />
      <ServicosDetalhadosSection intro={intro} servicos={servicos} />
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
