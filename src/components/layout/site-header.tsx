"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

import { Brand } from "@/components/layout/brand";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { FraudNotice } from "@/components/layout/fraud-notice";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 16);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-200",
        isScrolled
          ? "border-border/90 bg-background/95 shadow-[0_8px_30px_rgba(0,0,0,0.28)] backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <m.div
            initial={false}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { display: "none" } : { height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <FraudNotice />
          </m.div>
        )}
      </AnimatePresence>

      <m.div
        animate={{ height: isScrolled ? 72 : 88 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
      >
        <Brand compact={isScrolled} />
        <DesktopNavigation pathname={pathname} />
        <MobileNavigation pathname={pathname} />
      </m.div>
    </header>
  );
}
