import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { teamMembers } from "@/data/site";

export function HomeTeam() {
  return (
    <section className="bg-background" aria-labelledby="home-team-title">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            id="home-team-title"
            eyebrow="Equipe"
            title="Profissionais à frente do escritório."
            description="Conheça os sócios advogados apresentados nos canais institucionais do Ravanelli & Roseno."
          />
          <Reveal direction="right">
            <Link
              href="/equipe"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
            >
              Conhecer a equipe
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.07} className="h-full">
              <article className="group grid h-full overflow-hidden border border-border bg-card sm:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-80 overflow-hidden bg-muted sm:min-h-96">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 250px, (min-width: 640px) 42vw, calc(100vw - 40px)"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex flex-col justify-end p-7 sm:p-8">
                  <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                    {member.role}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.02em] text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-muted-foreground">
                    {member.registration}
                  </p>
                  <Link
                    href="/equipe"
                    aria-label={`Ver informações de ${member.name}`}
                    className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-teal"
                  >
                    Ver informações
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
