"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  CalendarDays,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/activities", label: "Activities", icon: CalendarDays },
  { href: "/children", label: "Children", icon: Users },
  { href: "/safety", label: "Safety", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1", className)} aria-label="App">
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href === "/activities" && pathname.startsWith("/activities"));
        const content = (
          <>
            <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
            {label}
          </>
        );
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-secondary text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppChrome({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-border/70 bg-card/40 px-4 py-8 lg:flex lg:flex-col">
        <Link
          href="/dashboard"
          className="mb-10 px-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-xl"
        >
          <Logo />
        </Link>
        <NavLinks className="flex-1" />
        <div className="mt-auto rounded-2xl border border-border/60 bg-background/80 p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Willow Creek</p>
          <p className="mt-1 leading-relaxed">Signed in as demo@streetlight.app</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start rounded-full px-2"
            asChild
          >
            <Link href="/">Back to marketing</Link>
          </Button>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur-md lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full border-border/80"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,20rem)] p-0">
              <SheetHeader className="border-b border-border/60 px-6 py-5 text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetClose asChild>
                  <Link href="/dashboard" className="inline-flex" onClick={() => setMobileOpen(false)}>
                    <Logo />
                  </Link>
                </SheetClose>
              </SheetHeader>
              <div className="px-4 py-6">
                <NavLinks onNavigate={() => setMobileOpen(false)} />
              </div>
              <div className="mt-auto border-t border-border/60 px-6 py-5 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Willow Creek</p>
                <p className="mt-1">demo@streetlight.app</p>
                <SheetClose asChild>
                  <Button variant="link" className="mt-2 h-auto px-0 text-foreground" asChild>
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      Marketing site
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="pr-2" onClick={() => setMobileOpen(false)}>
            <Logo showWordmark />
          </Link>
          <span className="w-10" aria-hidden />
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
