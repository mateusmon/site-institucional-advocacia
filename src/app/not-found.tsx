import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="bg-background outline-none"
    >
      <section className="mx-auto flex min-h-[65svh] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-2xl border-l-2 border-brand-teal pl-6 sm:pl-9">
          <SearchX aria-hidden="true" className="size-8 text-primary" />
          <p className="mt-7 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Erro 404
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
            Página não encontrada.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            O endereço acessado não está disponível. Retorne à página inicial
            ou utilize a navegação do site.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Voltar à página inicial
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
