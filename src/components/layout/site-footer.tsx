import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { primaryNavigation } from "@/data/navigation";
import { siteContact } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-brand-ink text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.7fr_1.2fr] lg:px-10 lg:py-16">
        <div className="max-w-sm">
          <Link
            href="/"
            aria-label="Ravanelli & Roseno Advogados Associados — página inicial"
            className="inline-flex min-h-11 items-center gap-3 rounded-sm focus-visible:ring-2 focus-visible:ring-brand-teal"
          >
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center border border-brand-teal/70 font-serif text-base font-semibold tracking-[-0.08em] text-brand-teal"
            >
              R·R
            </span>
            <span>
              <span className="block font-serif text-xl font-semibold">
                Ravanelli &amp; Roseno
              </span>
              <span className="mt-1 block text-[0.62rem] font-semibold tracking-[0.2em] text-foreground/55 uppercase">
                Advogados Associados
              </span>
            </span>
          </Link>
          <p className="mt-6 text-sm leading-7 text-foreground/60">
            Atuação jurídica full service, com unidades em Brasília e Taguatinga.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-brand-teal uppercase">
            Navegação
          </h2>
          <ul className="mt-5 space-y-3">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-foreground/65 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-brand-teal uppercase">
            Canais oficiais
          </h2>
          <div className="mt-5 space-y-4 text-sm text-foreground/65">
            <a
              href={siteContact.phone.href}
              className="flex min-h-11 w-fit items-center gap-3 hover:text-foreground"
            >
              <Phone aria-hidden="true" className="size-4 text-brand-teal" />
              {siteContact.phone.label}
            </a>
            <a
              href={siteContact.email.href}
              className="flex min-h-11 w-fit items-center gap-3 break-all hover:text-foreground"
            >
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-teal" />
              {siteContact.email.label}
            </a>
            <p className="flex items-start gap-3 leading-6">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-teal" />
              Brasília e Taguatinga, Distrito Federal
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs leading-5 text-foreground/65 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Ravanelli &amp; Roseno Advogados Associados.</p>
          <Link
            href="/seguranca-e-prevencao-a-fraudes"
            className="inline-flex min-h-11 w-fit items-center underline decoration-foreground/25 underline-offset-4 hover:text-foreground"
          >
            Segurança e prevenção a fraudes
          </Link>
        </div>
      </div>
    </footer>
  );
}
