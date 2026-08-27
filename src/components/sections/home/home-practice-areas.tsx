import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { practiceAreas } from "@/data/site";

const featuredPracticeAreas = practiceAreas.slice(0, 6);

export function HomePracticeAreas() {
  return (
    <section className="bg-brand-ivory" aria-labelledby="home-practice-title">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            id="home-practice-title"
            eyebrow="Áreas de atuação"
            title="Conhecimento jurídico para diferentes contextos."
            description="Uma estrutura full service dedicada ao estudo e à condução de demandas em diferentes áreas do Direito."
          />
          <Reveal direction="right">
            <Link
              href="/areas-de-atuacao"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
            >
              Ver todas as áreas
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featuredPracticeAreas.map((area, index) => (
            <li key={area} className="group min-h-48 bg-card p-7 sm:p-8">
              <Reveal delay={(index % 3) * 0.05} className="h-full">
                <div className="flex h-full flex-col justify-between gap-10">
                  <span className="font-serif text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="max-w-xs font-serif text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {area}
                  </h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
