import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function FraudNotice() {
  return (
    <div className="border-b border-border/70 bg-brand-ink text-foreground">
      <div className="mx-auto flex min-h-8 max-w-7xl items-center justify-center gap-2 px-5 py-1.5 text-center text-[0.7rem] leading-4 sm:px-8 sm:text-xs lg:px-12">
        <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0 text-brand-teal" />
        <span>
          O escritório não solicita pagamentos para liberação de valores.
        </span>
        <Link
          href="/seguranca-e-prevencao-a-fraudes"
          className="inline-flex min-h-11 shrink-0 items-center gap-1 font-semibold text-foreground underline decoration-brand-teal underline-offset-4 transition-colors hover:text-brand-teal"
        >
          Saiba mais
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </div>
  );
}
