import { useEffect, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "framer-motion";

export function useIsDesktop(query = "(min-width: 1024px)") {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useProgressIndex(progress: MotionValue<number>, count: number) {
  const [index, setIndex] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  return index;
}
