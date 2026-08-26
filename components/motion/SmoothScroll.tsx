import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { HEADER_SCROLL_OFFSET, LENIS_LERP } from "@/lib/motion";
import { setLenisInstance } from "@/lib/lenis-instance";

/** Instancia o Lenis sem envolver o `{children}` do layout (evita quebrar o LayoutRouter). */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: LENIS_LERP,
      anchors: { offset: HEADER_SCROLL_OFFSET },
      autoRaf: true,
      syncTouch: false,
      respectReducedMotion: true,
    });

    setLenisInstance(lenis);

    return () => {
      setLenisInstance(null);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
