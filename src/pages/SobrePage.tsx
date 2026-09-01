import { useEffect } from "react";
import { SobreAbertura } from "@/components/sobre/SobreAbertura";
import { SobreHistoria } from "@/components/sobre/SobreHistoria";
import { SobreMissaoVisao } from "@/components/sobre/SobreMissaoVisao";
import { SobrePublicos } from "@/components/sobre/SobrePublicos";
import { SobrePassos } from "@/components/sobre/SobrePassos";
import { SobreValores } from "@/components/sobre/SobreValores";
import { SobreCta } from "@/components/sobre/SobreCta";
import { sobreContent } from "@/lib/content/institucional";

export function SobrePage() {
  useEffect(() => {
    const previous = document.title;
    document.title = sobreContent.meta.title;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <SobreAbertura />
      <SobreHistoria />
      <SobreMissaoVisao />
      <SobrePublicos />
      <SobrePassos />
      <SobreValores />
      <SobreCta />
    </>
  );
}
