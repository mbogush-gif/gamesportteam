import type { Variants, Transition } from "framer-motion";

/**
 * Единый набор анимационных пресетов.
 * Правило: НЕ пиши motion.div с inline-анимациями в продуктовом коде —
 * используй обёртки из ./components или варианты отсюда.
 */

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOutQuart: Transition["ease"] = [0.76, 0, 0.24, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

/** Контейнер для последовательного появления потомков */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
