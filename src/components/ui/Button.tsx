"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type ButtonVariant = "outline" | "solid" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  outline: "border border-fg-32 text-fg hover:bg-fg hover:text-bg hover:border-fg",
  solid: "bg-accent text-bg hover:bg-fg",
  ghost: "text-fg-64 hover:text-fg",
};

/** How far the button can be pulled toward the cursor, in px. */
const MAGNETIC_STRENGTH = 16;

function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!el || isCoarsePointer || prefersReducedMotion) return;

      const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        moveX((relX / rect.width) * MAGNETIC_STRENGTH);
        moveY((relY / rect.height) * MAGNETIC_STRENGTH);
      };
      const onMouseLeave = () => {
        moveX(0);
        moveY(0);
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);
      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { scope: ref },
  );

  return ref;
}

export function Button({
  href,
  children,
  variant = "outline",
  className,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const linkRef = useMagnetic<HTMLAnchorElement>();
  const buttonRef = useMagnetic<HTMLButtonElement>();

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-label uppercase tracking-wide transition-colors duration-300 ease-framer-spring disabled:opacity-40 disabled:pointer-events-none",
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <Link ref={linkRef} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={buttonRef} type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
