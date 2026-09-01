import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { sobreContent } from "@/lib/content/institucional";

export function SobreMissaoVisao() {
  const [missao, visao] = sobreContent.missaoVisao;
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const wipe = useTransform(scrollYProgress, [0.16, 0.78], [100, 0]);
  const clipPath = useMotionTemplate`inset(${wipe}% 0% 0% 0%)`;

  if (reduced) {
    return (
      <section>
        <h2 className="sr-only">Missão e visão</h2>
        <Face
          kicker={missao.titulo}
          text={missao.descricao}
          className="bg-surface-background text-content-primary"
          fill={false}
        />
        <Face
          kicker={visao.titulo}
          text={visao.descricao}
          className="bg-[#1C1916] text-white"
          muted
          fill={false}
        />
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[200svh]">
      <h2 className="sr-only">Missão e visão</h2>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Face
          kicker={missao.titulo}
          text={missao.descricao}
          className="absolute inset-0 bg-surface-background text-content-primary"
        />
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <Face
            kicker={visao.titulo}
            text={visao.descricao}
            className="h-full bg-[#1C1916] text-white"
            muted
          />
        </motion.div>
      </div>
    </section>
  );
}

function Face({
  kicker,
  text,
  className,
  muted = false,
  fill = true,
}: {
  kicker: string;
  text: string;
  className?: string;
  muted?: boolean;
  fill?: boolean;
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          "mx-auto flex max-w-7xl flex-col justify-center px-page lg:px-8",
          fill ? "h-full min-h-[100svh] py-24" : "py-24 lg:py-32"
        )}
      >
        <p
          className={
            muted
              ? "font-display text-[clamp(3.2rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white"
              : "font-display text-[clamp(3.2rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-content-primary"
          }
        >
          {kicker}
        </p>
        <p
          className={
            muted
              ? "mt-8 max-w-xl text-lg leading-relaxed text-white/75 lg:text-2xl"
              : "mt-8 max-w-xl text-lg leading-relaxed text-content-secondary lg:text-2xl"
          }
        >
          {text}
        </p>
      </div>
    </div>
  );
}
