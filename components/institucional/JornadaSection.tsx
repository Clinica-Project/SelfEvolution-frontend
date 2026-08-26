import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Passo } from "@/lib/content/institucional";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type JornadaSectionProps = {
  eyebrow: string;
  titulo: string;
  descricao: string;
  passos: Passo[];
  muted?: boolean;
};

/** Jornada em passos numerados — reutilizada em Sobre e Diferenciais. */
export function JornadaSection({
  eyebrow,
  titulo,
  descricao,
  passos,
  muted = false,
}: JornadaSectionProps) {
  const reduced = useReducedMotion();
  return (
    <section
      className={cn(
        "py-20 lg:py-28",
        muted && "border-y border-border bg-surface-muted/60"
      )}
    >
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={titulo}
            description={descricao}
            align="center"
          />
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4"
        >
          {passos.map(({ titulo: nome, descricao: texto }, index) => (
            <RevealItem key={nome}>
              <article className="relative h-full pl-2">
                <div className="flex items-center gap-4">
                  <motion.span
                    {...(reduced
                      ? {}
                      : {
                          initial: { scale: 0.8, opacity: 0 },
                          whileInView: { scale: 1, opacity: 1 },
                          viewport: viewportOnce,
                          transition: {
                            duration: 0.5,
                            delay: index * 0.08,
                            ease: EASE_EXPO,
                          },
                        })}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary font-display text-base font-bold text-content-inverse shadow-sm"
                  >
                    {index + 1}
                  </motion.span>
                  {index < passos.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      className="hidden h-px flex-1 origin-left bg-gradient-to-r from-brand-primary/50 to-transparent xl:block"
                      {...(reduced
                        ? {}
                        : {
                            initial: { scaleX: 0 },
                            whileInView: { scaleX: 1 },
                            viewport: viewportOnce,
                            transition: {
                              duration: 0.8,
                              delay: 0.2 + index * 0.08,
                              ease: EASE_EXPO,
                            },
                          })}
                    />
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-content-primary">
                  {nome}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-content-secondary lg:text-base">
                  {texto}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
