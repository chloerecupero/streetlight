import Link from "next/link";
import { CalendarPlus, ChevronRight, Shield } from "lucide-react";

import { AppPageHeader } from "@/components/brand/app-page-header";
import { ActivityCategoryStripe } from "@/components/activities/activity-category-stripe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getChildActivityStatuses,
  getJoinRequests,
  getNeighborhoodUpdates,
  getUpcomingActivities,
} from "@/lib/mock/dashboard";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  const upcoming = getUpcomingActivities();
  const joinRequests = getJoinRequests();
  const children = getChildActivityStatuses();
  const updates = getNeighborhoodUpdates();

  return (
    <>
      <AppPageHeader
        title="Good afternoon, Jordan"
        description="A quiet snapshot of your block — upcoming hangs, gentle nudges, and what your kids are up to."
        actions={
          <Button variant="outline" className="rounded-full border-border/80 bg-card/70" asChild>
            <Link href="/activities">
              Browse activities
              <ChevronRight className="size-4" data-icon="inline-end" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/90 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="font-heading text-lg">Upcoming for your household</CardTitle>
              <CardDescription>Small plans worth keeping.</CardDescription>
            </div>
            <Button size="sm" variant="secondary" className="rounded-full shrink-0" asChild>
              <Link href="/activities">
                <CalendarPlus className="size-4" data-icon="inline-start" />
                Plan
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcoming.map((a) => (
              <Link
                key={a.id}
                href={`/activities/${a.id}`}
                className="block overflow-hidden rounded-2xl border border-border/60 bg-background/80 transition-colors hover:border-border"
              >
                <ActivityCategoryStripe category={a.category} className="h-1.5 rounded-none" />
                <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-heading text-base text-foreground">{a.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.dateLabel} · {a.timeLabel}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit rounded-full border-sage/50">
                    {a.locationLabel}
                  </Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Join requests</CardTitle>
            <CardDescription>Approve with context, not pressure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {joinRequests.map((jr) => (
              <div
                key={jr.id}
                className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3"
              >
                <p className="text-sm font-medium text-foreground">{jr.activityTitle}</p>
                <p className="mt-1 text-xs text-muted-foreground">{jr.fromFamily}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="rounded-full">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full border-border/80">
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Kids today</CardTitle>
            <CardDescription>Where independence meets visibility.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {children.map((c) => (
              <div key={c.childId} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{c.childName}</p>
                  <Badge
                    variant={c.status === "out" ? "secondary" : "outline"}
                    className="rounded-full capitalize"
                  >
                    {c.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90 shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="font-heading text-lg">Neighborhood notes</CardTitle>
              <CardDescription>Low-volume updates from verified hosts.</CardDescription>
            </div>
            <Shield className="size-5 shrink-0 text-sage" aria-hidden />
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {updates.map((u) => (
              <div key={u.id} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <p className="text-xs text-muted-foreground">{u.timeAgo}</p>
                <p className="mt-2 font-heading text-base text-foreground">{u.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5 border-border/70 bg-muted/25 shadow-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-heading text-lg">Safety snapshot</CardTitle>
            <CardDescription>Geofence on · parent approvals required for joins.</CardDescription>
          </div>
          <Button variant="outline" className="rounded-full border-border/80 bg-card/80" asChild>
            <Link href="/safety">Review trust center</Link>
          </Button>
        </CardHeader>
      </Card>
    </>
  );
}
