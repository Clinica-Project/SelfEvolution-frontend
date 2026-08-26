import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      {...(reduced
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: viewportOnce,
            variants: fadeUp,
            transition: { delay },
          })}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delayChildren?: number;
};

/** Container que orquestra a entrada dos filhos <RevealItem />. */
export function RevealGroup({
  stagger = 0.1,
  delayChildren = 0,
  children,
  ...props
}: RevealGroupProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      {...(reduced
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: viewportOnce,
            variants: staggerContainer(stagger, delayChildren),
          })}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();

  return (
    <motion.div {...(reduced ? {} : { variants: fadeUp })} {...props}>
      {children}
    </motion.div>
  );
}
