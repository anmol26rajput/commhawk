"use client";

import { useEffect, useRef } from "react";

export type CanvasDrawFn = (ctx: CanvasRenderingContext2D, width: number, height: number, elapsedMs: number) => void;

/**
 * Drives a <canvas> with a resize-aware requestAnimationFrame loop. Always
 * paints one frame on mount/resize (so an inactive, not-yet-selected layer
 * isn't blank underneath its 0-opacity wrapper), then keeps looping only
 * while `active` is true and the user hasn't asked for reduced motion.
 */
export function useCanvasLoop(active: boolean, draw: CanvasDrawFn) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frameId = 0;

    function frame(now: number) {
      draw(ctx!, width, height, now - start);
      if (active && !reduceMotion) {
        frameId = requestAnimationFrame(frame);
      }
    }
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [active, draw]);

  return canvasRef;
}
