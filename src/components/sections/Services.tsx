"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/data/content";

/**
 * Pinned scroll-tracked services showcase — `position: sticky` +
 * `useScroll`-driven active-index tracking so native scroll behavior (and
 * accessibility) is preserved while stepping through all 13 categories.
 */
export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)));
    setActive(index);
  });

  const current = services[active];

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ height: `${services.length * 100}vh` }}
      className="relative bg-bg"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-surface">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-surface to-bg transition-opacity duration-700"
          aria-hidden="true"
        />
        <Logo className="absolute top-10 left-6 h-8 w-8 opacity-[0.16] sm:left-10 lg:left-16" />
        <Container>
          <h2 className="sr-only">Services</h2>
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
              <Button href="#contact" variant="solid" className="w-fit">
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

          <div className="mt-12 flex gap-1.5">
            {services.map((s, i) => (
              <div
                key={s.index}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  i === active ? "bg-accent" : "bg-fg-16"
                }`}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
