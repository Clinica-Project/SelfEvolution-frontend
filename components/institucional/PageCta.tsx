import { Link } from "@/lib/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

type PageCtaProps = {
  label: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  title?: string;
  description?: string;
};

export function PageCta({
  label,
  href,
  secondaryLabel,
  secondaryHref,
  title = "Pronto para dar o próximo passo?",
  description = "Profissionais acessam o sistema para gerenciar o cuidado. Famílias podem falar diretamente com a nossa equipe.",
}: PageCtaProps) {
  const isExternal =
    secondaryHref?.startsWith("mailto:") || secondaryHref?.startsWith("http");

  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-br from-brand-secondary via-brand-primary-light to-brand-primary p-10 text-content-inverse lg:p-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl animate-float-a" />
              <div className="absolute -bottom-24 left-[15%] h-64 w-64 rounded-full bg-brand-accent-yellow/20 blur-3xl animate-float-c" />
            </div>

            <RevealGroup
              stagger={0.1}
              className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-xl">
                <RevealItem>
                  <span className="inline-flex items-center gap-2 rounded-sm bg-white/15 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    próximo passo
                  </span>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-6 text-balance font-display text-display-section font-bold">
                    {title}
                  </h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-5 text-lg leading-relaxed text-white/90">
                    {description}
                  </p>
                </RevealItem>
              </div>

              <RevealItem className="shrink-0">
                <div className="flex flex-wrap items-center gap-4">
                  <Magnetic strength={5}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 rounded-md bg-surface-card px-6 py-3.5 text-base font-medium text-brand-primary shadow-lift transition-colors duration-300 hover:bg-white"
                    >
                      {label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Magnetic>
                  {secondaryLabel && secondaryHref && (
                    <Magnetic strength={4}>
                      {isExternal ? (
                        <a
                          href={secondaryHref}
                          className="inline-flex items-center rounded-md border border-white/50 px-6 py-3.5 text-base font-medium transition-colors duration-300 hover:bg-white/10"
                        >
                          {secondaryLabel}
                        </a>
                      ) : (
                        <Link
                          href={secondaryHref}
                          className="inline-flex items-center rounded-md border border-white/50 px-6 py-3.5 text-base font-medium transition-colors duration-300 hover:bg-white/10"
                        >
                          {secondaryLabel}
                        </Link>
                      )}
                    </Magnetic>
                  )}
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
