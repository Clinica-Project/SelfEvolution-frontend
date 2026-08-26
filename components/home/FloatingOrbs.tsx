import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type FloatingOrbsProps = {
  className?: string;
  variant?: "hero" | "soft";
};

export function FloatingOrbs({ className, variant = "hero" }: FloatingOrbsProps) {
  const isHero = variant === "hero";
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 700], [0, 16]);
  const yB = useTransform(scrollY, [0, 700], [0, -12]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        style={reduced ? undefined : { y: yA }}
        className={cn(
          "absolute rounded-full bg-brand-primary blur-[120px]",
          !reduced && "animate-float-a will-change-transform",
          isHero
            ? "-left-32 top-[12%] h-[22rem] w-[22rem] opacity-[0.14]"
            : "-left-16 top-8 h-48 w-48 opacity-[0.08]"
        )}
      />
      <motion.div
        style={reduced ? undefined : { y: yB }}
        className={cn(
          "absolute rounded-full bg-brand-primary-light blur-[130px]",
          !reduced && "animate-float-b will-change-transform",
          isHero
            ? "right-[-8rem] top-[28%] h-[18rem] w-[18rem] opacity-[0.1]"
            : "right-[-4rem] bottom-0 h-40 w-40 opacity-[0.07]"
        )}
      />
    </div>
  );
}
