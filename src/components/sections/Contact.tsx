"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { contact } from "@/data/content";

function PillGroup({
  options,
  selected,
  onSelect,
  label,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className="text-label uppercase text-fg-64">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected === option}
            onClick={() => onSelect(option)}
            className={clsx(
              "rounded-full border px-4 py-2 text-label transition-colors duration-300",
              selected === option
                ? "border-accent bg-accent text-bg"
                : "border-fg-32 text-fg-64 hover:border-fg hover:text-fg",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState<string | null>(null);
  const [details, setDetails] = useState("");

  const isValid = name.trim() !== "" && /\S+@\S+\.\S+/.test(email) && details.trim() !== "";

  const mailtoHref = useMemo(() => {
    const subject = `New project inquiry from ${name || "website"}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      interest ? `Interested in: ${interest}` : null,
      "",
      details,
    ].filter(Boolean);
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n"),
    )}`;
  }, [name, email, company, interest, details]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    window.location.href = mailtoHref;
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-bg py-32">
      <SectionGlow height={520} />
      <Container>
        <Reveal as="h2" className="max-w-xl text-h2 font-medium text-fg">
          {contact.heading}
        </Reveal>

        <form onSubmit={handleSubmit} className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-label uppercase text-fg-64">
                Your Name*
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-btn border border-fg-32 bg-transparent px-4 py-3 text-body normal-case text-fg outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2 text-label uppercase text-fg-64">
                Email Address*
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-btn border border-fg-32 bg-transparent px-4 py-3 text-body normal-case text-fg outline-none focus:border-accent"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-label uppercase text-fg-64">
              Company (Optional)
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded-btn border border-fg-32 bg-transparent px-4 py-3 text-body normal-case text-fg outline-none focus:border-accent"
              />
            </label>

            <PillGroup
              label="You are interested in"
              options={contact.interests}
              selected={interest}
              onSelect={setInterest}
            />
          </Reveal>

          <Reveal delayed className="flex flex-col gap-6">
            <label className="flex flex-1 flex-col gap-2 text-label uppercase text-fg-64">
              Project Details*
              <textarea
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={8}
                className="flex-1 resize-none rounded-btn border border-fg-32 bg-transparent px-4 py-3 text-body normal-case text-fg outline-none focus:border-accent"
              />
            </label>
            <Button type="submit" variant="solid" disabled={!isValid} className="w-full sm:w-fit">
              Send Message
            </Button>
          </Reveal>
        </form>
      </Container>
    </section>
  );
}
