import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { careers } from "@/data/content";

export function Careers() {
  return (
    <section className="relative overflow-hidden bg-bg pt-44 pb-32">
      <SectionGlow />
      <Container>
        <Reveal>
          <SectionLabel index="04">Careers</SectionLabel>
        </Reveal>

        <Reveal as="h2" className="mt-8 max-w-2xl text-h2 font-medium text-fg">
          {careers.heading}
        </Reveal>

        <Reveal delayed className="mt-6 max-w-xl text-body-lg text-fg-64">
          {careers.intro}
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-fg-16 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {careers.values.map((item, i) => (
            <Reveal key={item.title} delayed={i % 2 === 1} className="flex flex-col gap-3">
              <h3 className="text-body-lg font-medium text-fg">{item.title}</h3>
              <p className="text-body text-fg-64">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col gap-6 rounded-card border border-fg-16 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-label uppercase text-fg-32">Open Position</p>
            <h3 className="mt-2 text-body-lg font-medium text-fg">{careers.opening.title}</h3>
            <p className="mt-1 text-body text-fg-64">{careers.opening.type}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {careers.opening.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-fg-32 px-3 py-1 text-label uppercase text-fg-64"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Button href="/#contact" variant="outline" className="w-fit shrink-0">
            Reach Out
          </Button>
        </Reveal>

        <Reveal delayed className="mt-10 max-w-xl text-body text-fg-64">
          {careers.outro}
        </Reveal>
      </Container>
    </section>
  );
}
