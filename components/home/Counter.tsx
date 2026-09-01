import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export function Counter({
  value,
  prefix,
  suffix,
  duration = 0.9,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE_EXPO,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {display === null ? (
        <span className="invisible">
          {prefix}
          {value}
          {suffix}
        </span>
      ) : (
        <>
          {prefix}
          {display}
          {suffix}
        </>
      )}
    </span>
  );
}
