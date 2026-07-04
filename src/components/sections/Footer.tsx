import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { contact, footer, hero } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg pt-24 pb-10">
      <SectionGlow height={320} />
      <Container>
        <Reveal className="flex flex-col gap-16 border-t border-fg-16 pt-16 lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-6">
            <p className="text-label uppercase text-fg-64">Say hello</p>
            <a href={`mailto:${contact.email}`} className="text-h2 font-medium text-fg hover:text-accent break-all">
              {contact.email}
            </a>
            <p className="text-body text-fg-64">{footer.blurb}</p>
            <p className="text-label uppercase text-fg-32">{footer.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-16 sm:grid-cols-3">
            <div>
              <p className="text-label uppercase text-fg-32">Sitemap</p>
              <ul className="mt-4 flex flex-col gap-3">
                {footer.sitemap.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-body text-fg-64 hover:text-fg">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase text-fg-32">Expertise</p>
              <ul className="mt-4 flex flex-col gap-3">
                {footer.expertise.map((item) => (
                  <li key={item} className="text-body text-fg-64">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase text-fg-32">Socials</p>
              <ul className="mt-4 flex flex-col gap-3">
                {footer.socials.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-fg-64 hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center gap-6 overflow-hidden">
          <p
            className="pointer-events-none w-full max-w-full truncate text-center text-[14vw] leading-none font-medium tracking-tight select-none sm:text-[14vw] lg:text-[11rem]"
            style={{ WebkitTextStroke: "1px var(--color-fg-16)", color: "transparent" }}
            aria-hidden="true"
          >
            {hero.wordmark}
          </p>
          <a
            href="/"
            className="rounded-full border border-fg-32 px-6 py-3 text-label uppercase text-fg-64 hover:border-fg hover:text-fg"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-2 border-t border-fg-16 pt-6 text-label uppercase text-fg-32 sm:flex-row">
          <span>© {new Date().getFullYear()} {footer.wordmark}.</span>
          <span>Made with CommHawk Synapse</span>
        </div>
      </Container>
    </footer>
  );
}
