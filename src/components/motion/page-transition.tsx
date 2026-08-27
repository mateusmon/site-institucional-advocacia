"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = Readonly<{
  children: ReactNode;
}>;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      key={pathname}
      className="overflow-x-clip"
      initial={shouldReduceMotion ? false : { opacity: 0.92 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.24,
        ease: "easeOut",
      }}
    >
      {children}
    </m.div>
  );
}
