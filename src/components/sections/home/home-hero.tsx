import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { homeHero } from "@/data/site";

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden bg-brand-ivory"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[31%] border-l border-primary/10 bg-card/40 lg:block"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
        <div className="lg:col-span-7 lg:pr-4">
          <Reveal direction="left">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-primary uppercase sm:text-sm">
              <span aria-hidden="true" className="h-px w-8 bg-brand-teal" />
              {homeHero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              id="home-hero-title"
              className="max-w-4xl font-serif text-[2.55rem] leading-[1.04] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[4.25rem]"
            >
              {homeHero.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {homeHero.description}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={homeHero.primaryAction.href}>
                  {homeHero.primaryAction.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href={homeHero.secondaryAction.href}>
                  {homeHero.secondaryAction.label}
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <dl className="mt-12 grid max-w-xl grid-cols-2 border-t border-primary/20 pt-6 sm:mt-14">
              {homeHero.facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={
                    index === 1
                      ? "border-l border-primary/20 pl-6"
                      : "pr-6"
                  }
                >
                  <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-serif text-xl font-semibold text-foreground sm:text-2xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal
          direction="right"
          delay={0.12}
          className="relative mx-auto w-full max-w-xl lg:col-span-5 lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 h-full w-full border border-primary/30 sm:-top-6 sm:-right-6"
          />
          <div className="relative aspect-[4/3] overflow-hidden bg-muted shadow-[0_24px_60px_rgba(0,0,0,0.48)] lg:aspect-[4/5]">
            <Image
              src={homeHero.image.src}
              alt={homeHero.image.alt}
              fill
              preload
              sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, (min-width: 640px) 576px, calc(100vw - 40px)"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 bg-brand-teal"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
