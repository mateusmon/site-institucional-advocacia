import { Building2, Layers3, Network, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const differentials = [
  {
    title: "Atuação full service",
    description:
      "Diferentes serviços e soluções jurídicas reunidos em uma mesma estrutura profissional.",
    icon: Layers3,
  },
  {
    title: "Orientação preventiva",
    description:
      "Atenção à identificação de riscos e ao apoio jurídico antes do surgimento ou agravamento de conflitos.",
    icon: ShieldCheck,
  },
  {
    title: "Presença no Distrito Federal",
    description:
      "Atendimento por meio das unidades localizadas em Brasília e Taguatinga.",
    icon: Building2,
  },
  {
    title: "Rede de correspondentes",
    description:
      "Correspondentes informados em Goiás, Tocantins, Minas Gerais, Rio de Janeiro e São Paulo.",
    icon: Network,
  },
] as const;

export function HomeDifferentials() {
  return (
    <section className="bg-brand-ink" aria-labelledby="home-differentials-title">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading
          id="home-differentials-title"
          eyebrow="Forma de atuação"
          title="Pilares que orientam o trabalho do escritório."
          description="Características institucionais presentes na trajetória e no modelo de atendimento do Ravanelli & Roseno."
        />

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={(index % 4) * 0.05} className="h-full">
                <article className="h-full bg-card p-7 sm:p-8">
                  <Icon aria-hidden="true" className="size-7 text-primary" />
                  <h3 className="mt-8 font-serif text-2xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
