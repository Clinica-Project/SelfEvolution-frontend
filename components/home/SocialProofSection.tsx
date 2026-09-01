import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/home/Counter";
import { metrics } from "@/lib/content/home";
import { EASE_EXPO } from "@/lib/motion";

const visibleMetrics = metrics.filter((metric) => metric.value > 0);

const rise = {
  hidden: { y: "108%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.95, delay, ease: EASE_EXPO },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE_EXPO },
  }),
};

export function SocialProofSection() {
  const reduced = useReducedMotion();
  const enter = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.4 },
      };

  return (
    <section
      id="presenca"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#1C1916] text-white"
    >
      <motion.img
        src="/hero/05-espaco.jpg"
        alt="Sala de espera da clínica, com luz natural e um banco de madeira"
        width={2400}
        height={1600}
        className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
        initial={reduced ? false : { scale: 1.1 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: EASE_EXPO }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1C1916] from-[8%] via-[#1C1916]/70 via-[32%] to-transparent to-[70%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#1C1916]/50 via-transparent to-[#1C1916]/25"
      />

      <motion.div
        className="relative z-10 flex min-h-[100svh] items-center"
        {...enter}
      >
        <div className="mx-auto w-full max-w-7xl px-page py-28 lg:px-8 lg:py-32">
          <h2 className="max-w-[11ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.96] tracking-[-0.045em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" custom={0.05} variants={reduced ? undefined : rise}>
                Você não está
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block font-light italic"
                custom={0.16}
                variants={reduced ? undefined : rise}
              >
                sozinho(a).
              </motion.span>
            </span>
          </h2>

          <motion.p
            className="mt-8 max-w-sm text-base leading-relaxed text-white/70 lg:text-lg"
            custom={0.32}
            variants={reduced ? undefined : fade}
          >
            Unimos psicologia, neuropsicologia, reabilitação e mais para apoiar
            cada fase da sua jornada.
          </motion.p>

          {visibleMetrics[0] ? (
            <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-14">
              <motion.div custom={0.42} variants={reduced ? undefined : fade}>
                <p className="font-serif text-[clamp(3.5rem,8vw,6rem)] font-medium leading-none tracking-[-0.05em] [font-optical-sizing:auto]">
                  <Counter
                    value={visibleMetrics[0].value}
                    prefix={visibleMetrics[0].prefix}
                    suffix={visibleMetrics[0].suffix}
                    duration={0.9}
                  />
                </p>
                <p className="mt-4 text-sm text-white/55">{visibleMetrics[0].label}</p>
              </motion.div>

              {visibleMetrics.length > 1 ? (
                <motion.ul
                  className="flex flex-col gap-4 pb-1 text-sm leading-snug text-white/60 sm:gap-3"
                  custom={0.55}
                  variants={reduced ? undefined : fade}
                >
                  {visibleMetrics.slice(1).map((metric) => (
                    <li key={metric.label}>
                      <span className="font-serif text-lg text-white/90 [font-optical-sizing:auto]">
                        {metric.prefix}
                        {metric.value}
                        {metric.suffix}
                      </span>
                      <span className="ml-2.5">{metric.label}</span>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
