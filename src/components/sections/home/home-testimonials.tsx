import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { publishedTestimonials } from "@/data/site";

export function HomeTestimonials() {
  return (
    <section className="bg-background" aria-labelledby="home-testimonials-title">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading
          id="home-testimonials-title"
          eyebrow="Relacionamentos"
          title="Relatos publicados por clientes do escritório."
          description="Depoimentos preservados do site institucional anterior, apresentados de forma resumida."
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {publishedTestimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.organization}
              delay={index * 0.07}
              className="h-full"
            >
              <figure className="flex h-full flex-col border border-border bg-card p-7 sm:p-9 lg:p-10">
                <Quote aria-hidden="true" className="size-8 text-primary" />
                <blockquote className="mt-8">
                  <p className="font-serif text-2xl leading-relaxed font-medium text-foreground sm:text-3xl">
                    “{testimonial.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-auto border-t border-border pt-7 text-sm font-semibold tracking-[0.1em] text-primary uppercase">
                  {testimonial.organization}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
