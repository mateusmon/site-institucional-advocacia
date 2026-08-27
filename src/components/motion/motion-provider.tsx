"use client";

import type { ReactNode } from "react";
import { domAnimation, LazyMotion } from "framer-motion";

type MotionProviderProps = Readonly<{
  children: ReactNode;
}>;

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
