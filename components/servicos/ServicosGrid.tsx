import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Counter } from "@/components/home/Counter";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ServicoIconAnimado } from "@/components/servicos/ServicoIconAnimado";
import type { ServicoDetalhado } from "@/lib/content/institucional";
import { servicosContent } from "@/lib/content/institucional";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

const PHOTO_H = [
  "h-48 lg:h-56",
  "h-44 lg:h-52",
  "h-44 lg:h-52",
  "h-48 lg:h-56",
  "h-40",
  "h-40",
  "h-40",
];

export function ServicosGrid() {
  const { servicos } = servicosContent;

  return (
    <section className="relative bg-surface-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-primary">
            as especialidades
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[clamp(2rem,4vw,3.4rem)] font-extrabold tracking-[-0.035em] text-content-primary">
            Sete portas, um mesmo cuidado
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.09}
          className="mt-14 grid gap-5 [perspective:1200px] lg:grid-cols-12 lg:gap-6"
        >
          {servicos.map((servico, index) => (
            <RevealItem
              key={servico.slug}
              className={cn("min-w-0", SPANS[index])}
            >
              <ServicoCard servico={servico} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ServicoCard({
  servico,
  index,
}: {
  servico: ServicoDetalhado;
  index: number;
}) {
  const [open, setOpen] = useState<"paraQuem" | "oQueEsperar" | null>(null);
  const numero = index + 1;

  return (
    <TiltCard className="h-full" max={4}>
      <article
        id={`servico-${servico.slug}`}
        className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-xl border border-border bg-surface-card shadow-sm transition-[box-shadow,border-color] duration-500 ease-expo hover:border-brand-primary-light/35 hover:shadow-card-hover"
      >
        <div className={cn("relative overflow-hidden", PHOTO_H[index])}>
          {servico.image ? (
            <img
              src={servico.image}
              alt={servico.imageAlt ?? ""}
              className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
            />
          ) : null}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1C1916]/55 to-transparent"
          />
          <p
            aria-hidden="true"
            className="absolute bottom-1 right-3 font-display text-[clamp(4.5rem,11vw,7.5rem)] font-extrabold leading-none tracking-[-0.07em] text-white/30"
          >
            <Counter value={numero} prefix="0" duration={1.1} />
          </p>
        </div>

        <div className="relative flex flex-1 flex-col p-6 lg:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-brand-primary/15 via-brand-secondary/10 to-[#c4b5e0]/30 text-brand-primary">
              <span className="h-5 w-5">
                <ServicoIconAnimado name={servico.icon} />
              </span>
            </span>
            <div className="flex gap-2">
              {servico.formatos.map((formato) => (
                <Badge key={formato} variant="secondary">
                  {formato}
                </Badge>
              ))}
            </div>
          </div>

          <h3 className="mt-5 font-display text-[1.65rem] font-extrabold tracking-[-0.03em] text-content-primary lg:text-2xl">
            {servico.titulo}
          </h3>
          <p className="mt-3 flex-1 text-[15px] font-light leading-relaxed text-content-secondary">
            {servico.descricao}
          </p>

          <div className="mt-6 space-y-1 border-t border-border pt-3">
            <AccordionRow
              label="Para quem"
              open={open === "paraQuem"}
              onToggle={() =>
                setOpen((current) => (current === "paraQuem" ? null : "paraQuem"))
              }
            >
              {servico.paraQuem}
            </AccordionRow>
            <AccordionRow
              label="O que esperar"
              open={open === "oQueEsperar"}
              onToggle={() =>
                setOpen((current) =>
                  current === "oQueEsperar" ? null : "oQueEsperar"
                )
              }
            >
              {servico.oQueEsperar}
            </AccordionRow>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

function AccordionRow({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary">
          {label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-brand-primary/70 transition-transform duration-500 ease-expo",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <p className="pb-3 text-sm font-light leading-relaxed text-content-secondary">
              {children}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
