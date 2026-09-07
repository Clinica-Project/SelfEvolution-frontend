import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_EXPO } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import {
  unidadeCities,
  unidadePath,
  unidades,
  unidadesByCity,
} from "@/lib/content/unidades";

export function LocationsSection() {
  const reduced = useReducedMotion();
  const enter = (delay = 0) => ({
    initial: reduced ? false as const : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduced ? 0 : 0.75, delay: reduced ? 0 : delay, ease: EASE_EXPO },
  });

  return (
    <section
      id="unidades"
      aria-labelledby="unidades-title"
      className="bg-surface-background py-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <div className="relative grid gap-8 pt-6 sm:gap-12 sm:pt-8 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:pt-10">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-brand-primary/25"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1.25, ease: EASE_EXPO }}
          />
          <div>
            <motion.p {...enter()} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">Onde estamos</motion.p>
            <motion.h2
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              id="unidades-title"
              className="mt-4 max-w-sm font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary"
            >
              {["Unidades", "presenciais"].map((word, index) => (
                <span key={word} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <motion.span
                    className="block"
                    variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
                    transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : index * 0.12, ease: EASE_EXPO }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <motion.p {...enter(0.12)} className="mt-4 max-w-xs text-base leading-relaxed text-content-secondary">
              São {unidades.length} endereços em São Paulo e Guarulhos.
              Encontre a unidade mais perto de você.
            </motion.p>
            <Reveal delay={0.18}>
              <Magnetic strength={5}>
                <Link
                  href="/unidades"
                  className="group mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 ease-expo hover:bg-brand-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                >
                  Conheça nossas unidades
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-expo motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1" aria-hidden="true" />
                </Link>
              </Magnetic>
            </Reveal>
            <motion.p {...enter(0.22)} className="mt-5 max-w-sm sm:mt-8 sm:max-w-[16rem] text-sm leading-6 text-content-secondary lg:mt-12">
              Prefere ser atendido de casa? Também temos atendimento online
              em todo o Brasil.
            </motion.p>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {unidadeCities.map((city) => {
              const items = unidadesByCity(city);
              return (
                <div key={city}>
                  <motion.div {...enter()} className="mb-3 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-content-primary">
                      {city}
                    </h3>
                    <span className="text-xs text-content-secondary">
                      {items.length} {items.length === 1 ? "unidade" : "unidades"}
                    </span>
                  </motion.div>
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {items.map((unit, index) => (
                      <motion.li {...enter((index % 2) * 0.07)} key={unit.slug} className="border-t border-brand-primary/10">
                        <Link
                          href={unidadePath(unit.slug)}
                          className="group relative isolate flex min-h-[68px] sm:min-h-[78px] items-center justify-between gap-4 py-4 transition-colors duration-500 ease-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                        >
                          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-primary/[0.04] transition-transform duration-500 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                          <span aria-hidden="true" className="pointer-events-none absolute -top-px inset-x-0 h-px origin-left scale-x-0 bg-brand-primary/50 transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                          <span className="min-w-0 transition-transform duration-500 ease-expo motion-safe:group-hover:translate-x-2 motion-safe:group-focus-visible:translate-x-2">
                            <span className="block font-display text-[15px] font-bold leading-6 tracking-[-0.02em] text-content-primary transition-colors group-hover:text-brand-primary">
                              {unit.name}
                            </span>
                            <span className="mt-0.5 block text-sm leading-5 text-content-secondary">
                              {unit.neighborhood}
                            </span>
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-brand-primary/60 transition-[transform,color] duration-500 ease-expo motion-safe:group-hover:-translate-x-2 motion-safe:group-focus-visible:-translate-x-2 group-hover:text-brand-primary group-focus-visible:text-brand-primary"
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
