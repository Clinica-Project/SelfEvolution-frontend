import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type LineRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  innerClassName?: string;
  /** Dispara ao entrar no viewport em vez de no mount. */
  onView?: boolean;
};

export function LineReveal({
  children,
  delay = 0,
  className,
  innerClassName,
  onView = false,
}: LineRevealProps) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block overflow-hidden pb-[0.06em]", className)}>
      <motion.span
        className={cn("block", innerClassName)}
        {...(reduced
          ? {}
          : onView
            ? {
                initial: { y: "110%" },
                whileInView: { y: "0%" },
                viewport: viewportOnce,
                transition: { duration: 0.95, delay, ease: EASE_EXPO },
              }
            : {
                initial: { y: "110%" },
                animate: { y: "0%" },
                transition: { duration: 0.95, delay, ease: EASE_EXPO },
              })}
      >
        {children}
      </motion.span>
    </span>
  );
}
