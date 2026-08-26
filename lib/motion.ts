import type { Transition, Variants } from "framer-motion";

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Offset das âncoras Lenis — alinha com scroll-padding-top (6rem). */
export const HEADER_SCROLL_OFFSET = -96;

export const INTRO_STORAGE_KEY = "se-intro";

export const LENIS_LERP = 0.09;

export const revealTransition: Transition = {
  duration: 0.8,
  ease: EASE_EXPO,
};

export const springHover: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: revealTransition },
};

/** Linha de texto que sobe de dentro de um wrapper com overflow hidden. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.95, ease: EASE_EXPO } },
};

/** Entrada de modal/palette: fade + leve zoom. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_EXPO } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: EASE_EXPO } },
};

/** Entrada lateral (drawer mobile) vindo da direita. */
export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.45, ease: EASE_EXPO } },
  exit: { x: "100%", transition: { duration: 0.3, ease: EASE_EXPO } },
};

export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Stagger rápido para itens densos (linhas de tabela, chips). */
export const staggerFast = staggerContainer(0.05);

/** Stagger lento para blocos grandes (cards de seção). */
export const staggerSlow = staggerContainer(0.12);

/** Margem usada nos gatilhos de scroll: dispara com ~18% da seção visível. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
