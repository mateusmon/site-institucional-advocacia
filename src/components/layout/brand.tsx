import Link from "next/link";
import type { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

type BrandProps = Readonly<{
  compact?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;

export function Brand({ compact = false, className, onClick }: BrandProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Ravanelli & Roseno Advogados Associados — página inicial"
      className={cn(
        "group inline-flex min-h-11 min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center border border-brand-teal/60 font-serif text-[0.92rem] font-semibold tracking-[-0.08em] text-brand-teal transition-colors duration-[160ms] group-hover:border-primary group-hover:text-primary"
      >
        R·R
      </span>
      <span className="min-w-0 leading-none">
        <span className="block truncate font-serif text-[1.08rem] font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
          Ravanelli &amp; Roseno
        </span>
        <span
          className={cn(
            "mt-1 block truncate text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-opacity duration-200 sm:text-[0.62rem]",
            compact && "lg:opacity-0",
          )}
        >
          Advogados Associados
        </span>
      </span>
    </Link>
  );
}
