import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { sobreContent } from "@/lib/content/institucional";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

const FOTOS = [
  { src: "/hero/sobre-valor-humanizacao.jpg", alt: "Conversa de cuidado em um espaço calmo" },
  { src: "/hero/sobre-valor-acolhimento.jpg", alt: "Gesto de acolhimento à mesa da clínica" },
  { src: "/hero/sobre-valor-escuta.jpg", alt: "Retrato em escuta, com luz natural" },
  { src: "/hero/sobre-valor-inclusao.jpg", alt: "Pessoas diversas na sala de espera da clínica" },
  { src: "/hero/sobre-valor-etica.jpg", alt: "Prateleira com livros de cuidado e ética em saúde" },
] as const;

const ease = { duration: 0.7, ease: EASE_EXPO } as const;

export function SobreValores() {
  const { valores } = sobreContent;
  const lista = valores.valores;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.45 });
  const [active, setActive] = useState(0);
  const atual = lista[active];
  const foto = FOTOS[active] ?? FOTOS[0];
  const total = lista.length;

  const go = useCallback(
    (delta: number) => {
      setActive((current) => (current + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (reduced || !inView) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") {
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
          <p className="font-serif text-sm italic text-white/50">{valores.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
            {valores.titulo}
          </h2>
          <ul className="mt-16 space-y-12">
            {lista.map((valor) => (
              <li key={valor.titulo} className="max-w-2xl">
                <p className="font-display text-3xl font-bold tracking-[-0.03em]">
                  {valor.titulo}
                </p>
                <p className="mt-3 text-base leading-relaxed text-white/70">
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
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#1C1916] text-white"
    >
      <h2 className="sr-only">{valores.titulo}</h2>

      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={foto.src}
            src={foto.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE_EXPO }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1C1916]/95 via-[#1C1916]/55 to-[#1C1916]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#1C1916] to-transparent"
        />
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 font-serif text-[11px] uppercase tracking-[0.42em] text-white/35 lg:block"
      >
        {valores.eyebrow}
      </p>

      <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-page pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 lg:px-8 lg:pb-8 lg:pl-20 lg:pt-16">
        <nav
          aria-label="Valores"
          className="hidden shrink-0 flex-col gap-0.5 lg:flex lg:w-[20rem]"
        >
          {lista.map((valor, index) => (
            <ValorItem
              key={valor.titulo}
              index={index}
              titulo={valor.titulo}
              isActive={index === active}
              onActivate={() => setActive(index)}
            />
          ))}
        </nav>

        <div className="flex min-h-0 flex-1 flex-col justify-end lg:mt-0">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={atual.titulo}
                initial={{ y: "48%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-32%", opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE_EXPO }}
                aria-hidden="true"
                className="pointer-events-none select-none font-display text-[clamp(3.6rem,14vw,12.5rem)] font-bold leading-[0.8] tracking-[-0.07em] text-white"
              >
                {atual.titulo}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
            <AnimatePresence mode="wait">
              <motion.p
                key={atual.descricao}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE_EXPO }}
                className="max-w-md text-[15px] leading-relaxed text-white/78 lg:text-lg"
              >
                {atual.descricao}
              </motion.p>
            </AnimatePresence>

            <p className="hidden font-serif tabular-nums text-sm text-white/45 lg:block">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-2 text-white/25">/</span>
              {String(total).padStart(2, "0")}
            </p>
          </div>
        </div>

        <nav
          aria-label="Valores"
          className="mt-8 flex items-center justify-between gap-3 lg:hidden"
        >
          {lista.map((valor, index) => {
            const isActive = index === active;
            return (
              <button
                key={valor.titulo}
                type="button"
                onClick={() => setActive(index)}
                aria-current={isActive ? "true" : undefined}
                aria-label={valor.titulo}
                className="flex min-h-11 min-w-0 flex-1 flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "font-serif text-xs tabular-nums transition-colors duration-500",
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

function ValorItem({
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
      className="group relative flex items-baseline gap-4 py-1.5 text-left"
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
            ? "text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-white"
            : "text-[clamp(1.35rem,2.2vw,1.75rem)] font-medium text-white/35 group-hover:text-white/70"
        )}
      >
        {titulo}
      </span>
      {isActive ? (
        <motion.span
          layoutId="valor-mark"
          className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white"
          transition={ease}
        />
      ) : null}
    </button>
  );
}
