import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.commhawk.in";
const siteName = "CommHawk - Engineering Digital Excellence";
const siteDescription =
  "CommHawk is a premier technology partner specializing in high-performance digital products. We help ambitious companies scale through cutting-edge development and innovative AI solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s · CommHawk",
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Blocking, pre-hydration: sets data-theme before first paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <a
          href="#main-content"
          className="fixed top-2 left-2 z-[60] -translate-y-24 rounded-btn bg-accent px-4 py-2 text-label text-bg transition-transform duration-300 focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <CustomCursor />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
