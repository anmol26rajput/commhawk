import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { brands, recognitions } from "@/data/content";

/** Tech stack CommHawk builds on, plus official recognitions/endorsements (real badge images). */
export function Brands() {
  return (
    <section className="relative overflow-hidden bg-bg py-32">
      <SectionGlow />
      <Container>
        <Reveal>
          <SectionLabel index="05">Recognized By</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recognitions.map((item, i) => (
            <Reveal
              key={item.name}
              delayed={i % 2 === 1}
              className="flex aspect-[4/3] items-center justify-center rounded-card bg-white p-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- fixed external badge artwork, not a themable/optimizable local asset. */}
              <img src={item.src} alt={item.name} className="h-full w-full object-contain" />
            </Reveal>
          ))}
        </div>

        <Reveal delayed className="mt-16">
          <SectionLabel index="06">Tools We Build With</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 border-t border-l border-fg-16 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand, i) => (
            <Reveal
              key={brand}
              delayed={i % 2 === 1}
              className="flex aspect-[4/3] items-center justify-center border-r border-b border-fg-16 p-6 text-center"
            >
              <span className="text-body-lg font-medium text-fg-64">{brand}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
