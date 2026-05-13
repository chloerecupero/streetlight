import Link from "next/link";

import { Container } from "@/components/brand/container";
import { Logo } from "@/components/brand/logo";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "#how-it-works", label: "How it works" },
      { href: "#safety", label: "Safety & trust" },
      { href: "/signup", label: "Join the waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Press" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/70 bg-muted/40">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Technology that helps families rebuild neighborhood childhood — calmly,
              locally, and with parents in the loop.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Legal
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground/80 hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Streetlight. All rights reserved.</p>
          <p className="text-balance">Made for real-world afternoons — not endless scrolling.</p>
        </div>
      </Container>
    </footer>
  );
}
