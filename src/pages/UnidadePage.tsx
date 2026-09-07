import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UnidadeHero } from "@/components/unidades/UnidadeHero";
import { UnidadeLocalizacao } from "@/components/unidades/UnidadeLocalizacao";
import { UnidadeEspacos } from "@/components/unidades/UnidadeEspacos";
import { UnidadeEstrutura } from "@/components/unidades/UnidadeEstrutura";
import { UnidadeCta } from "@/components/unidades/UnidadeCta";
import { UnidadeProximas } from "@/components/unidades/UnidadeProximas";
import { NotFoundPage } from "@/src/pages/NotFoundPage";
import {
  getUnidade,
  unidadePageTitle,
} from "@/lib/content/unidades";

export function UnidadePage() {
  const { slug } = useParams();
  const unit = getUnidade(slug);

  useEffect(() => {
    if (!unit) return;
    const previous = document.title;
    document.title = unidadePageTitle(unit);
    return () => {
      document.title = previous;
    };
  }, [unit]);

  if (!unit) return <NotFoundPage />;

  return (
    <>
      <UnidadeHero key={`${unit.slug}-hero`} unit={unit} />
      <UnidadeLocalizacao key={`${unit.slug}-loc`} unit={unit} />
      <UnidadeEspacos key={`${unit.slug}-esp`} unit={unit} />
      <UnidadeEstrutura key={unit.slug} unit={unit} />
      <UnidadeCta key={`${unit.slug}-cta`} unit={unit} />
      <UnidadeProximas key={`${unit.slug}-near`} unit={unit} />
    </>
  );
}
