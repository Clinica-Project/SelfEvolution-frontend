import { useEffect } from "react";
import { ServicosHero } from "@/components/servicos/ServicosHero";
import { ServicosEspecialidades } from "@/components/servicos/ServicosEspecialidades";
import { ServicosCta } from "@/components/servicos/ServicosCta";
import { servicosContent } from "@/lib/content/institucional";

export function ServicosPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = servicosContent.meta.title;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <ServicosHero />
      <ServicosEspecialidades />
      <ServicosCta />
    </>
  );
}
