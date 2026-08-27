import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { officeTimeline } from "@/data/site";

const featuredTimeline = officeTimeline.filter((event) =>
  ["2010", "2019", "2020"].includes(event.year),
);

export function HomeTrajectory() {
  return (
    <section className="bg-brand-ivory" aria-labelledby="home-trajectory-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeading
            id="home-trajectory-title"
            eyebrow="Trajetória"
            title="Uma história em movimento desde 2010."
            description="Alguns dos marcos registrados pelo escritório ao longo de sua presença no Distrito Federal."
          />
          <Reveal delay={0.1}>
            <Link
              href="/escritorio"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
            >
              Ver trajetória completa
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <ol className="relative border-l border-primary/30 lg:col-span-7 lg:col-start-6">
          {featuredTimeline.map((event, index) => (
            <li key={event.year} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[5px] size-2.5 rounded-full bg-primary ring-4 ring-brand-ivory"
              />
              <Reveal delay={index * 0.05}>
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
  );
}
