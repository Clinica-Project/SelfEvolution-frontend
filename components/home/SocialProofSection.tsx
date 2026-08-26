import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/home/Counter";
import { metrics } from "@/lib/content/home";

export function SocialProofSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0EAF6] py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-brand-primary/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            presença
          </p>
        </Reveal>

        {/* Números + frase de marca como uma composição */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
          <RevealGroup
            stagger={0.1}
            className="grid gap-8 border-y border-brand-primary/15 py-12 sm:grid-cols-3 lg:col-span-7 lg:gap-0 lg:divide-x lg:divide-brand-primary/15 lg:border-0 lg:py-0"
          >
            {metrics.map(({ value, prefix, suffix, label }, i) => (
              <RevealItem
                key={label}
                className={i === 0 ? "lg:pr-8" : i === 2 ? "lg:pl-8" : "lg:px-8"}
              >
                <p className="font-display text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em] text-brand-primary">
                  <Counter value={value} prefix={prefix} suffix={suffix} duration={1.45} />
                </p>
                <p className="mt-4 max-w-[10rem] text-sm leading-snug text-content-secondary">
                  {label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="lg:col-span-5">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-surface-card p-8 shadow-[0_20px_50px_-28px_rgba(107,78,145,0.28)] lg:p-10">
              <span
                aria-hidden="true"
                className="font-display text-7xl font-bold leading-none text-brand-primary/15"
              >
                “
              </span>
              <blockquote className="-mt-6 font-display text-xl font-medium leading-snug tracking-[-0.01em] text-content-primary lg:text-2xl">
                Na SELF Evolution você não está sozinho(a)! Unimos psicologia,
                neuropsicologia, reabilitação e mais para apoiar cada fase da
                sua jornada.
              </blockquote>
              <figcaption className="mt-8 text-xs uppercase tracking-[0.14em] text-content-muted">
                SelfEvolution · essência
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
