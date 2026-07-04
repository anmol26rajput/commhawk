"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { faq } from "@/data/content";

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M8 1V15" stroke="currentColor" strokeWidth="1.5" className={clsx("origin-center transition-transform duration-300", open && "scale-y-0")} />
      <path d="M1 8H15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-bg py-32">
      <SectionGlow />
      <Container>
        <Reveal as="h2" className="max-w-xl text-h2 font-medium text-fg">
          Frequently asked questions
        </Reveal>

        <div className="mt-16 divide-y divide-fg-16 border-t border-fg-16">
          {faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal as="div" key={item.question} delayed={i % 2 === 1}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-8 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-label text-fg-32">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-body-lg text-fg">{item.question}</span>
                  </span>
                  <PlusMinusIcon open={open} />
                </button>
                <div
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-500 ease-framer-spring",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 pl-11 text-body text-fg-64">{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
