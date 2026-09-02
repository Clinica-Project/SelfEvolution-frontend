import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { getLenisInstance } from "@/lib/lenis-instance";
import { servicosContent } from "@/lib/content/institucional";
import type { ServicoDetalhado } from "@/lib/content/institucional";
import { cn } from "@/lib/utils/cn";

const STICKY_STACK = 148;

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

function servicoId(slug: string) {
  return `servico-${slug}`;
}

function scrollToServico(slug: string) {
  const el = document.getElementById(servicoId(slug));
  if (!el) return;
  const lenis = getLenisInstance();
  const current = lenis?.scroll ?? window.scrollY;
  const target = Math.max(0, el.getBoundingClientRect().top + current - STICKY_STACK);
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.05 });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
  window.history.replaceState(null, "", `#${servicoId(slug)}`);
}

export function ServicosEspecialidades() {
  const { intro, servicos } = servicosContent;
  const ids = useMemo(() => servicos.map((item) => servicoId(item.slug)), [servicos]);
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && ids.includes(hash)) {
      window.requestAnimationFrame(() => {
        const slug = hash.replace(/^servico-/, "");
        scrollToServico(slug);
        setActiveId(hash);
      });
    }
  }, [ids]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const next = visible[0]?.target.id;
        if (next) setActiveId(next);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <div className="bg-surface-background">
      <section className="mx-auto max-w-7xl px-page pb-10 pt-16 lg:px-8 lg:pb-12 lg:pt-20">
        <p className="font-serif text-sm italic text-content-muted">{intro.eyebrow}</p>
        <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,4.2vw,3.4rem)] font-bold tracking-[-0.035em] text-content-primary">
          {intro.titulo}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-content-secondary lg:text-lg">
          {intro.descricao}
        </p>
      </section>

      <nav
        aria-label="Ir para uma especialidade"
        className="sticky top-[4.75rem] z-40 border-y border-border/80 bg-surface-background/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-page py-2.5 max-lg:mask-fade-x lg:flex-wrap lg:overflow-visible lg:px-8">
          {servicos.map((servico, index) => {
            const id = servicoId(servico.slug);
            const isActive = activeId === id;
            return (
              <button
                key={servico.slug}
                type="button"
                onClick={() => scrollToServico(servico.slug)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-[13px] tracking-[-0.02em] transition-colors duration-300 ease-expo",
                  isActive
                    ? "bg-brand-primary font-semibold text-white"
                    : "font-medium text-content-muted hover:bg-brand-primary/10 hover:text-brand-primary"
                )}
              >
                <span className="mr-1.5 font-serif text-[11px] tabular-nums opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {rotulo(servico.titulo)}
              </button>
            );
          })}
        </div>
      </nav>

      {servicos.map((servico, index) => (
        <ServicoBloco
          key={servico.slug}
          servico={servico}
          index={index}
          todos={servicos}
        />
      ))}
    </div>
  );
}

function ServicoBloco({
  servico,
  index,
  todos,
}: {
  servico: ServicoDetalhado;
  index: number;
  todos: ServicoDetalhado[];
}) {
  const reduced = useReducedMotion();
  const photoLeft = index % 2 === 1;
  const conversa = listarNomes(
    servico.relacionados.map((i) => rotulo(todos[i].titulo))
  );
  const goRelated = useCallback((slug: string) => {
    scrollToServico(slug);
  }, []);

  return (
    <article
      id={servicoId(servico.slug)}
      className="scroll-mt-[11rem] border-b border-border/70"
    >
      <div
        className={cn(
          "mx-auto grid min-h-[min(32rem,88svh)] max-w-7xl lg:grid-cols-2 lg:items-stretch",
          photoLeft && "lg:[&>div:first-child]:order-2"
        )}
      >
        <Reveal className="flex flex-col justify-center px-page py-14 lg:px-8 lg:py-20">
          <p className="font-serif tabular-nums text-sm text-content-muted">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1.5 text-border">/</span>
            {String(todos.length).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-content-primary">
            {servico.titulo}
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-content-secondary lg:text-base">
            {servico.descricao}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-content-secondary">
            <span className="font-serif italic text-content-muted">Para quem. </span>
            {servico.paraQuem}
          </p>
          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-content-secondary">
            <span className="font-serif italic text-content-muted">O que esperar. </span>
            {servico.oQueEsperar}
          </p>
          <p className="mt-6 font-serif text-sm text-content-muted">
            {servico.formatos.join(" · ")}
          </p>
          {conversa ? (
            <p className="mt-3 text-sm text-content-muted">
              Conversa com{" "}
              {servico.relacionados.map((relIndex, i, arr) => {
                const related = todos[relIndex];
                const label = rotulo(related.titulo);
                return (
                  <span key={related.slug}>
                    <button
                      type="button"
                      onClick={() => goRelated(related.slug)}
                      className="text-brand-primary underline-offset-2 transition-colors hover:underline"
                    >
                      {label}
                    </button>
                    {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " e " : ""}
                  </span>
                );
              })}
              .
            </p>
          ) : null}
        </Reveal>

        <div className={cn("relative min-h-[18rem] lg:min-h-full", reduced && "lg:min-h-[28rem]")}>
          {servico.image ? (
            <img
              src={servico.image}
              alt={servico.imageAlt ?? ""}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
