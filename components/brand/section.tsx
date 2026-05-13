import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Vertical padding scale */
  pad?: "sm" | "md" | "lg";
};

const padClass = {
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-32",
} as const;

export function Section({
  children,
  id,
  className,
  containerClassName,
  pad = "md",
}: SectionProps) {
  return (
    <section id={id} className={cn(padClass[pad], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
