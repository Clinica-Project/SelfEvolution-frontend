import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ParallaxProps = {
  children: ReactNode;
  /** Deslocamento máximo em px (positivo = sobe no scroll). */
  offset?: number;
  className?: string;
};

/** Parallax curto — só transform. Amplitude típica 8–24px. */
export function Parallax({ children, offset = 16, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

type ScrollScaleProps = {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
  distance?: number;
};

/** Scale ligado ao scroll da janela — uso no visual do hero. */
export function ScrollScale({
  children,
  from = 1.04,
  to = 1,
  distance = 480,
  className,
}: ScrollScaleProps) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, distance], [from, to]);
  const y = useTransform(scrollY, [0, distance], [0, 20]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ scale, y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
