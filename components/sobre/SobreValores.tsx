import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { sobreContent } from "@/lib/content/institucional";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";
import { useProgressIndex } from "@/components/sobre/scroll";

export function SobreValores() {
  const { valores } = sobreContent;
  const lista = valores.valores;
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const active = useProgressIndex(scrollYProgress, lista.length);
  const atual = lista[active];

  if (reduced) {
    return (
      <section className="bg-surface-background px-page py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-content-primary">
            {valores.titulo}
          </h2>
          <ul className="mt-16 space-y-12">
            {lista.map((valor) => (
              <li key={valor.titulo} className="max-w-2xl">
                <p className="font-display text-3xl font-bold tracking-[-0.03em] text-content-primary">
                  {valor.titulo}
                </p>
                <p className="mt-3 text-base leading-relaxed text-content-secondary">
                  {valor.descricao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[420svh] bg-surface-background">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-page lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="lg:col-span-6">
            <h2 className="sr-only">{valores.titulo}</h2>
            <ul className="space-y-1">
              {lista.map((valor, index) => {
                const isActive = index === active;
                return (
                  <li key={valor.titulo}>
                    <p
                      className={cn(
                        "origin-left font-display tracking-[-0.04em] transition-[font-size,color,opacity,transform] duration-500 ease-expo",
                        isActive
                          ? "text-[clamp(2.6rem,6vw,4.6rem)] font-bold text-content-primary"
                          : "text-[clamp(1.6rem,3vw,2.2rem)] font-medium text-content-primary/28"
                      )}
                      style={{
                        transform: isActive ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      {valor.titulo}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={atual.titulo}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE_EXPO }}
                className="max-w-md text-lg leading-relaxed text-content-secondary lg:text-xl"
              >
                {atual.descricao}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
