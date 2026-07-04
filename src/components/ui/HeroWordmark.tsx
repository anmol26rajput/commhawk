"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * GSAP-driven character-stagger reveal for the hero wordmark, plus the
 * blinking cursor block.
 */
export function HeroWordmark({ text, className }: { text: string; className?: string }) {
  const scope = useRef<HTMLHeadingElement>(null);
  const chars = text.split("");

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".wordmark-char", {
          yPercent: 110,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          delay: 0.1,
        });
      });
    },
    { scope },
  );

  return (
    <h1 ref={scope} className={className}>
      <span className="inline-flex min-w-0 overflow-hidden py-1">
        {chars.map((char, i) => (
          <span key={i} className="wordmark-char inline-block">
            {char}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="cursor-blink ml-1.5 mb-2 inline-block h-2.5 w-6 shrink-0 bg-accent sm:mb-3 sm:ml-3 sm:h-3 sm:w-16 lg:h-4 lg:w-24"
      />
    </h1>
  );
}
