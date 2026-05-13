import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "display" | "h1" | "h2" | "h3";

const styles: Record<HeadingLevel, string> = {
  display:
    "font-heading text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl",
  h1: "font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl",
  h2: "font-heading text-2xl font-medium tracking-tight text-balance sm:text-3xl lg:text-4xl",
  h3: "font-heading text-xl font-medium tracking-tight sm:text-2xl",
};

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "p";
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
};

export function Heading({ as, level, children, className }: HeadingProps) {
  const Tag =
    as ?? (level === "display" || level === "h1" ? "h1" : level === "h2" ? "h2" : "h3");

  return <Tag className={cn(styles[level], className)}>{children}</Tag>;
}

type LeadProps = {
  children: ReactNode;
  className?: string;
};

export function Lead({ children, className }: LeadProps) {
  return (
    <p
      className={cn(
        "max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
