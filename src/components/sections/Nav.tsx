"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { Clock } from "@/components/ui/Clock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { nav } from "@/data/content";

export function Nav({ hasHero = true }: { hasHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(hasHero);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // The hero always stays dark (generative canvas backdrop), so the fixed
  // nav matches it (dark-scope) while overlapping the hero and switches to
  // the page theme once scrolled past it. Pages without a hero (e.g.
  // /careers) never force dark-scope, so the nav follows the normal theme.
  useEffect(() => {
    if (!hasHero) return;
    function onScroll() {
      setOverHero(window.scrollY < window.innerHeight * 0.92);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <header data-theme={overHero ? "dark-scope" : undefined} className="fixed inset-x-0 top-0 z-50">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/70 to-transparent backdrop-blur-md transition-colors duration-500 [mask-image:linear-gradient(to_bottom,black,black_70%,transparent)]"
        aria-hidden="true"
      />
      <Container className="flex items-center justify-between py-9">
        <a href="/" aria-label="Home">
          <Logo className="h-9 w-9" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-1.5 text-label uppercase text-fg transition-colors duration-500"
            >
              <span className="text-fg-32">{link.index} /</span>
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 ease-framer-spring group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <a
            href={`mailto:${nav.email}`}
            className="hidden flex-col items-end text-right text-label text-fg-64 hover:text-fg sm:flex transition-colors duration-500"
          >
            <span className="uppercase">{nav.email}</span>
            <Clock label="IST" />
          </a>

          <ThemeToggle />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
            className="flex items-center gap-2 text-label uppercase text-fg transition-colors duration-500"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
              <path d="M0 1H18" stroke="currentColor" strokeWidth="1.5" />
              <path d="M0 11H18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Menu
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <Container className="flex items-center justify-between py-9">
              <Logo className="h-9 w-9" />
              <div className="flex items-center gap-6">
                <ThemeToggle />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="text-label uppercase text-fg"
                >
                  Close
                </button>
              </div>
            </Container>

            <Container className="flex flex-1 flex-col justify-center gap-6">
              {nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, type: "spring", damping: 30, stiffness: 200 }}
                  className="flex items-baseline gap-4 text-h2 font-medium text-fg hover:text-accent"
                >
                  <span className="text-label text-fg-32">{link.index}</span>
                  {link.label}
                </motion.a>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
