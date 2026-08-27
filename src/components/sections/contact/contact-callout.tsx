import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteContact } from "@/data/site";

type ContactCalloutProps = Readonly<{
  title?: string;
  description?: string;
}>;

export function ContactCallout({
  title = "Como podemos ajudar?",
  description = "Entre em contato pelos canais oficiais para apresentar sua necessidade ao escritório.",
}: ContactCalloutProps) {
  return (
    <section
      aria-labelledby="contact-callout-title"
      className="bg-primary text-primary-foreground"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[1fr_auto] lg:px-10">
        <Reveal direction="left" className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary-foreground/70 uppercase">
            Atendimento
          </p>
          <h2
            id="contact-callout-title"
            className="mt-3 font-serif text-3xl font-semibold tracking-[-0.025em] sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-primary-foreground/75">
            {description}
          </p>
        </Reveal>

        <Reveal
          direction="right"
          delay={0.08}
          className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="bg-brand-ink text-foreground hover:bg-secondary hover:text-foreground"
          >
            <Link href="/contato">
              Falar com o escritório
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border border-primary-foreground/40 bg-transparent text-primary-foreground shadow-none hover:border-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href={siteContact.phone.href}>
              <Phone aria-hidden="true" />
              {siteContact.phone.label}
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-2">
          <a
            href={siteContact.email.href}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm text-primary-foreground/75 underline decoration-primary-foreground/40 underline-offset-4 hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Mail aria-hidden="true" className="size-4" />
            {siteContact.email.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
