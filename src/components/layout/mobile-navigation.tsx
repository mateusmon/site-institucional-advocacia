"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contactCta, primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

type MobileNavigationProps = Readonly<{
  pathname: string;
}>;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation({ pathname }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Abrir menu"
            className="text-foreground hover:bg-accent hover:text-primary"
          >
            <Menu aria-hidden="true" className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent className="overflow-y-auto p-0">
          <SheetHeader className="border-b border-border pb-6 pr-16 text-left">
            <Brand onClick={() => setOpen(false)} />
            <SheetTitle className="sr-only">Menu principal</SheetTitle>
            <SheetDescription className="sr-only">
              Navegue pelas páginas institucionais do escritório.
            </SheetDescription>
          </SheetHeader>

          <nav aria-label="Navegação principal mobile" className="flex flex-1 flex-col px-6 py-6">
            <ul className="space-y-1">
              {primaryNavigation.map((item, index) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <m.li
                    key={item.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.035 }}
                  >
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
                          isActive && "bg-accent text-primary",
                        )}
                      >
                        {item.label}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </SheetClose>
                  </m.li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-border pt-6">
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full">
                  <Link href={contactCta.href}>{contactCta.label}</Link>
                </Button>
              </SheetClose>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                O contato abre a página com os canais oficiais do escritório.
              </p>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
