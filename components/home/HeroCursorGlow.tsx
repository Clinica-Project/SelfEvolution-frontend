import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

export function HeroCursorGlow() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(-400, { stiffness: 70, damping: 24, mass: 0.7 });
  const y = useSpring(-400, { stiffness: 70, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const parent = ref.current?.offsetParent;
      if (!(parent instanceof HTMLElement)) return;
      const rect = parent.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute z-0 hidden h-64 w-64 rounded-full bg-brand-primary/[0.07] blur-[80px] lg:block"
      style={{
        x,
        y,
        marginLeft: "-8rem",
        marginTop: "-8rem",
      }}
    />
  );
}
