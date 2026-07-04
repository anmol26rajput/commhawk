import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Careers } from "@/components/sections/Careers";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join CommHawk — an elite team of engineers, designers, and strategists building digital products that define the next generation of technology.",
};

export default function CareersPage() {
  return (
    <>
      <Nav hasHero={false} />
      <main id="main-content" className="flex-1">
        <Careers />
      </main>
      <Footer />
    </>
  );
}
