"use client";

import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Shield,
  Sparkles,
  SunMedium,
  Users,
} from "lucide-react";
import Link from "next/link";

import { HeroIllustration } from "@/components/brand/hero-illustration";
import { Heading, Lead } from "@/components/brand/heading";
import { Section } from "@/components/brand/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MarketingLanding() {
  return (
    <>
      <Section pad="lg" className="pt-12 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="space-y-8">
            <FadeIn>
              <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="size-3.5 text-terracotta" aria-hidden />
                Local friends. Real adventures.
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <Heading level="display" className="text-foreground">
                The best adventures happen close to home.
              </Heading>
            </FadeIn>
            <FadeIn delay={0.12}>
              <Lead>
                Streetlight is calm digital infrastructure for healthy neighborhoods —
                helping families coordinate outdoor play, small gatherings, and trusted
                connections without the noise of traditional social media.
              </Lead>
            </FadeIn>
            <FadeIn delay={0.18} className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="rounded-full px-7 shadow-sm" asChild>
                <Link href="/signup">
                  Start free
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-border/80 bg-card/60" asChild>
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </FadeIn>
            <FadeIn delay={0.22} className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-sage" aria-hidden />
                Parent-first approvals
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-sage" aria-hidden />
                Neighborhood-scoped by design
              </span>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} y={16} className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-butter/25 via-transparent to-sage/20 blur-2xl" />
            <HeroIllustration className="w-full drop-shadow-sm" />
          </FadeIn>
        </div>
      </Section>

      <Section id="problem" pad="md" className="bg-muted/35">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <FadeIn>
            <Heading level="h2" className="text-foreground">
              Childhood was never meant to be lived behind a feed.
            </Heading>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Between packed schedules and siloed apps, the gentle rhythm of
                neighborhood life — bikes at the corner, pickup games, impromptu
                lemonade stands — is harder to find.
              </p>
              <p className="text-foreground/90">
                Streetlight doesn&apos;t replace that world. It helps the people who
                already live near each other find one another again.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section id="solution" pad="md">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Heading level="h2" className="text-foreground">
              A softer place to plan real life.
            </Heading>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="mt-5 text-lg text-muted-foreground">
              Tools for parents and caregivers to host, discover, and approve local
              activities — with breathing room, clear boundaries, and zero follower
              counts.
            </p>
          </FadeIn>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Local by default",
              body: "Activities and families stay tied to the neighborhood you verify — not the entire internet.",
              icon: MapPin,
            },
            {
              title: "Independence, gently",
              body: "Give kids room to explore with guardrails that make sense for your household.",
              icon: SunMedium,
            },
            {
              title: "Community, not clout",
              body: "No vanity metrics — just invitations, RSVPs, and small moments that add up.",
              icon: Users,
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={0.05 * i}>
              <Card className="h-full border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-forest">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {item.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="safety" pad="md" className="bg-forest text-cream">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="space-y-6">
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-wider text-cream/70">
                Safety &amp; trust
              </p>
              <Heading level="h2" className="text-cream">
                Reassurance you can feel — not fear you have to manage.
              </Heading>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="text-lg leading-relaxed text-cream/80">
                Verified households, parent approvals for joins, and neighborhood
                boundaries are built into the product — not bolted on as an
                afterthought. We design for calm visibility, not surveillance theater.
              </p>
            </FadeIn>
            <FadeIn delay={0.14}>
              <Button
                variant="secondary"
                className="rounded-full bg-cream text-forest hover:bg-cream/90"
                asChild
              >
                <Link href="#safety-detail">Read our approach</Link>
              </Button>
            </FadeIn>
          </div>
          <FadeIn delay={0.06}>
            <ul className="space-y-4 rounded-3xl border border-cream/15 bg-cream/5 p-8 backdrop-blur-sm">
              {[
                "Verified families in your trusted radius",
                "Parent approvals before kids participate",
                "Geofenced neighborhoods you control",
                "Structured coordination — not open DMs",
                "Moderation workflows designed with educators",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-cream/90">
                  <Shield className="mt-0.5 size-4 shrink-0 text-butter" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <p id="safety-detail" className="sr-only">
          Detailed safety documentation coming soon.
        </p>
      </Section>

      <Section id="how-it-works" pad="md">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Heading level="h2" className="text-foreground">
              How it works
            </Heading>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="mt-5 text-lg text-muted-foreground">
              A simple rhythm: set your household, verify your block, then let the
              neighborhood surprise you — in the best way.
            </p>
          </FadeIn>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Create your household",
              body: "Tell us who lives at home and how you like to be reached.",
            },
            {
              step: "02",
              title: "Verify your neighborhood",
              body: "Lightweight checks keep your radius honest and local.",
            },
            {
              step: "03",
              title: "Browse or host activities",
              body: "Park meetups, chalk art afternoons, bike loops — small is beautiful.",
            },
            {
              step: "04",
              title: "Approve with confidence",
              body: "You stay in the loop for joins, updates, and coordination.",
            },
          ].map((item, i) => (
            <FadeIn key={item.step} delay={0.06 * i}>
              <li className="relative h-full rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm">
                <span className="font-heading text-sm text-terracotta">{item.step}</span>
                <p className="mt-3 font-heading text-lg text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Section>

      <Section id="stories" pad="md" className="bg-muted/35">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Heading level="h2" className="text-foreground">
              Early voices from the sidewalk
            </Heading>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="mt-5 text-lg text-muted-foreground">
              Placeholder stories for the MVP — real quotes will land here as families
              start lighting up their blocks.
            </p>
          </FadeIn>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              quote:
                "Finally something that feels like a front porch, not a timeline. We hosted a tiny scavenger hunt and met three families we’d waved at for years.",
              name: "Elena M.",
              detail: "Parent of two · Portland",
            },
            {
              quote:
                "The approvals flow is thoughtful. I can say yes to the park hangout and still feel like I’m parenting, not hovering.",
              name: "Jordan K.",
              detail: "Parent · Austin",
            },
            {
              quote:
                "Our kids asked to go outside more the first month than the entire spring before. That’s the whole point.",
              name: "Samira T.",
              detail: "Caregiver · Minneapolis",
            },
          ].map((t, i) => (
            <FadeIn key={t.name} delay={0.06 * i}>
              <Card className="h-full border-border/70 bg-card shadow-sm">
                <CardContent className="pt-8">
                  <p className="text-base leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-border/60 pt-5">
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.detail}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section pad="md" className="pb-24 sm:pb-28">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-secondary/80 via-card to-butter/15 px-8 py-14 text-center shadow-sm sm:px-14">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-sage/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-terracotta/15 blur-3xl" />
            <Heading level="h2" className="relative mx-auto max-w-xl text-foreground">
              Ready when your block is.
            </Heading>
            <p className="relative mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
              Join the waitlist for the Streetlight beta — we&apos;re onboarding
              neighborhoods slowly, with care.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full px-8 shadow-sm" asChild>
                <Link href="/signup">
                  Reserve your spot
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-border/80 bg-background/70" asChild>
                <Link href="/login">I already have access</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
