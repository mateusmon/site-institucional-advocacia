import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteContact } from "@/data/site";

export function HomeLocations() {
  return (
    <section className="bg-brand-ivory" aria-labelledby="home-locations-title">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            id="home-locations-title"
            eyebrow="Localização"
            title="Duas unidades no Distrito Federal."
            description="Consulte os endereços da sede em Brasília e da filial em Taguatinga."
          />
          <Reveal direction="right">
            <Link
              href="/contato"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
            >
              Ver página de contato
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {siteContact.offices.map((office, index) => (
            <Reveal key={office.name} delay={index * 0.06} className="h-full">
              <article className="h-full border border-border bg-card p-7 sm:p-9">
                <div className="flex items-center justify-between gap-5">
                  <MapPin aria-hidden="true" className="size-7 text-primary" />
                  <span className="font-serif text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                  {office.name}
                </h3>
                <address className="mt-5 space-y-1 text-base leading-7 text-muted-foreground not-italic">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={office.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
                >
                  Abrir no Google Maps
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
