import type { Metadata } from "next";
import Image from "next/image";

import { ContactCallout } from "@/components/sections/contact/contact-callout";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { teamMembers } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Equipe",
  description:
    "Conheça os sócios advogados Bruno Ravanelli e Jefferson Roseno, suas formações, registros profissionais e áreas de experiência.",
  path: "/equipe",
});

export default function TeamPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Equipe"
        title="Experiência profissional com atuação próxima."
        description="Conheça os sócios advogados apresentados nos canais institucionais do Ravanelli & Roseno."
      />

      <section className="bg-brand-ivory" aria-labelledby="team-title">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <SectionHeading
            id="team-title"
            eyebrow="Sócios"
            title="Profissionais do escritório"
            description="Formações e registros reproduzidos a partir das informações institucionais publicadas pelo escritório."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {teamMembers.map((member) => (
              <Reveal
                key={member.name}
                direction="up"
                className="h-full"
              >
                <article className="grid h-full overflow-hidden border border-border bg-card sm:grid-cols-[minmax(190px,0.8fr)_1.2fr]">
                  <div className="relative min-h-80 bg-muted sm:min-h-full">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 250px, (min-width: 640px) 38vw, calc(100vw - 40px)"
                      className="object-cover object-top transition-transform duration-500 hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-7 sm:p-8">
                    <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                      {member.role}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">
                      {member.registration}
                    </p>

                    <ul className="mt-7 space-y-4 border-t border-border pt-6">
                      {member.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="relative pl-5 text-sm leading-6 text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute top-2.5 left-0 size-1.5 rounded-full bg-brand-teal"
                          />
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCallout title="Fale com nossa equipe" />
    </main>
  );
}
