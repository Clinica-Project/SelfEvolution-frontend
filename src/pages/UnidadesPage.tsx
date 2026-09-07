import { useEffect } from "react";
import { UnidadesLista } from "@/components/unidades/UnidadesLista";
import { unidadesIndex } from "@/lib/content/unidades";

export function UnidadesPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = unidadesIndex.meta.title;
    return () => {
      document.title = previous;
    };
  }, []);

  return <UnidadesLista />;
}
