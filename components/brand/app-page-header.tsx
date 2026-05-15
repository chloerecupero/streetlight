import type { ReactNode } from "react";

import { Heading, Lead } from "@/components/brand/heading";
import { cn } from "@/lib/utils";

type AppPageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  actions?: ReactNode;
};

export function AppPageHeader({
  title,
  description,
  className,
  actions,
}: AppPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-3">
        <Heading level="h1" className="text-foreground">
          {title}
        </Heading>
        {description ? <Lead className="max-w-xl text-base sm:text-lg">{description}</Lead> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
