import { clsx } from "clsx";

/** CommHawk's real brand mark (cropped from the site's logo-trans.png, wordmark removed). */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed brand-color raster mark, not a themable currentColor SVG.
    <img
      src="/commhawk-mark.png"
      alt="CommHawk"
      className={clsx("object-contain", className)}
    />
  );
}
