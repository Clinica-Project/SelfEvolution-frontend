import { PointerEvent, ReactNode, useCallback, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type RippleMark = { id: number; x: number; y: number };

type RippleProps = {
  children: ReactNode;
  className?: string;
};

/** Camada de tinta no clique. Use em um ancestral `relative overflow-hidden`. */
export function RippleInk({
  ripples,
  className,
}: {
  ripples: RippleMark[];
  className?: string;
}) {
  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className={cn("ripple-ink", className)}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </>
  );
}

export function useRipple() {
  const reduced = useReducedMotion();
  const [ripples, setRipples] = useState<RippleMark[]>([]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const id = event.timeStamp;
      setRipples((current) => [
        ...current,
        { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
      ]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((item) => item.id !== id));
      }, 650);
    },
    [reduced]
  );

  return { ripples, onPointerDown };
}

export function Ripple({ children, className }: RippleProps) {
  const { ripples, onPointerDown } = useRipple();

  return (
    <span
      className={cn("relative inline-flex overflow-hidden", className)}
      onPointerDown={onPointerDown}
    >
      {children}
      <RippleInk ripples={ripples} />
    </span>
  );
}
