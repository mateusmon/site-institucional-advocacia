import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { siteContact } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Segurança e prevenção a fraudes",
  description:
    "Confira os canais oficiais do Ravanelli & Roseno e as orientações para identificar e evitar contatos fraudulentos em nome do escritório.",
  path: "/seguranca-e-prevencao-a-fraudes",
});

export default function FraudPreventionPage() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Segurança"
        title="Prevenção a contatos fraudulentos."
        description="Confira os canais oficiais antes de compartilhar dados ou realizar qualquer pagamento."
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
          <Reveal direction="left" className="lg:col-span-7">
            <ShieldCheck aria-hidden="true" className="size-9 text-primary" />
            <h2 className="mt-6 font-serif text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
              Confirme sempre a origem do contato
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              O Ravanelli &amp; Roseno informa que não solicita pagamentos para
              liberação de valores. Caso receba uma mensagem suspeita em nome do
              escritório, interrompa a conversa e faça a confirmação por um dos
              canais oficiais abaixo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={siteContact.phone.href}>
                  <Phone aria-hidden="true" />
                  {siteContact.phone.label}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={siteContact.email.href}>
                  <Mail aria-hidden="true" />
                  Enviar e-mail
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={0.08}
            className="lg:col-span-4 lg:col-start-9"
          >
            <aside className="border-l-2 border-brand-teal bg-brand-ivory p-7 sm:p-9">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Em caso de dúvida
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Não utilize os dados enviados na mensagem suspeita para fazer a
                confirmação. Acesse diretamente esta página e use os canais
                publicados pelo escritório.
              </p>
              <Link
                href="/contato"
                className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary hover:text-brand-teal"
              >
                Ver todos os canais oficiais
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
