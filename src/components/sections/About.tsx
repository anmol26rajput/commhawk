import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/WordReveal";
import { about } from "@/data/content";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-32">
      <SectionGlow />
      <Container>
        <Reveal>
          <SectionLabel index="03">Who We Are</SectionLabel>
        </Reveal>

        <WordReveal
          as="h2"
          text={about.heading}
          className="mt-8 max-w-3xl text-h3 font-medium leading-snug"
        />

        <Reveal delayed className="mt-8 max-w-2xl text-body-lg text-fg-64">
          {about.vision}
        </Reveal>

        <div className="mt-24 border-t border-fg-16 pt-10">
          <Reveal as="h3" className="text-label uppercase text-fg-64">
            Core Competencies
          </Reveal>
          <ul className="mt-6 divide-y divide-fg-16">
            {about.competencies.map((item, i) => (
              <Reveal
                as="li"
                delayed={i % 2 === 1}
                key={item.name}
                className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center"
              >
                <span className="text-body-lg text-fg">{item.name}</span>
                <span className="text-body text-fg-64">{item.tag}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
