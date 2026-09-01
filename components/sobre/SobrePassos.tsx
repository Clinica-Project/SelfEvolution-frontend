import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { sobreContent } from "@/lib/content/institucional";
import { cn } from "@/lib/utils/cn";
import { useIsDesktop } from "@/components/sobre/scroll";

const slideEase = { duration: 0.95, ease: EASE_EXPO } as const;

export function SobrePassos() {
  const { jornada } = sobreContent;
  const passos = jornada.passos;
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const passo = passos[active];
  const numero = String(active + 1).padStart(2, "0");

  const go = useCallback(
    (delta: number) => {
      setActive((current) => (current + delta + passos.length) % passos.length);
    },
    [passos.length]
  );

  useEffect(() => {
    if (reduced || !inView) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      go(event.key === "ArrowRight" ? 1 : -1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, inView, reduced]);

  if (reduced) {
    return (
      <section className="bg-surface-background px-page py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-content-primary">
            {jornada.titulo}
          </h2>
          <ol className="mt-16 space-y-16">
            {passos.map((item, index) => (
              <li key={item.titulo} className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6">
                  <p className="font-serif text-[clamp(3.5rem,8vw,6rem)] leading-none text-brand-primary/80">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-content-primary">
                    {item.titulo}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-content-secondary">
                    {item.descricao}
                  </p>
                </div>
                {item.image ? (
                  <div className="relative aspect-[4/5] overflow-hidden lg:col-span-6 lg:aspect-[5/4]">
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? ""}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-surface-background"
      aria-roledescription="carrossel"
      aria-label={jornada.titulo}
    >
      <div className="relative flex min-h-[100svh] flex-col lg:grid lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
        <div
          className="relative order-1 h-[48svh] touch-pan-x lg:order-2 lg:h-auto lg:min-h-[100svh]"
          onPanEnd={(_, info) => {
            if (Math.abs(info.offset.x) < 56) return;
            go(info.offset.x < 0 ? 1 : -1);
          }}
        >
          <div className="flex h-full cursor-grab gap-[3px] overflow-hidden bg-surface-background active:cursor-grabbing">
            {passos.map((item, index) => {
              const isActive = index === active;
              return (
                <motion.button
                  key={item.titulo}
                  type="button"
                  aria-label={`${String(index + 1).padStart(2, "0")} · ${item.titulo}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(index)}
                  initial={false}
                  animate={{
                    flexGrow: isActive ? (desktop ? 6.4 : 3.4) : desktop ? 0.78 : 1,
                  }}
                  transition={slideEase}
                  className="relative min-w-0 overflow-hidden focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
                  style={{ flexBasis: 0 }}
                >
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={isActive ? item.imageAlt ?? "" : ""}
                      aria-hidden={!isActive}
                      draggable={false}
                      animate={{ scale: isActive ? 1 : 1.14 }}
                      transition={{ duration: 1.15, ease: EASE_EXPO }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}

                  <motion.div
                    aria-hidden="true"
                    animate={{ opacity: isActive ? 0.12 : 0.52 }}
                    transition={slideEase}
                    className="absolute inset-0 bg-[#1C1916]"
                  />

                  <AnimatePresence>
                    {!isActive ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 lg:items-center lg:pb-0"
                      >
                        <span
                          className="font-serif text-[1.05rem] tracking-[0.12em] text-white/90 lg:text-2xl"
                          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative order-2 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-page py-10 lg:order-1 lg:min-h-[100svh] lg:px-8 lg:py-28">
          <div className="max-w-md lg:max-w-[28rem]">
            <h2 className="sr-only">{jornada.titulo}</h2>

            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={numero}
                  initial={{ y: "70%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-80%" }}
                  transition={{ duration: 0.55, ease: EASE_EXPO }}
                  className="font-serif text-[clamp(4.4rem,14vw,9.5rem)] leading-[0.82] text-brand-primary/85"
                >
                  {numero}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={passo.titulo}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-110%" }}
                  transition={{ duration: 0.55, ease: EASE_EXPO }}
                  className="font-display text-[clamp(1.85rem,3.6vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.03em] text-content-primary"
                >
                  {passo.titulo}
                </motion.h3>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={passo.descricao}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                className="mt-5 max-w-sm text-[15px] leading-relaxed text-content-secondary lg:text-base"
              >
                {passo.descricao}
              </motion.p>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-1" role="tablist" aria-label="Passos">
              {passos.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.titulo}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ir para ${item.titulo}`}
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative px-2 py-1 font-serif text-lg tracking-wide transition-colors duration-500 ease-expo",
                      isActive
                        ? "text-brand-primary"
                        : "text-content-primary/30 hover:text-content-primary/70"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                    {isActive ? (
                      <motion.span
                        layoutId="passo-nav-line"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-brand-primary"
                        transition={slideEase}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 hidden text-[12px] text-content-muted lg:block">
              Arraste as fotos ou use as setas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
