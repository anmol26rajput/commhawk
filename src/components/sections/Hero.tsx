"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Container } from "@/components/layout/Container";
import { Appear } from "@/components/ui/Appear";
import { Button } from "@/components/ui/Button";
import { GridwaveBackground } from "@/components/ui/GridwaveBackground";
import { HeroWordmark } from "@/components/ui/HeroWordmark";
import { LightTunnelBackground } from "@/components/ui/LightTunnelBackground";
import { hero, type HeroBackgroundEffectId } from "@/data/content";

const HERO_LAYER_CLASS = "absolute inset-0 h-full w-full object-cover transition-opacity duration-700";
const AUTO_CYCLE_MS = 6000;

/**
 * Hero background cycles between two generative canvas effects (no video/
 * image asset dependency). `prefers-reduced-motion` freezes the active
 * canvas on its first frame (see useCanvasLoop).
 */
export function Hero() {
  const [effect, setEffect] = useState<HeroBackgroundEffectId>("gridwave");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ids = hero.backgroundEffects.map((item) => item.id);
    const id = setTimeout(() => {
      const nextIndex = (ids.indexOf(effect) + 1) % ids.length;
      setEffect(ids[nextIndex]);
    }, AUTO_CYCLE_MS);
    return () => clearTimeout(id);
  }, [effect]);

  return (
    <section
      id="top"
      data-theme="dark-scope"
      className="relative z-0 flex min-h-screen flex-col justify-end overflow-hidden pt-40 pb-10"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <GridwaveBackground
          active={effect === "gridwave"}
          className={clsx("hero-canvas", HERO_LAYER_CLASS, effect === "gridwave" ? "opacity-100" : "opacity-0")}
        />

        <LightTunnelBackground
          active={effect === "light-tunnel"}
          className={clsx("hero-canvas", HERO_LAYER_CLASS, effect === "light-tunnel" ? "opacity-100" : "opacity-0")}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-transparent to-bg/40" aria-hidden="true" />

      <Container className="flex flex-1 flex-col justify-between gap-16">
        <Appear className="space-y-2">
          {hero.backgroundEffects.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setEffect(item.id)}
              aria-pressed={effect === item.id}
              className={clsx(
                "block text-body transition-colors",
                effect === item.id ? "text-fg" : "text-fg-64 hover:text-fg-82"
              )}
            >
              <span className="text-fg-32">0{i + 1} /</span> {item.label.toUpperCase()}
            </button>
          ))}
        </Appear>

        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <HeroWordmark
            text={hero.wordmark}
            className="flex max-w-full items-end text-[clamp(2.25rem,11vw,9.5rem)] font-medium leading-[0.94] tracking-[-0.03em] text-fg"
          />

          <Appear delayed className="max-w-sm space-y-4 text-fg-82">
            <p className="text-label uppercase text-accent">{hero.tagline}</p>
            <p className="text-body-lg">{hero.description}</p>
            <Button href={hero.cta.href} variant="solid">
              {hero.cta.label}
            </Button>
          </Appear>
        </div>

        <Appear className="flex items-center justify-between text-label uppercase text-fg-64">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.available ? "Available for new projects" : "Currently booked"}
          </span>
          <span>© {new Date().getFullYear()}</span>
        </Appear>
      </Container>
    </section>
  );
}
