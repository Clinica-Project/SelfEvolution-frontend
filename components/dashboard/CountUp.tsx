import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_EXPO } from "@/lib/motion";

type CountUpProps = {
  value: number;
  duration?: number;
};

/** Número que sobe de 0 até `value` na montagem. */
export function CountUp({ value, duration = 0.9 }: CountUpProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration, reduced]);

  return <>{display}</>;
}
