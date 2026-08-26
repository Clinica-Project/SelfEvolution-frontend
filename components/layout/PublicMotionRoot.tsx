import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";

/** Overlays de motion. Não envolve `{children}` — o LayoutRouter do Next precisa ficar no layout server. */
export function PublicMotionRoot() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
    </>
  );
}
