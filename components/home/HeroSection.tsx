import { Link } from "@/lib/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { LineReveal } from "@/components/motion/LineReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

export function HeroSection() {
  const reduced = useReducedMotion();

  const enter = (delay: number, y = 28) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE_EXPO },
        };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#F7F2FB]">
      {/* Atmosphere — identidade visual própria */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]"
      >
        <img
          src="/hero-atmosphere.png"
          alt=""
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F2FB] via-[#F7F2FB]/85 to-transparent lg:via-[#F7F2FB]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2FB] via-transparent to-[#F7F2FB]/40 lg:from-transparent" />
      </div>

      {/* Loops orgânicos sobrepostos — assinatura Instagram */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 top-[18%] h-72 w-72 rounded-full border border-brand-primary/15" />
        <span className="absolute left-8 top-[28%] h-48 w-48 rounded-full bg-brand-primary/[0.06] blur-2xl" />
        <span className="absolute bottom-[8%] right-[12%] hidden h-40 w-40 rounded-full border-2 border-brand-accent-yellow/40 lg:block" />
      </div>

      <div className="relative z-[1] mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-page pb-16 pt-32 lg:justify-center lg:px-8 lg:pb-24 lg:pt-28">
        <div className="max-w-xl lg:max-w-[36rem]">
          <motion.p
            {...enter(0.15, 12)}
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary"
          >
            <span aria-hidden="true" className="h-px w-10 bg-brand-primary/60" />
            clínica interdisciplinar
          </motion.p>

          <h1 className="mt-8 font-display leading-[0.95] tracking-[-0.04em] text-content-primary">
            <LineReveal delay={0.25}>
              <span className="block text-[clamp(3.25rem,9vw,6.75rem)] font-light">
                Cuidado
              </span>
            </LineReveal>
            <LineReveal delay={0.38}>
              <span className="block text-[clamp(3.25rem,9vw,6.75rem)] font-bold">
                que evolui
              </span>
            </LineReveal>
            <LineReveal delay={0.5}>
              <span className="mt-1 block text-[clamp(3.25rem,9vw,6.75rem)] font-bold text-brand-primary">
                com{" "}
                <span className="relative inline-block">
                  você
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[0.12em] w-full origin-left rounded-full bg-brand-accent-yellow"
                    initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.85, delay: 1.05, ease: EASE_EXPO }}
                  />
                </span>
              </span>
            </LineReveal>
          </h1>

          <motion.p
            {...enter(0.7)}
            className="mt-8 max-w-[28rem] text-[1.05rem] leading-[1.7] text-content-secondary lg:text-lg"
          >
            Na <strong className="font-semibold text-content-primary">SELF</strong>{" "}
            Evolution você não está{" "}
            <strong className="font-semibold text-content-primary">
              sozinho(a)!
            </strong>{" "}
            Unimos psicologia, neuropsicologia, reabilitação e mais para apoiar
            cada fase da sua jornada.
          </motion.p>

          <motion.div
            {...enter(0.88, 14)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={10}>
              <a
                href="#servicos"
                className={cn(
                  "group inline-flex items-center gap-2.5 rounded-full bg-brand-primary px-7 py-3.5 text-[15px] font-semibold text-content-inverse shadow-[0_16px_40px_-16px_rgba(107,78,145,0.55)] transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:bg-brand-primary-dark active:scale-[0.98]"
                )}
              >
                Conheça nossos serviços
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-brand-primary/20 bg-white/60 px-5 py-3.5 text-[15px] font-medium text-content-secondary backdrop-blur-sm transition-colors duration-300 hover:border-brand-primary/40 hover:text-brand-primary"
            >
              Entrar
            </Link>
          </motion.div>
        </div>

        {/* Chip flutuante — camada de profundidade */}
        <Parallax offset={10} className="pointer-events-none absolute bottom-28 right-[8%] hidden xl:block">
          <motion.div
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1, delay: 0.9, ease: EASE_EXPO },
                })}
            className="rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-lift backdrop-blur-md"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary">
              cuidado integrado
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-content-primary">
              7 especialidades · um só lugar
            </p>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
}
