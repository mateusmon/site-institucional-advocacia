import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

type PageHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}>;

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <header className="relative isolate overflow-hidden bg-brand-ink text-foreground">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-1/3 border-l border-border/60 bg-brand-teal/[0.025]"
      />
      <div
        className={
          image
            ? "mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24"
            : "mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
        }
      >
        <Reveal
          direction="left"
          className={image ? "lg:col-span-7" : "max-w-4xl"}
        >
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand-teal uppercase sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-brand-teal" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70 sm:text-xl sm:leading-9">
            {description}
          </p>
        </Reveal>

        {image && (
          <Reveal
            direction="right"
            delay={0.1}
            className="relative lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className="absolute -top-4 -right-4 h-full w-full border border-brand-teal/50"
            />
            <div className="relative aspect-[4/3] overflow-hidden bg-card lg:aspect-[4/3]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                preload
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 38vw, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
