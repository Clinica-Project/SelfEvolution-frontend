import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { sobreContent } from "@/lib/content/institucional";

export function SobreAbertura() {
  const { hero, abertura } = sobreContent;
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const inset = useTransform(scrollYProgress, [0, 0.72], [18, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
  const scale = useTransform(scrollYProgress, [0, 0.72], [1.16, 1]);
  const veil = useTransform(scrollYProgress, [0, 0.72], [0.22, 0.5]);
  const subOpacity = useTransform(scrollYProgress, [0.52, 0.86], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.52, 0.86], [20, 0]);

  const title = (
    <h1 className="max-w-[11ch] font-display text-[clamp(2.8rem,8vw,6.4rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
      <span className="block font-light">{hero.tituloLinhas[0]}</span>
      <span className="block">{hero.tituloLinhas[1]}</span>
      <span className="block font-light italic">{hero.tituloLinhas[2]}</span>
    </h1>
  );

  const photo = (
    <img
      src={abertura.image}
      alt={abertura.imageAlt}
      width={1600}
      height={1067}
      className="h-full w-full object-cover object-[center_42%]"
    />
  );

  if (reduced) {
    return (
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1C1916]">
        <div className="absolute inset-0">{photo}</div>
        <div aria-hidden="true" className="absolute inset-0 bg-[#1C1916]/50" />
        <div className="relative z-[1] mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-page pb-16 pt-32 lg:px-8 lg:pb-20">
          {title}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
            {hero.subtitulo}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[180svh] bg-[#1C1916]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.div
            style={{ scale }}
            className="h-full w-full origin-center will-change-transform"
          >
            {photo}
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ opacity: veil }}
            className="absolute inset-0 bg-[#1C1916]"
          />
        </motion.div>

        <div className="relative z-[1] mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-page pb-16 pt-32 lg:px-8 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: EASE_EXPO }}
          >
            {title}
          </motion.div>
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg"
          >
            {hero.subtitulo}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
