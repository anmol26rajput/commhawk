"use client";

import { useRef, useState } from "react";
import { clsx } from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/content";
import { scrollToY } from "@/lib/smooth-scroll";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M12.5 15.5L7 10L12.5 4.5" : "M7.5 15.5L13 10L7.5 4.5"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M8 1V15"
        stroke="currentColor"
        strokeWidth="1.5"
        className={clsx("origin-center transition-transform duration-300", open && "scale-y-0")}
      />
      <path d="M1 8H15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Pinned scroll-tracked services showcase — `position: sticky` +
 * `useScroll`-driven active-index tracking. Only rendered at `lg` (1200px)
 * and up: below that, single-column stacking makes the pinned content
 * (index + heading + description + button + full offerings list) taller
 * than a single 100vh slide, which would silently clip content with no way
 * to reach it (the sticky box doesn't scroll internally). See
 * `ServicesAccordion` for the small-viewport equivalent.
 */
function ServicesPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)));
    setActive(index);
  });

  function scrollToIndex(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const targetProgress = (index + 0.5) / services.length;
    const targetY = sectionTop + targetProgress * (rect.height - window.innerHeight);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToY(targetY, { immediate: prefersReducedMotion });
  }

  // Wraps around in both directions — next from the last category goes to
  // the first, previous from the first goes to the last.
  function goToPrevious() {
    scrollToIndex((active - 1 + services.length) % services.length);
  }
  function goToNext() {
    scrollToIndex((active + 1) % services.length);
  }

  const current = services[active];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${services.length * 100}vh` }}
      className="relative hidden bg-bg lg:block"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-surface">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-surface to-bg transition-opacity duration-700"
          aria-hidden="true"
        />
        <Logo className="absolute top-10 left-6 h-8 w-8 opacity-[0.16] sm:left-10 lg:left-16" />
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <span className="text-h1 font-medium text-accent">{current.index}</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="text-h2 font-medium text-fg">{current.name}</h3>
                  <p className="mt-4 max-w-md text-body-lg text-fg-64">{current.description}</p>
                </motion.div>
              </AnimatePresence>
              <Button href="/#contact" variant="solid" className="w-fit">
                Start Your Project
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={`${current.name}-list`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex max-h-[46vh] flex-col gap-4 overflow-y-auto border-t border-fg-16 pt-6"
              >
                {current.offerings.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between border-b border-fg-16 pb-4 text-body-lg text-fg"
                  >
                    {item}
                    <span className="text-fg-32">{"//"}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous service"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fg-32 text-fg transition-colors duration-300 hover:border-fg hover:text-accent"
            >
              <ArrowIcon direction="left" />
            </button>

            <div className="flex flex-1 gap-1.5">
              {services.map((s, i) => (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${s.name}`}
                  aria-current={i === active}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i === active ? "bg-accent" : "bg-fg-16 hover:bg-fg-32"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next service"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fg-32 text-fg transition-colors duration-300 hover:border-fg hover:text-accent"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}

/**
 * Plain accordion equivalent for viewports below `lg` — normal document
 * flow, no scroll-jacking, no pinned/fixed-height slide (which is exactly
 * what breaks on short mobile viewports; see `ServicesPinned`).
 */
function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden bg-bg py-24 lg:hidden">
      <Container>
        <Reveal as="h3" className="text-h3 font-medium text-fg">
          Services
        </Reveal>

        <div className="mt-10 divide-y divide-fg-16 border-t border-fg-16">
          {services.map((s, i) => {
            const open = openIndex === i;
            return (
              <div key={s.index}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-label text-accent">{s.index}</span>
                    <span className="text-body-lg font-medium text-fg">{s.name}</span>
                  </span>
                  <PlusMinusIcon open={open} />
                </button>
                <div
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-500 ease-framer-spring",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-6 pb-8">
                      <p className="max-w-md text-body text-fg-64">{s.description}</p>
                      <ul className="flex flex-col gap-3">
                        {s.offerings.map((item) => (
                          <li
                            key={item}
                            className="flex items-center justify-between border-b border-fg-16 pb-3 text-body text-fg"
                          >
                            {item}
                            <span className="text-fg-32">{"//"}</span>
                          </li>
                        ))}
                      </ul>
                      <Button href="/#contact" variant="outline" className="w-fit">
                        Start Your Project
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export function Services() {
  return (
    <div id="services">
      <h2 className="sr-only">Services</h2>
      <ServicesPinned />
      <ServicesAccordion />
    </div>
  );
}
