import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ContactCallout } from "@/components/sections/contact/contact-callout";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { practiceAreas } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Áreas de atuação",
  description:
    "Conheça as áreas de atuação jurídica do Ravanelli & Roseno, com orientação preventiva e atuação judicial, administrativa, extrajudicial e arbitral.",
  path: "/areas-de-atuacao",
});

export default function PracticeAreasPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Áreas de atuação"
        title="Conhecimento jurídico para diferentes necessidades."
        description="Uma estrutura full service dedicada à orientação preventiva e à atuação judicial, administrativa, extrajudicial e arbitral."
      />

      <section className="bg-background" aria-labelledby="practice-areas-title">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading
              id="practice-areas-title"
              eyebrow="Atuação multidisciplinar"
              title="Áreas atendidas pelo escritório"
            />
            <Reveal direction="right" className="lg:justify-self-end">
              <p className="max-w-xl text-base leading-8 text-muted-foreground lg:text-lg">
                A amplitude de atuação permite analisar demandas sob diferentes
                perspectivas e direcionar cada assunto à disciplina jurídica
                correspondente.
              </p>
            </Reveal>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, index) => (
              <li key={area} className="group min-h-44 bg-card p-7 sm:p-8">
                <Reveal delay={(index % 3) * 0.05} className="h-full">
                  <div className="flex h-full flex-col justify-between gap-8">
                    <span className="font-serif text-sm font-semibold text-brand-teal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="max-w-xs font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {area}
                    </h3>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <div className="mt-10 flex flex-col gap-4 border-l-2 border-brand-teal bg-brand-ivory p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Para entender qual frente se relaciona à sua necessidade,
                apresente o contexto diretamente ao escritório.
              </p>
              <Link
                href="/contato"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-primary hover:text-brand-teal"
              >
                Solicitar atendimento
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCallout
        title="Precisa de orientação jurídica?"
        description="Entre em contato para que o escritório conheça o contexto da sua demanda e indique o próximo passo adequado."
      />
    </main>
  );
}
