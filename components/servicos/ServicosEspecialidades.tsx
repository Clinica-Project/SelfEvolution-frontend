import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { servicosContent } from "@/lib/content/institucional";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

const ease = { duration: 0.65, ease: EASE_EXPO } as const;

function rotulo(titulo: string) {
  switch (titulo) {
    case "Avaliação neuropsicológica":
      return "Neuropsicologia";
    case "Reabilitação cognitiva":
      return "Reabilitação";
    case "Terapia ABA":
      return "ABA";
    default:
      return titulo;
  }
}

function listarNomes(nomes: string[]) {
  if (nomes.length === 0) return "";
  if (nomes.length === 1) return nomes[0];
  if (nomes.length === 2) return `${nomes[0]} e ${nomes[1]}`;
  return `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}`;
}

export function ServicosEspecialidades() {
  const { intro, servicos } = servicosContent;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const atual = servicos[active];
  const total = servicos.length;
  const conversa = listarNomes(
    atual.relacionados.map((index) => rotulo(servicos[index].titulo))
  );

  const go = useCallback(
    (delta: number) => {
      setActive((current) => (current + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (reduced || !inView) return;
    function onKey(event: KeyboardEvent) {
      if (
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowDown" &&
        event.key !== "ArrowUp"
      ) {
        return;
      }
      event.preventDefault();
      go(event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, inView, reduced]);

  if (reduced) {
    return (
      <section className="bg-surface-background px-page py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-sm italic text-content-muted">{intro.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-content-primary">
            {intro.titulo}
          </h2>
          <ul className="mt-16 space-y-16">
            {servicos.map((servico) => (
              <li key={servico.slug} className="max-w-2xl">
                <p className="font-display text-3xl font-bold tracking-[-0.03em] text-content-primary">
                  {servico.titulo}
                </p>
                <p className="mt-2 text-sm text-content-muted">{servico.formatos.join(" · ")}</p>
                <p className="mt-4 text-base leading-relaxed text-content-secondary">
                  {servico.descricao}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-content-secondary">
                  <span className="text-content-muted">Para quem. </span>
                  {servico.paraQuem}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  <span className="text-content-muted">O que esperar. </span>
                  {servico.oQueEsperar}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-surface-background text-content-primary"
    >
      <div className="relative min-h-[100svh] lg:flex">
        <div className="relative h-[22rem] sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
          <AnimatePresence mode="wait">
            <motion.img
              key={atual.image ?? atual.slug}
              src={atual.image}
              alt={atual.imageAlt ?? ""}
              initial={{ opacity: 0, scale: 1.06, x: 28 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.85, ease: EASE_EXPO }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-7xl flex-col justify-between px-page pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 lg:min-h-[100svh] lg:px-8 lg:py-16 lg:pt-28 lg:pb-12">
          <div className="lg:max-w-[34rem]">
            <p className="font-serif text-sm italic text-content-muted">{intro.eyebrow}</p>
            <h2 className="mt-2 max-w-[16ch] font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.03em]">
              {intro.titulo}
            </h2>

            <nav
              aria-label="Especialidades"
              className="mt-8 hidden flex-wrap gap-x-5 gap-y-2 lg:flex"
            >
              {servicos.map((servico, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={servico.slug}
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative py-1 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[15px] tracking-[-0.02em] transition-colors duration-500 ease-expo",
                        isActive
                          ? "font-bold text-brand-primary"
                          : "font-medium text-content-muted group-hover:text-content-primary"
                      )}
                    >
                      <span className="mr-1.5 font-serif text-[11px] tabular-nums text-brand-primary/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {rotulo(servico.titulo)}
                    </span>
                    {isActive ? (
                      <motion.span
                        layoutId="servico-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-brand-primary"
                        transition={ease}
                      />
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-10 min-w-0 lg:mt-8 lg:max-w-[34rem]">
            <p className="font-serif tabular-nums text-sm text-content-muted">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-1.5 text-border">/</span>
              {String(total).padStart(2, "0")}
            </p>

            <div className="mt-3 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={atual.slug}
                  initial={{ y: "70%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-40%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO }}
                  className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-content-primary"
                >
                  {atual.titulo}
                </motion.h3>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={atual.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                className="mt-6 max-w-md"
              >
                <p className="text-[15px] leading-relaxed text-content-secondary lg:text-base">
                  {atual.descricao}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-content-secondary">
                  <span className="font-serif italic text-content-muted">Para quem. </span>
                  {atual.paraQuem}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-content-secondary">
                  <span className="font-serif italic text-content-muted">O que esperar. </span>
                  {atual.oQueEsperar}
                </p>
                <p className="mt-5 font-serif text-sm text-content-muted">
                  {atual.formatos.join(" · ")}
                  {conversa ? (
                    <>
                      <span className="mx-2 text-border">/</span>
                      Conversa com {conversa}
                    </>
                  ) : null}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <nav
            aria-label="Especialidades"
            className="mt-8 flex items-center justify-between gap-1.5 lg:hidden"
          >
            {servicos.map((servico, index) => {
              const isActive = index === active;
              return (
                <button
                  key={servico.slug}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={servico.titulo}
                  className="flex min-h-11 min-w-0 flex-1 flex-col items-center gap-2"
                >
                  <span
                    className={cn(
                      "font-serif text-[11px] tabular-nums transition-colors duration-500",
                      isActive ? "text-brand-primary" : "text-content-muted"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "h-px w-full origin-left transition-all duration-500 ease-expo",
                      isActive ? "scale-x-100 bg-brand-primary" : "scale-x-40 bg-border"
                    )}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
