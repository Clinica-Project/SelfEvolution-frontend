import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesMarquee } from "@/components/home/ServicesMarquee";
import { Link } from "@/lib/link";
import { services } from "@/lib/content/home";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

export function ServicesSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = services[active] ?? services[0];
  const n = String(active + 1).padStart(2, "0");

  return (
    <section id="servicos" className="relative bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-page lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            nossas especialidades
          </p>
          <h2 className="mt-4 max-w-lg font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary">
            Cuidado integrado{" "}
            <span className="font-light text-brand-primary">em cada área</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-10">
        <ServicesMarquee />
      </Reveal>

      <div className="mx-auto mt-6 max-w-7xl px-page lg:mt-10 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative isolate aspect-[16/10] min-h-48 overflow-hidden lg:hidden">
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={current.image + current.imagePosition}
                src={current.image}
                alt=""
                width={1122}
                height={1402}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: current.imagePosition }}
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE_EXPO }}
              />
            </AnimatePresence>
          </div>

          <ol className="lg:col-span-7">
            {services.map(({ title, description }, index) => {
              const num = String(index + 1).padStart(2, "0");
              const selected = index === active;

              return (
                <li key={title} className="border-b border-brand-primary/10 first:border-t">
                  <button
                    type="button"
                    aria-expanded={selected}
                    aria-pressed={selected}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={cn(
                      "group flex w-full items-baseline gap-5 py-5 text-left transition-colors duration-300 ease-expo lg:gap-8 lg:py-6",
                      selected ? "text-content-primary" : "text-content-muted hover:text-content-primary"
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0 font-display text-sm font-semibold tabular-nums tracking-[0.12em] transition-colors duration-300",
                        selected ? "text-brand-primary" : "text-content-muted group-hover:text-brand-primary"
                      )}
                    >
                      {num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-display text-xl font-semibold tracking-[-0.02em] transition-transform duration-500 ease-expo lg:text-2xl",
                          selected ? "lg:translate-x-2" : "lg:group-hover:translate-x-2"
                        )}
                      >
                        {title}
                      </span>
                      <span
                        className={cn(
                          "mt-1 max-w-md text-sm leading-relaxed transition-opacity duration-300",
                          selected
                            ? "block text-content-secondary opacity-100"
                            : "hidden text-content-muted lg:block lg:opacity-0 lg:group-hover:opacity-80 lg:group-focus:opacity-80"
                        )}
                      >
                        {description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:sticky lg:top-28 lg:col-span-5 lg:block">
            <div className="relative isolate min-h-[28rem] overflow-hidden text-content-inverse">
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={current.image + current.imagePosition}
                  src={current.image}
                  alt=""
                  width={1122}
                  height={1402}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: current.imagePosition }}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: reduced ? 1 : 1.02 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: reduced ? 0.2 : 0.7, ease: EASE_EXPO },
                    scale: { duration: reduced ? 0 : 6.5, ease: "linear" },
                  }}
                />
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10"
              />
              <div className="relative flex min-h-[28rem] flex-col justify-between p-9 lg:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={n}
                    aria-hidden="true"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE_EXPO }}
                    className="font-display text-[7rem] font-bold leading-none tracking-[-0.06em] text-white/25"
                  >
                    {n}
                  </motion.p>
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.title}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE_EXPO }}
                  >
                    <h3 className="font-display text-3xl font-bold tracking-[-0.03em]">
                      {current.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-white/85">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={0.08} className="mt-12">
          <Link
            href="/servicos"
            className="group inline-flex items-center gap-2.5 text-[15px] font-semibold text-brand-primary transition-colors hover:text-brand-primary-dark"
          >
            Ver todas as especialidades
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
