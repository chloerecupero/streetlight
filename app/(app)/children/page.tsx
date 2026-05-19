import Link from "next/link";
import { Baby, Shield } from "lucide-react";

import { AppPageHeader } from "@/components/brand/app-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { listChildrenForCurrentUser } from "@/lib/data/children";
import type { ChildProfile } from "@/lib/types";

export const metadata = {
  title: "Children",
};

const joinLabel = {
  parent_only: "Parent approves every join",
  trusted_hosts: "Trusted hosts + your OK",
  neighborhood: "Neighborhood-scoped invites",
} as const;

export default async function ChildrenPage() {
  const children = await listChildrenForCurrentUser();

  return (
    <>
      <AppPageHeader
        title="Child profiles"
        description="Parent-managed, privacy-first. Neighbors see only what you allow — never a public profile page."
        actions={
          <Button variant="outline" className="rounded-full border-border/80 bg-card/70" type="button" disabled>
            Add child (soon)
          </Button>
        }
      />

      {children.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-muted/30 px-6 py-16 text-center">
          <p className="font-heading text-lg text-foreground">No child profiles yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Children you add during onboarding will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      )}

      <Card className="mt-5 border-dashed border-border/80 bg-muted/20 shadow-none">
        <CardHeader className="flex flex-row items-start gap-3">
          <Baby className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden />
          <div>
            <CardTitle className="font-heading text-lg">Why profiles stay small</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Streetlight is not a social graph for kids. Profiles power matching and safety —
              not popularity, streaks, or public comments.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

function ChildCard({ child }: { child: ChildProfile }) {
  return (
    <Card className="border-border/70 bg-card/90 shadow-sm">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar size="lg" className="bg-secondary text-base font-medium text-foreground">
          <AvatarFallback>{child.avatarInitials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="font-heading text-xl">{child.displayName}</CardTitle>
            <Badge variant="secondary" className="rounded-full font-normal">
              {child.ageRangeLabel}
            </Badge>
          </div>
          <CardDescription>Interests stay local to your block.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Interests
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {child.interests.length > 0 ? (
              child.interests.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-foreground"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">None added yet</p>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-muted/25 p-4">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Shield className="size-3.5 text-sage" aria-hidden />
            Permissions
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Joins: </span>
              {joinLabel[child.permissions.joinActivities]}
            </li>
            <li>
              <span className="font-medium text-foreground">RSVP visibility: </span>
              {child.permissions.showOnRsvp ? "First name on RSVP" : "Hidden until approved"}
            </li>
            <li>
              <span className="font-medium text-foreground">Directory: </span>
              {child.permissions.shareFirstNameOnly
                ? "First name only outside your household"
                : "Household name only"}
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="rounded-full" type="button" variant="secondary" disabled>
            Edit profile
          </Button>
          <Button size="sm" variant="outline" className="rounded-full border-border/80" type="button" asChild>
            <Link href="/safety">Safety center</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
