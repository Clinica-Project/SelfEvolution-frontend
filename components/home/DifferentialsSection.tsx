import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { JourneyTrail, JOURNEY_STATIONS } from "@/components/home/JourneyTrail";
import { differentials } from "@/lib/content/home";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

const STEPS = [
  {
    verb: "chegar",
    item: differentials[1],
    image: "/hero/16-chegar.jpg",
    alt: "Primeiro contato pelo celular em um ambiente calmo",
    position: "center",
    width: 1122,
    height: 1402,
  },
  {
    verb: "acompanhar",
    item: differentials[0],
    image: "/hero/17-acompanhar.jpg",
    alt: "Profissionais da clínica em conversa compartilhada",
    position: "center",
    width: 1856,
    height: 2304,
  },
  {
    verb: "evoluir",
    item: differentials[2],
    image: "/hero/18-evoluir.jpg",
    alt: "Adulto e criança caminhando pelo corredor da clínica",
    position: "center",
    width: 1856,
    height: 2304,
  },
] as const;

export function DifferentialsSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.25"],
  });
  const lineScale = useTransform(sectionProgress, [0, 1], [0, 1]);

  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ["start 0.88", "end 0.1"],
  });

  const verbOpacities = [
    useTransform(scrollYProgress, [...JOURNEY_STATIONS[0]], [0.5, 1, 1, 0.42]),
    useTransform(scrollYProgress, [...JOURNEY_STATIONS[1]], [0.42, 1, 1, 0.42]),
    useTransform(scrollYProgress, [...JOURNEY_STATIONS[2]], [0.42, 1, 1, 1]),
  ];

  return (
    <section
      ref={sectionRef}
      id="diferenciais"
      className="relative overflow-x-clip bg-surface-background"
    >
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { scaleX: lineScale }}
        className="pointer-events-none absolute left-page right-page top-0 h-px origin-left bg-brand-primary/25 lg:left-8 lg:right-8"
      />

      <div className="mx-auto max-w-7xl px-page pt-16 lg:px-8 lg:pt-36">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
            a jornada
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary">
            Três gestos de cuidado
          </h2>
        </Reveal>
      </div>

      <div ref={trailRef} className="relative mx-auto max-w-7xl pb-14 lg:pb-28">
        <JourneyTrail
          rootRef={trailRef}
          progress={scrollYProgress}
          reduced={reduced === true}
        />

        <div className="relative z-10 px-page lg:px-8">
          {STEPS.map(({ verb, item, image, alt, position, width, height }, index) => {
            const n = String(index + 1).padStart(2, "0");
            const imageRight = index === 1;

            return (
              <article
                key={verb}
                className="relative z-10 py-12 first:pt-10 lg:py-28 first:lg:pt-16"
              >
                <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <div
                    data-journey-image
                    className={cn(
                      "relative isolate overflow-hidden bg-surface-background lg:col-span-5",
                      imageRight && "lg:col-start-8"
                    )}
                  >
                    <p
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-6 left-0 z-[1] font-display text-6xl font-bold leading-none tracking-[-0.07em] text-white/25 mix-blend-overlay lg:text-[clamp(5rem,18vw,9rem)] lg:text-brand-primary/15 lg:mix-blend-normal"
                    >
                      {n}
                    </p>
                    <motion.img
                      src={image}
                      alt={alt}
                      width={width}
                      height={height}
                      className="aspect-[16/10] h-[min(14rem,38vh)] w-full object-cover lg:aspect-[5/4] lg:h-[min(26rem,56svh)]"
                      style={{ objectPosition: position }}
                      initial={reduced ? false : { scale: 1.06, opacity: 0.5 }}
                      whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                      viewport={viewportOnce}
                      transition={{ duration: 1.1, ease: EASE_EXPO }}
                    />
                  </div>

                  <div
                    className={cn(
                      "lg:col-span-6",
                      imageRight ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"
                    )}
                  >
                    <Parallax offset={12}>
                      <motion.p
                        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary"
                        style={reduced ? undefined : { opacity: verbOpacities[index] }}
                      >
                        {verb}
                      </motion.p>
                      <h3 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,3rem)] font-bold tracking-[-0.03em] text-content-primary">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-content-secondary lg:text-lg">
                        {item.description}
                      </p>
                    </Parallax>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
