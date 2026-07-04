"use client";

import { useCallback } from "react";
import { useCanvasLoop } from "@/lib/useCanvasLoop";

const ACCENT = "#2e8bff";
const ACCENT_RGB = "46, 139, 255";

type Star = { x: number; y: number; size: number; twinklePhase: number };

const STAR_COUNT = 120;
const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: 0.5 + Math.random() * 1.3,
  twinklePhase: Math.random() * Math.PI * 2,
}));

// Cheap deterministic pseudo-noise (no Math.random in the render loop) used
// to jitter dots along each row so they read as scattered particles rather
// than a perfectly smooth plotted curve.
function hash(n: number) {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

const ROWS = 46;

/**
 * One of the hero's two switchable background effects: dotted wave ridges
 * receding into a starfield, each row a sine path plotted as particles
 * (dense/bright near camera, sparse/dim near the horizon) instead of a
 * stroked line.
 */
export function GridwaveBackground({ active, className }: { active: boolean; className?: string }) {
  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, elapsedMs: number) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    if (width === 0 || height === 0) return;

    const t = elapsedMs / 1000;
    const horizonY = height * 0.4;

    ctx.fillStyle = ACCENT;
    for (const star of stars) {
      const twinkle = 0.5 + Math.abs(Math.sin(t * 0.6 + star.twinklePhase)) * 0.5;
      ctx.globalAlpha = twinkle * 0.7;
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * horizonY, star.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = ACCENT;
    for (let r = 0; r < ROWS; r++) {
      const p = r / (ROWS - 1); // 0 = far/horizon, 1 = near/camera
      const depth = Math.pow(p, 1.8);
      const baseY = horizonY + depth * (height - horizonY);
      const amplitude = 6 + depth * 34;
      const phase = r * 0.45;
      const freq = 0.008 + (r % 3) * 0.002;
      const dotSpacing = Math.max(9 - depth * 6, 2.5);
      const size = 0.5 + depth * 1.4;
      const alpha = 0.1 + depth * 0.6;

      ctx.globalAlpha = alpha;
      for (let x = 0; x <= width; x += dotSpacing) {
        const wave = Math.sin(x * freq + phase + t * 0.5) * amplitude;
        const jitter = (hash(x * 0.37 + r * 91.7) - 0.5) * (3 + depth * 5);
        const y = baseY + wave + jitter;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const glow = ctx.createRadialGradient(width * 0.5, horizonY, 0, width * 0.5, horizonY, width * 0.3);
    glow.addColorStop(0, `rgba(${ACCENT_RGB}, 0.12)`);
    glow.addColorStop(1, `rgba(${ACCENT_RGB}, 0)`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }, []);

  const canvasRef = useCanvasLoop(active, draw);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
