import type { Metadata } from "next";
import { CalendarDays, FileText } from "lucide-react";

import { ContactCallout } from "@/components/sections/contact/contact-callout";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { archivedPublications } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Conteúdos jurídicos",
  description:
    "Conheça referências do acervo de publicações jurídicas do Ravanelli & Roseno Advogados Associados, preservadas com suas datas originais.",
  path: "/conteudos",
});

export default function ContentPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Conteúdos"
        title="Informação jurídica com contexto e clareza."
        description="Publicações institucionais preservadas do acervo anterior do escritório."
      />

      <section className="bg-background" aria-labelledby="content-title">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <SectionHeading
              id="content-title"
              eyebrow="Arquivo"
              title="Publicações anteriores"
              description="Referências do acervo institucional, preservadas com seus títulos e datas originais."
            />
            <Reveal direction="right" className="lg:justify-self-end">
              <p className="max-w-xl border-l-2 border-brand-teal pl-5 text-sm leading-7 text-muted-foreground">
                Conteúdo informativo não substitui a análise jurídica individual
                de cada situação.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {archivedPublications.map((publication, index) => (
              <Reveal
                key={publication.title}
                delay={index * 0.06}
                className="h-full"
              >
                <article className="flex min-h-72 flex-col border border-border bg-brand-ivory p-7 sm:p-8">
                  <FileText aria-hidden="true" className="size-7 text-primary" />
                  <p className="mt-8 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
                    Publicação do acervo
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-foreground">
                    {publication.title}
                  </h3>
                  <p className="mt-auto flex items-center gap-2 pt-8 text-sm text-muted-foreground">
                    <CalendarDays aria-hidden="true" className="size-4" />
                    <time dateTime={publication.dateTime}>
                      {publication.date}
                    </time>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCallout
        title="Procura orientação para uma situação específica?"
        description="Os conteúdos têm caráter geral. Para uma análise individual, utilize os canais oficiais do escritório."
      />
    </main>
  );
}
