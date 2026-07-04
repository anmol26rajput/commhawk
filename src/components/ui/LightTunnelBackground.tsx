"use client";

import { useCallback } from "react";
import { useCanvasLoop } from "@/lib/useCanvasLoop";

const ACCENT = "#2e8bff";
const ACCENT_RGB = "46, 139, 255";

type WarpStreak = {
  angle: number;
  cycleDuration: number; // seconds for one outward trip
  phase: number; // 0-1 offset into the loop, staggers streaks
  length: number;
};

const STREAK_COUNT = 140;
const streaks: WarpStreak[] = Array.from({ length: STREAK_COUNT }, () => ({
  angle: Math.random() * Math.PI * 2,
  cycleDuration: 2.5 + Math.random() * 3,
  phase: Math.random(),
  length: 10 + Math.random() * 26,
}));

/**
 * One of the hero's two switchable background effects: streaking particles
 * that accelerate outward from a center point — a warp-speed tunnel-of-light
 * feel with actual forward motion.
 */
export function LightTunnelBackground({ active, className }: { active: boolean; className?: string }) {
  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, elapsedMs: number) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    if (width === 0 || height === 0) return;

    const t = elapsedMs / 1000;
    const cx = width * 0.5;
    const cy = height * 0.46;
    const maxR = Math.hypot(width, height) * 0.62;

    ctx.strokeStyle = ACCENT;
    ctx.lineCap = "round";

    for (const streak of streaks) {
      const p = (t / streak.cycleDuration + streak.phase) % 1;
      const eased = p * p; // accelerate outward for a warp feel
      const r = eased * maxR;
      const prevR = Math.max(r - streak.length * (0.4 + eased * 1.6), 0);

      const alpha = Math.min(1, p * 3) * (1 - p) * 0.9; // fade in, then out
      if (alpha <= 0.02) continue;

      const cos = Math.cos(streak.angle);
      const sin = Math.sin(streak.angle);

      ctx.globalAlpha = alpha;
      ctx.lineWidth = 0.6 + eased * 2.2;
      ctx.beginPath();
      ctx.moveTo(cx + cos * prevR, cy + sin * prevR);
      ctx.lineTo(cx + cos * r, cy + sin * r);
      ctx.stroke();
    }

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.35);
    glow.addColorStop(0, `rgba(${ACCENT_RGB}, 0.55)`);
    glow.addColorStop(1, `rgba(${ACCENT_RGB}, 0)`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }, []);

  const canvasRef = useCanvasLoop(active, draw);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
