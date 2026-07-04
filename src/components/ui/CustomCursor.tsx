"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const INTERACTIVE_SELECTOR = "a, button, input, textarea, [role='button'], [data-cursor-hover]";
// Elements with their own custom hover cursor (e.g. the Works project-card
// arrow bubble) opt out of the global dot/ring entirely instead of just
// scaling it, so the two don't render on top of each other.
const CURSOR_HIDE_SELECTOR = "[data-cursor-hide]";

/**
 * Site-wide custom cursor: a dot that follows the pointer 1:1 and a ring that
 * trails with spring-like lag (GSAP quickTo), scaling up over interactive
 * elements. Desktop/mouse only — disabled entirely on touch devices and under
 * prefers-reduced-motion, both of which fall back to the native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || prefersReducedMotion || !dotRef.current || !ringRef.current) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    // Delegated (mouseover/mouseout bubble, unlike mouseenter/mouseleave) so
    // elements added after mount — e.g. the mobile menu's links — are
    // covered without re-querying the DOM.
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest?.(CURSOR_HIDE_SELECTOR)) {
        gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2, ease: "power2.out" });
        return;
      }
      if (target?.closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(ringRef.current, { scale: 2.2, duration: 0.3, ease: "power2.out" });
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest?.(CURSOR_HIDE_SELECTOR)) {
        gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2, ease: "power2.out" });
        return;
      }
      if (target?.closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };
    const onPointerDown = () => gsap.to(dotRef.current, { scale: 0.6, duration: 0.15 });
    const onPointerUp = () => gsap.to(dotRef.current, { scale: 1, duration: 0.15 });
    const onVisible = () => gsap.to(rootRef.current, { autoAlpha: 1, duration: 0.3 });
    const onHidden = () => gsap.to(rootRef.current, { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onVisible);
    document.addEventListener("mouseleave", onHidden);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onVisible);
      document.removeEventListener("mouseleave", onHidden);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[70] opacity-0" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg-32"
      />
    </div>
  );
}
