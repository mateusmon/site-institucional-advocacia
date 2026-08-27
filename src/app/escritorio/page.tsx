import type { Metadata } from "next";
import Image from "next/image";

import { ContactCallout } from "@/components/sections/contact/contact-callout";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { officePrinciples, officeTimeline } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "O escritório",
  description:
    "Conheça a trajetória, os princípios e a atuação full service do Ravanelli & Roseno Advogados Associados, fundado em 2010 no Distrito Federal.",
  path: "/escritorio",
});

export default function OfficePage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="O escritório"
        title="Uma trajetória construída com rigor e proximidade."
        description="Desde 2010, o Ravanelli & Roseno desenvolve uma advocacia full service pautada pela ética, pela qualidade técnica e pela atuação preventiva."
        image="/images/recepcao-enhanced.webp"
        imageAlt="Recepção do escritório Ravanelli & Roseno"
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Quem somos"
            title="Advocacia abrangente, com atenção a cada contexto."
            className="lg:col-span-5"
          />
          <Reveal
            direction="right"
            className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-7"
          >
            <p>
              O Ravanelli &amp; Roseno Advogados Associados reúne profissionais
              dedicados à prestação de serviços jurídicos e mantém unidades em
              Brasília e Taguatinga, no Distrito Federal.
            </p>
            <p>
              Sua atuação valoriza o rigor e a eficácia das prestações
              profissionais, com atenção especial à orientação preventiva e ao
              respeito às normas éticas da advocacia.
            </p>
            <p>
              O escritório também informa contar com correspondentes em Goiás,
              Tocantins, Minas Gerais, Rio de Janeiro e São Paulo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-ivory" aria-labelledby="principles-title">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <SectionHeading
            id="principles-title"
            eyebrow="Princípios"
            title="O que orienta nossa atuação"
            description="Diretrizes institucionais preservadas do escritório e organizadas para uma leitura mais clara."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
            {officePrinciples.map((principle, index) => (
              <Reveal
                key={principle.title}
                delay={index * 0.06}
                className="h-full"
              >
                <article className="h-full bg-card p-7 sm:p-9">
                  <p className="font-serif text-sm font-semibold text-brand-teal">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-8 font-serif text-2xl font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background" aria-labelledby="trajectory-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-4">
            <SectionHeading
              id="trajectory-title"
              eyebrow="Trajetória"
              title="Marcos da nossa história"
              description="Uma síntese dos acontecimentos registrados pelo escritório desde sua inauguração."
            />
            <Reveal
              direction="left"
              className="relative mt-10 hidden aspect-[4/5] overflow-hidden bg-muted lg:block"
            >
              <Image
                src="/images/sala-de-reuniao-enhanced.webp"
                alt="Sala de reunião do escritório Ravanelli & Roseno"
                fill
                sizes="340px"
                className="object-cover"
              />
            </Reveal>
          </div>

          <ol className="relative border-l border-primary/25 lg:col-span-7 lg:col-start-6">
            {officeTimeline.map((event) => (
              <li key={event.year} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[5px] size-2.5 rounded-full bg-primary ring-4 ring-background"
                />
                <Reveal delay={0.04}>
                  <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
                    {event.year}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                    {event.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactCallout title="Converse com o escritório" />
    </main>
  );
}
