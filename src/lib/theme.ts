export const THEME_STORAGE_KEY = "theme";

/**
 * Runs synchronously before paint (inlined as a blocking script in <head>)
 * so the correct theme is set before first render — avoids a flash of the
 * wrong theme. A theme the user picked via the toggle (stored in
 * localStorage) always wins; absent that, the OS/browser's
 * `prefers-color-scheme` decides, falling back to dark if neither is
 * available.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;
