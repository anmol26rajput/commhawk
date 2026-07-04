"use client";

import { motion, type Variants } from "motion/react";
import { staggerContainer } from "@/lib/motion";

const wordVariants: Variants = {
  hidden: { opacity: 0.32 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const viewportRepeat = { once: false, margin: "0px 0px -10% 0px" } as const;

/** Word-by-word muted → full-opacity stagger reveal for large headings, replayed on every scroll-into-view. */
export function WordReveal({
  text,
  className,
  as = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
}) {
  const words = text.split(" ");
  const wordSpans = words.flatMap((word, i) => {
    const span = (
      <motion.span key={`${word}-${i}`} variants={wordVariants} className="inline-block text-fg">
        {word}
      </motion.span>
    );
    return i < words.length - 1 ? [span, " "] : [span];
  });

  const sharedProps = {
    className,
    variants: staggerContainer,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: viewportRepeat,
    children: wordSpans,
  };

  return as === "h2" ? <motion.h2 {...sharedProps} /> : <motion.p {...sharedProps} />;
}
