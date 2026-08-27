import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeFaqs } from "@/data/site";

export function HomeFaq() {
  return (
    <section className="bg-brand-ink" aria-labelledby="home-faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeading
            id="home-faq-title"
            eyebrow="Dúvidas frequentes"
            title="Informações para o primeiro contato."
            description="Respostas institucionais para compreender o modelo de atuação e os canais do escritório."
          />
          <Reveal delay={0.08}>
            <Link
              href="/contato"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
            >
              Falar com o escritório
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="border-t border-border lg:col-span-7 lg:col-start-6">
          {homeFaqs.map((item, index) => (
            <Reveal key={item.question} delay={(index % 2) * 0.04}>
              <details className="group border-b border-border">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left marker:content-none">
                  <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
                    {item.question}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-7 pr-10 text-sm leading-7 text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
