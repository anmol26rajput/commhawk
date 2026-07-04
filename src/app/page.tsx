import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Works } from "@/components/sections/Works";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Careers } from "@/components/sections/Careers";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1">
        <Hero />
        <Works />
        <Services />
        <Process />
        <About />
        <Brands />
        <Careers />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
