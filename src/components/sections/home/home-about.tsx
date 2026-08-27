import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function HomeAbout() {
  return (
    <section className="bg-background" aria-labelledby="home-about-title">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
        <Reveal direction="left" className="relative lg:col-span-5">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-full w-full border border-primary/25"
          />
          <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-[4/5]">
            <Image
              src="/images/recepcao-enhanced.webp"
              alt="Recepção do escritório Ravanelli & Roseno"
              fill
              sizes="(min-width: 1280px) 430px, (min-width: 1024px) 38vw, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 border-l border-t border-border bg-brand-ink px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
              Trajetória
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
              Desde 2010
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            id="home-about-title"
            eyebrow="O escritório"
            title="Uma advocacia construída com princípios e proximidade."
            description="O Ravanelli & Roseno Advogados Associados atua em diferentes áreas do Direito, com unidades em Brasília e Taguatinga."
          />

          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                O escritório pauta sua atividade pelo rigor, pela eficácia das
                prestações profissionais e pelo respeito às normas éticas da
                advocacia.
              </p>
              <p>
                A orientação preventiva integra essa forma de trabalho, com o
                objetivo de compreender riscos e apoiar decisões antes que os
                conflitos se intensifiquem.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <Link
              href="/escritorio"
              className="mt-9 inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
            >
              Conhecer nossa história
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
