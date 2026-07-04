import type { Transition, Variants } from "motion/react";

export const springTransition: Transition = {
  type: "spring",
  damping: 30,
  stiffness: 200,
  mass: 1,
};

export const linearFadeTransition: Transition = {
  type: "tween",
  duration: 0.6,
  ease: [0, 0, 1, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1, transition: springTransition },
};

export const fadeInDelayed: Variants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1, transition: { ...springTransition, delay: 0.35 } },
};

/** First-paint (above-the-fold) fade — linear tween, mount-triggered, not scroll-linked. */
export const appearFade: Variants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1, transition: linearFadeTransition },
};

export const appearFadeDelayed: Variants = {
  hidden: { opacity: 0.001 },
  visible: { opacity: 1, transition: { ...linearFadeTransition, delay: 0.35 } },
};

/** Stagger wrapper matching the ~50ms child delay used across the site. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

/**
 * Only shrinks the bottom edge, so elements already near the top or bottom of
 * the viewport at load (e.g. hero corners) don't fall inside an excluded
 * margin band and get stuck hidden forever on a page that never scrolls past
 * them the "normal" way.
 */
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;
