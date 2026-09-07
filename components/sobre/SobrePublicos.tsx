import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { sobreContent } from "@/lib/content/institucional";
import { useIsDesktop } from "@/components/sobre/scroll";

export function SobrePublicos() {
  const { paraQuem } = sobreContent;
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const count = paraQuem.publicos.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((count - 1) / count) * 100}%`]
  );

  if (reduced || !desktop) {
    return (
      <section className="bg-[#1C1916]">
        <h2 className="sr-only">{paraQuem.titulo}</h2>
        {paraQuem.publicos.map((publico) => (
          <Painel key={publico.titulo} publico={publico} stacked />
        ))}
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[500svh] bg-[#1C1916]">
      <h2 className="sr-only">{paraQuem.titulo}</h2>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#1C1916]">
        <motion.div
          style={{ x, width: `${count * 100}%` }}
          className="flex h-full will-change-transform"
        >
          {paraQuem.publicos.map((publico) => (
            <Painel
              key={publico.titulo}
              publico={publico}
              width={`${100 / count}%`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Painel({
  publico,
  width,
  stacked = false,
}: {
  publico: (typeof sobreContent.paraQuem.publicos)[number];
  width?: string;
  stacked?: boolean;
}) {
  return (
    <article
      className={
        stacked
          ? "relative h-[100svh] w-full overflow-hidden"
          : "relative h-full shrink-0 overflow-hidden"
      }
      style={width ? { width } : undefined}
    >
      {publico.image ? (
        <img
          src={publico.image}
          alt={publico.imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#1C1916] via-[#1C1916]/55 to-[#1C1916]/20"
      />
      <div className="relative z-[1] mx-auto flex h-full max-w-7xl flex-col justify-end px-page pb-16 lg:px-8 lg:pb-20">
        <p className="font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
          {publico.titulo}
        </p>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 drop-shadow-[0_1px_10px_rgba(28,25,22,0.45)] lg:text-lg">
          {publico.descricao}
        </p>
      </div>
    </article>
  );
}
