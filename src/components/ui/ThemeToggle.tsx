"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reads state set by the pre-hydration blocking script in <head> (see
    // src/lib/theme.ts). This can only be known on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.setAttribute("data-theme", next ? "light" : "dark");
    localStorage.setItem(THEME_STORAGE_KEY, next ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className="relative flex h-8 w-8 items-center justify-center text-fg"
    >
      <span className="sr-only">Toggle theme</span>
      {mounted && (
        <motion.svg
          key={isLight ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          {isLight ? (
            <>
              <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M9 0.5V3M9 15V17.5M17.5 9H15M3 9H0.5M15.02 2.98L13.19 4.81M4.81 13.19L2.98 15.02M15.02 15.02L13.19 13.19M4.81 4.81L2.98 2.98"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <path
              d="M16 10.5A7.5 7.5 0 1 1 7.5 2a6 6 0 0 0 8.5 8.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          )}
        </motion.svg>
      )}
    </button>
  );
}
