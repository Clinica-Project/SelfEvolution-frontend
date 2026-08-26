import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ScrollProgressLineProps = {
  children: ReactNode;
  className?: string;
  /** Distância do eixo até a esquerda (alinha com ícones/números). */
  inset?: string;
};

/** Linha vertical que cresce com o scroll da lista. */
export function ScrollProgressLine({
  children,
  className,
  inset = "1.375rem",
}: ScrollProgressLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 28 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 top-8 hidden w-px bg-border sm:block"
        style={{ left: inset }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 hidden h-[calc(100%-4rem)] w-px origin-top bg-brand-primary sm:block"
        style={{ left: inset, scaleY: reduced ? 1 : scaleY }}
      />
      {children}
    </div>
  );
}
