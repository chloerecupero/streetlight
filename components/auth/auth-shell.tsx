import type { ReactNode } from "react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function AuthShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-svh bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(242,201,104,0.22),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(169,185,152,0.2),transparent_40%)]"
        aria-hidden
      />
      <div className={cn("relative z-10 mx-auto flex min-h-svh max-w-lg flex-col px-5 py-10 sm:px-8", className)}>
        <Link
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <Logo />
        </Link>
        <div className="flex flex-1 flex-col justify-center pb-12">{children}</div>
      </div>
    </div>
  );
}
