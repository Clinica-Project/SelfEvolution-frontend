import { Link } from "@/lib/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { LineReveal } from "@/components/motion/LineReveal";

export function CtaSection() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-brand-primary py-32 text-content-inverse lg:py-40"
    >
      {/* Textura + profundidade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full border border-white/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[8%] h-80 w-80 rounded-full bg-brand-primary-light/40 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[30%] h-24 w-24 rounded-full bg-brand-accent-yellow/25 blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
            próximo passo
          </p>
        </Reveal>

        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.04em]">
          <LineReveal onView delay={0.05}>Está pronto para</LineReveal>
          <LineReveal onView delay={0.14}>
            <span className="font-light italic">começar</span> uma nova
          </LineReveal>
          <LineReveal onView delay={0.22}>etapa?</LineReveal>
        </h2>

        <div className="mt-14 flex flex-col gap-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-white/75">
              Profissionais acessam o sistema. Famílias falam conosco. O próximo
              passo começa aqui.
            </p>
          </Reveal>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={10}>
              <Link
                href="/cadastro"
                className="group inline-flex items-center gap-2.5 rounded-full bg-surface-card px-8 py-4 text-[15px] font-semibold text-brand-primary shadow-lift transition-all duration-300 ease-expo hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Começar
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-4 text-[15px] font-medium text-white/85 transition-colors duration-300 hover:border-white hover:text-white"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
