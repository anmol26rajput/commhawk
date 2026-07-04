import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { process } from "@/data/content";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-bg py-32">
      <SectionGlow />
      <Container>
        <Reveal as="h2" className="max-w-2xl text-h2 font-medium text-fg">
          {process.heading}
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-fg-16 pt-12 sm:grid-cols-3">
          {process.capabilities.map((item, i) => (
            <Reveal key={item.step} delayed={i % 2 === 1} className="flex flex-col gap-4">
              <span className="text-label text-accent">{item.step}</span>
              <h3 className="text-body-lg font-medium text-fg">{item.title}</h3>
              <p className="text-body text-fg-64">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
