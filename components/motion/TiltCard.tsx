import { PointerEvent, ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Inclinação máxima em graus (≤ 3 no plano). */
  max?: number;
};

export function TiltCard({ children, className, max = 3 }: TiltCardProps) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 400, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 400, damping: 30 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * max * 2);
    rotateY.set(px * max * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
