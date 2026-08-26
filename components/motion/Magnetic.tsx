import { PointerEvent, ReactNode, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type MagneticProps = {
  children: ReactNode;
  /** Deslocamento máximo em px na direção do cursor. */
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 6, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    x.set(Math.max(-1, Math.min(1, offsetX)) * strength);
    y.set(Math.max(-1, Math.min(1, offsetY)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
