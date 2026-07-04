"use client";

import { clsx } from "clsx";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Infinite horizontal ticker, content duplicated in the DOM.
 *
 * Driven by a plain CSS `@keyframes` animation (globals.css
 * `.animate-marquee-scroll`) rather than a JS rAF loop, so the browser's
 * GPU compositor keeps it at a steady frame rate independent of main-thread
 * work. The one bit of JS is a one-time (plus resize-driven) width
 * measurement to convert the desired px/s speed into a fixed
 * animation-duration.
 */
export function Marquee({
  children,
  speed = 40,
  gap = "gap-16",
  className,
  reverse = false,
  pauseOnHover = true,
  respectReducedMotion = true,
}: {
  children: React.ReactNode;
  /** pixels per second */
  speed?: number;
  gap?: string;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Set false to keep looping under prefers-reduced-motion — appropriate
   * for plain linear-translate text tickers, which aren't the kind of
   * parallax/zoom motion that setting exists to suppress. */
  respectReducedMotion?: boolean;
}) {
  const systemReducedMotion = useReducedMotion();
  const prefersReducedMotion = respectReducedMotion && systemReducedMotion;
  const copyRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const copy = copyRef.current;
    if (!copy) return;

    function measure() {
      const width = copy!.scrollWidth;
      if (width > 0) setDuration(width / speed);
    }
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(copy);
    return () => resizeObserver.disconnect();
  }, [speed]);

  if (prefersReducedMotion) {
    return (
      <div className={clsx("flex items-center overflow-x-auto", gap, className)}>{children}</div>
    );
  }

  return (
    <div className={clsx("group flex items-center overflow-hidden", className)}>
      <div
        className={clsx(
          "flex shrink-0 items-center",
          gap,
          duration !== null && "animate-marquee-scroll",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={duration !== null ? { animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } : undefined}
      >
        <div ref={copyRef} className={clsx("flex shrink-0 items-center", gap)}>
          {children}
        </div>
        <div className={clsx("flex shrink-0 items-center", gap)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
