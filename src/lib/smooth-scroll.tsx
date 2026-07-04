"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Module-level singleton so other components (e.g. the Services prev/next
// arrows) can trigger a scroll that Lenis is actually aware of. Calling the
// native `window.scrollTo` directly while Lenis is mounted doesn't work: Lenis
// drives scroll position itself on every rAF tick from its own internal
// target, so a native scrollTo gets visibly overridden back within a frame.
let lenisInstance: Lenis | null = null;

/**
 * Scrolls the page to an absolute Y position, routed through the active Lenis
 * instance so it isn't fought back to Lenis's old target on the next frame.
 * Falls back to native scrollTo when Lenis isn't mounted (reduced motion).
 */
export function scrollToY(y: number, options?: { immediate?: boolean }) {
  if (lenisInstance) {
    lenisInstance.scrollTo(y, { immediate: options?.immediate ?? false });
    return;
  }
  window.scrollTo({ top: y, behavior: options?.immediate ? "auto" : "smooth" });
}

/** Global Lenis smooth scroll. Disabled automatically under prefers-reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
