"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { works } from "@/data/content";

function ArrowUpRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 15L15 5M15 5H7M15 5V13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wraps a project thumbnail in a link whose "cursor" is a circular arrow
 * bubble that follows the pointer within the image instead of a fixed
 * corner button — the global custom cursor hides itself over
 * `[data-cursor-hide]` elements so the two never overlap.
 */
function ProjectLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.5 });
  const springY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor-hide
      className="relative block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg/85 text-fg shadow-[0_10px_40px_-6px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        style={{ x: springX, y: springY }}
        initial={false}
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ type: "spring", damping: 13, stiffness: 260 }}
      >
        <ArrowUpRightIcon />
      </motion.span>
    </a>
  );
}

// No real project screenshots are available for these builds, so each
// thumbnail is a generated gradient tile keyed off the project's initial —
// consistent, dependency-free, and honest about not having a live capture.
function WorkThumbnail({ work, index }: { work: (typeof works)[number]; index: number }) {
  const hueShift = index * 42;
  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-card"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--color-accent) ${
          28 + (index % 3) * 6
        }%, var(--color-surface)) 0%, var(--color-surface) 70%)`,
        filter: `hue-rotate(${hueShift}deg)`,
      }}
    >
      <span className="text-[8rem] leading-none font-medium text-fg-16" style={{ filter: `hue-rotate(${-hueShift}deg)` }}>
        {work.name.charAt(0)}
      </span>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="20" cy="20" rx="8" ry="18" stroke="currentColor" strokeWidth="1" />
      <path d="M2 20H38M4 12H36M4 28H36" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function TickerContent() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8">
          <span className="text-h2 font-medium text-fg">Businesses We&apos;ve Built</span>
          <span className="text-accent">
            <GlobeIcon />
          </span>
        </span>
      ))}
    </>
  );
}

export function Works() {
  return (
    <section id="works" className="relative bg-bg py-10">
      <h2 className="sr-only">Businesses We&apos;ve Built</h2>
      <div aria-hidden="true">
        <Marquee
          gap="gap-8"
          speed={50}
          respectReducedMotion={false}
          pauseOnHover={false}
          className="border-y border-fg-16 py-6 text-fg-64"
        >
          <TickerContent />
        </Marquee>
      </div>

      <div className="relative">
        {works.map((work, i) => (
          <article
            key={work.name}
            className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden bg-surface"
            style={{ zIndex: i + 1 }}
          >
            <div className="absolute inset-0 bg-surface" aria-hidden="true" />

            <div className="relative grid grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-16">
              <Reveal className="flex flex-col justify-center gap-6">
                <h3 className="text-h3 font-medium tracking-tight text-fg">{work.name}</h3>
                <p className="max-w-md text-body text-fg-64">{work.description}</p>
                <div className="relative">
                  {work.url ? (
                    <ProjectLink href={work.url} label={`Visit the live ${work.name} website`}>
                      <WorkThumbnail work={work} index={i} />
                    </ProjectLink>
                  ) : (
                    <WorkThumbnail work={work} index={i} />
                  )}
                </div>
              </Reveal>

              <Reveal delayed className="flex flex-col justify-center gap-10 text-fg-64 lg:items-end lg:text-right">
                <div>
                  <p className="text-label uppercase text-fg-32">Industry</p>
                  {work.industry.map((item) => (
                    <p key={item} className="text-body-lg text-fg">
                      {item}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-label uppercase text-fg-32">Services</p>
                  {work.services.map((item) => (
                    <p key={item} className="text-body-lg text-fg">
                      {item}
                    </p>
                  ))}
                </div>
                <p className="text-label text-fg-32">{work.status}</p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
