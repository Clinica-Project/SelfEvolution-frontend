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

const ease = { duration: 0.7, ease: EASE_EXPO } as const;

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
  const inView = useInView(sectionRef, { amount: 0.45 });
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
      <section className="bg-[#1C1916] px-page py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-sm italic text-white/50">{intro.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
            {intro.titulo}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            {intro.descricao}
          </p>
          <ul className="mt-16 space-y-16">
            {servicos.map((servico) => (
              <li key={servico.slug} className="max-w-2xl">
                <p className="font-display text-3xl font-bold tracking-[-0.03em]">
                  {servico.titulo}
                </p>
                <p className="mt-2 text-sm text-white/45">
                  {servico.formatos.join(" · ")}
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {servico.descricao}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  <span className="text-white/40">Para quem. </span>
                  {servico.paraQuem}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  <span className="text-white/40">O que esperar. </span>
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#1C1916] text-white"
    >
      <h2 className="sr-only">{intro.titulo}</h2>

      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={atual.image ?? atual.slug}
            src={atual.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_EXPO }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1C1916]/95 via-[#1C1916]/58 to-[#1C1916]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#1C1916] to-transparent"
        />
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 font-serif text-[11px] uppercase tracking-[0.42em] text-white/35 lg:block"
      >
        {intro.eyebrow}
      </p>

      <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-page pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 lg:px-8 lg:pb-8 lg:pl-20 lg:pt-16">
        <nav
          aria-label="Especialidades"
          className="hidden shrink-0 flex-col lg:flex lg:w-[22rem]"
        >
          {servicos.map((servico, index) => (
            <EspecialidadeItem
              key={servico.slug}
              index={index}
              titulo={rotulo(servico.titulo)}
              isActive={index === active}
              onActivate={() => setActive(index)}
            />
          ))}
        </nav>

        <div className="flex min-h-0 flex-1 flex-col justify-end">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={atual.slug}
                initial={{ y: "48%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-32%", opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE_EXPO }}
                aria-hidden="true"
                className={cn(
                  "pointer-events-none select-none font-display font-bold leading-[0.84] tracking-[-0.06em] text-white",
                  atual.titulo.length > 16
                    ? "text-[clamp(2.4rem,8vw,7.2rem)]"
                    : "text-[clamp(3.2rem,12vw,10.5rem)]"
                )}
              >
                {rotulo(atual.titulo)}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={atual.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
              className="mt-6 max-w-xl lg:mt-8"
            >
              <p className="text-[15px] leading-relaxed text-white/78 lg:text-lg">
                {atual.descricao}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/62">
                <span className="font-serif italic text-white/40">Para quem. </span>
                {atual.paraQuem}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-white/62">
                <span className="font-serif italic text-white/40">O que esperar. </span>
                {atual.oQueEsperar}
              </p>
              <p className="mt-5 font-serif text-sm text-white/40">
                {atual.formatos.join(" · ")}
                {conversa ? (
                  <>
                    <span className="mx-2 text-white/20">/</span>
                    Conversa com {conversa}
                  </>
                ) : null}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 hidden font-serif tabular-nums text-sm text-white/45 lg:block">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-2 text-white/25">/</span>
            {String(total).padStart(2, "0")}
          </p>
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
                    isActive ? "text-white" : "text-white/35"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "h-px w-full origin-left transition-all duration-500 ease-expo",
                    isActive ? "scale-x-100 bg-white" : "scale-x-40 bg-white/25"
                  )}
                />
              </button>
            );
          })}
        </nav>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[2px] origin-left bg-white"
        initial={false}
        animate={{ scaleX: (active + 1) / total }}
        transition={ease}
      />
    </section>
  );
}

function EspecialidadeItem({
  index,
  titulo,
  isActive,
  onActivate,
}: {
  index: number;
  titulo: string;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      onMouseEnter={onActivate}
      aria-current={isActive ? "true" : undefined}
      className="group relative flex items-baseline gap-3 py-1 text-left"
    >
      <span
        className={cn(
          "font-serif text-sm tabular-nums transition-colors duration-500 ease-expo",
          isActive ? "text-white" : "text-white/30"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "font-display tracking-[-0.04em] transition-[font-size,color,opacity] duration-500 ease-expo",
          isActive
            ? "text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold text-white"
            : "text-[clamp(1.05rem,1.7vw,1.35rem)] font-medium text-white/35 group-hover:text-white/70"
        )}
      >
        {titulo}
      </span>
      {isActive ? (
        <motion.span
          layoutId="servico-mark"
          className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white"
          transition={ease}
        />
      ) : null}
    </button>
  );
}
