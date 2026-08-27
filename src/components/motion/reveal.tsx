"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealDirection = "up" | "left" | "right" | "none";

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  amount?: number;
}>;

const directionOffset: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 22 },
  left: { x: -22, y: 0 },
  right: { x: 22, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.18,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = directionOffset[direction];

  return (
    <m.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 1, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}
