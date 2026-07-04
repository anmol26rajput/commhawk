"use client";

import { motion, type Variants } from "motion/react";
import { fadeIn, fadeInDelayed, viewportOnce } from "@/lib/motion";

type RevealTag = "div" | "h1" | "h2" | "h3" | "li";

/**
 * Scroll-triggered fade-in (opacity-only, spring damping:30/stiffness:200/
 * mass:1). Use `delayed` for the secondary/staggered child in a pair.
 *
 * Branches over a fixed tag set (rather than `motion.create(Component)` at
 * render time) so every JSX tag resolves to Motion's own static `motion.div`
 * / `motion.h1` etc. — required by React's `static-components` rule, and
 * avoids remounting (and resetting whileInView state) on every re-render.
 */
export function Reveal({
  as = "div",
  children,
  className,
  delayed = false,
}: {
  as?: RevealTag;
  children: React.ReactNode;
  className?: string;
  delayed?: boolean;
}) {
  const props: {
    className?: string;
    variants: Variants;
    initial: string;
    whileInView: string;
    viewport: typeof viewportOnce;
    children: React.ReactNode;
  } = {
    className,
    variants: delayed ? fadeInDelayed : fadeIn,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewportOnce,
    children,
  };

  switch (as) {
    case "h1":
      return <motion.h1 {...props} />;
    case "h2":
      return <motion.h2 {...props} />;
    case "h3":
      return <motion.h3 {...props} />;
    case "li":
      return <motion.li {...props} />;
    default:
      return <motion.div {...props} />;
  }
}
