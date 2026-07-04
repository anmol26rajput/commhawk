"use client";

import { motion, type Variants } from "motion/react";
import { appearFade, appearFadeDelayed } from "@/lib/motion";

type AppearTag = "div" | "h1";

/**
 * Mount-triggered fade for above-the-fold content (hero). Unlike `Reveal`,
 * this does not gate on scroll position — plays on first paint, while
 * everything below the fold uses the spring-based scroll reveal.
 */
export function Appear({
  as = "div",
  children,
  className,
  delayed = false,
}: {
  as?: AppearTag;
  children: React.ReactNode;
  className?: string;
  delayed?: boolean;
}) {
  const props: {
    className?: string;
    variants: Variants;
    initial: string;
    animate: string;
    children: React.ReactNode;
  } = {
    className,
    variants: delayed ? appearFadeDelayed : appearFade,
    initial: "hidden",
    animate: "visible",
    children,
  };

  return as === "h1" ? <motion.h1 {...props} /> : <motion.div {...props} />;
}
