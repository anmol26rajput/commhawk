import { clsx } from "clsx";
import { Logo } from "@/components/ui/Logo";

/**
 * Decorative top-of-section treatment used on every section after the
 * "Businesses" ticker: a soft accent-colored glow washing down from the
 * top edge, plus a small faint logo mark. Rendered as the first child so
 * it paints behind the section's own content without needing z-index
 * (later siblings paint on top by default).
 */
const DEFAULT_HEIGHT = 720;

// Pixel-based stops on a plain vertical linear-gradient — not a radial
// ellipse, whose "no color until N px down" distance depends on a computed
// radius rather than the container height, making it unpredictable — so the
// dead-zone length here is exact. Stops are expressed as fractions of
// `height` so shorter overrides (Contact, Footer) keep the same proportions
// instead of a fixed-pixel gradient getting squeezed. ~36% of the height
// stays fully transparent before any color appears, so no section boundary
// ever sits next to a visible change; peak intensity is deliberately low
// (6%) so it reads as ambient light, not a colored band.
function buildGlowBackground(height: number) {
  const deadZone = height * 0.36;
  const rampStart = height * 0.56;
  const peak = height * 0.67;
  const rampEnd = height * 0.8;
  return `linear-gradient(
    to bottom,
    transparent 0px,
    transparent ${deadZone}px,
    color-mix(in srgb, var(--color-accent) 3%, transparent) ${rampStart}px,
    color-mix(in srgb, var(--color-accent) 6%, transparent) ${peak}px,
    color-mix(in srgb, var(--color-accent) 3%, transparent) ${rampEnd}px,
    transparent ${height}px
  )`;
}

export function SectionGlow({ className, height = DEFAULT_HEIGHT }: { className?: string; height?: number }) {
  return (
    <div
      className={clsx("pointer-events-none absolute inset-x-0 top-0", className)}
      style={{ height }}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ background: buildGlowBackground(height) }} />
      <Logo className="absolute top-10 left-6 h-8 w-8 opacity-[0.16] sm:left-10 lg:left-16" />
    </div>
  );
}
