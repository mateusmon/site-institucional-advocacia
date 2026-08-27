import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { siteContact } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contato e localização",
  description:
    "Entre em contato com o Ravanelli & Roseno por telefone ou e-mail. Consulte os endereços das unidades em Brasília e Taguatinga, no Distrito Federal.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Contato"
        title="Converse com o escritório pelos canais oficiais."
        description="Escolha o canal mais conveniente para apresentar sua necessidade à equipe do Ravanelli & Roseno."
      />

      <section className="bg-background" aria-labelledby="contact-title">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <SectionHeading
            id="contact-title"
            eyebrow="Atendimento"
            title="Como entrar em contato"
            description="Telefone e e-mail são os canais de atendimento confirmados no site institucional do escritório."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal direction="left" className="h-full">
              <a
                href={siteContact.phone.href}
                className="group flex min-h-48 flex-col justify-between border border-border bg-brand-ivory p-7 transition-[border-color,background-color] hover:border-primary/50 hover:bg-accent sm:p-8"
              >
                <Phone aria-hidden="true" className="size-7 text-primary" />
                <span className="mt-8">
                  <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    Telefone
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-4 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {siteContact.phone.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal direction="right" delay={0.06} className="h-full">
              <a
                href={siteContact.email.href}
                className="group flex min-h-48 flex-col justify-between border border-border bg-brand-ivory p-7 transition-[border-color,background-color] hover:border-primary/50 hover:bg-accent sm:p-8"
              >
                <Mail aria-hidden="true" className="size-7 text-primary" />
                <span className="mt-8 min-w-0">
                  <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    E-mail
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-4 font-serif text-lg font-semibold break-all text-foreground sm:text-xl lg:text-2xl">
                    {siteContact.email.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-brand-ivory" aria-labelledby="locations-title">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <SectionHeading
            id="locations-title"
            eyebrow="Localização"
            title="Unidades no Distrito Federal"
            description="Consulte o endereço de cada unidade e abra a localização em um serviço externo de mapas."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {siteContact.offices.map((office, index) => (
              <Reveal key={office.name} delay={index * 0.06} className="h-full">
                <article className="h-full border border-border bg-card p-7 sm:p-9">
                  <MapPin aria-hidden="true" className="size-7 text-primary" />
                  <h3 className="mt-7 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
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
                    className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:text-brand-teal"
                  >
                    Abrir no Google Maps
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex items-start gap-4 border border-primary/20 bg-accent p-6 sm:p-7">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-6 shrink-0 text-primary"
              />
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Atenção a contatos suspeitos
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  O escritório informa que não solicita pagamentos para liberação
                  de valores. Em caso de dúvida, confirme o contato pelo telefone
                  ou e-mail apresentados nesta página.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
