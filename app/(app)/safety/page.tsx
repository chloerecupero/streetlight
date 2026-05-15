import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { AppPageHeader } from "@/components/brand/app-page-header";
import { Heading } from "@/components/brand/heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Safety & trust",
};

const pillars = [
  {
    title: "Verified households",
    body: "Lightweight checks tie accounts to real addresses inside your chosen neighborhood radius.",
  },
  {
    title: "Parent approvals by default",
    body: "Kids don’t move between activities without an explicit yes from a caregiver on file.",
  },
  {
    title: "Geofenced neighborhoods",
    body: "Discovery stays inside the boundary you verify — not the whole city, and certainly not the open web.",
  },
  {
    title: "Structured coordination",
    body: "Communication stays tied to activities and hosts. No public DMs, no follower graphs.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <AppPageHeader
        title="Safety & trust"
        description="Calm infrastructure for families — built for reassurance, not fear."
      />
      <div className="rounded-[1.75rem] border border-border/70 bg-forest p-8 text-cream shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-cream/70">
              Our posture
            </p>
            <Heading level="h2" className="text-cream">
              We design for the sidewalk, not the algorithm.
            </Heading>
            <p className="text-base leading-relaxed text-cream/85">
              Streetlight is not social media for children. It is a coordination layer for
              families who already share geography — with privacy defaults that assume the
              internet is wide, but your block should feel small.
            </p>
          </div>
          <ShieldCheck className="size-12 shrink-0 text-butter/90" aria-hidden />
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {pillars.map((p) => (
          <Card key={p.title} className="border-border/70 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg">{p.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">{p.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-border/70 bg-muted/25 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Moderation & escalation</CardTitle>
          <CardDescription>
            Human review for edge cases, clear reporting paths, and partnerships with local
            organizations as we grow.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button className="rounded-full" asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
          <Button variant="outline" className="rounded-full border-border/80 bg-card/80" asChild>
            <Link href="/">Read the story on the homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
