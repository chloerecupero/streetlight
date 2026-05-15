import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin, ShieldCheck, Users } from "lucide-react";

import { ActivityCategoryStripe } from "@/components/activities/activity-category-stripe";
import { RequestJoinButton } from "@/components/activities/request-join-button";
import { Heading, Lead } from "@/components/brand/heading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getActivityById } from "@/lib/mock/activities";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const activity = getActivityById(id);
  if (!activity) return { title: "Activity" };
  return { title: activity.title };
}

export default async function ActivityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const activity = getActivityById(id);
  if (!activity) notFound();

  const filled = activity.spotsTotal - activity.spotsOpen;

  return (
    <div className="space-y-10">
      <div>
        <Button variant="ghost" size="sm" className="-ml-2 rounded-full text-muted-foreground" asChild>
          <Link href="/activities">
            <ArrowLeft className="size-4" data-icon="inline-start" />
            All activities
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 shadow-sm">
        <ActivityCategoryStripe category={activity.category} className="h-2.5 rounded-none" />
        <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full font-normal">
              {activity.neighborhood}
            </Badge>
            {activity.organizer.verified ? (
              <Badge variant="outline" className="rounded-full border-sage/50 text-muted-foreground">
                Verified host
              </Badge>
            ) : null}
            {activity.requiresParentApproval ? (
              <Badge variant="outline" className="rounded-full border-border/80">
                Parent approval on
              </Badge>
            ) : null}
          </div>
          <Heading level="display" className="text-3xl sm:text-4xl lg:text-5xl">
            {activity.title}
          </Heading>
          <Lead className="max-w-3xl text-foreground/90">{activity.summary}</Lead>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-sage" aria-hidden />
              {activity.dateLabel} · {activity.timeLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-sage" aria-hidden />
              {activity.locationLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 text-sage" aria-hidden />
              {filled}/{activity.spotsTotal} families joined · {activity.spotsOpen} spots open
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-5">
          <Card className="border-border/70 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Host</CardTitle>
              <CardDescription>Someone you’ll see at pickup, not just in an app.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar size="lg" className="bg-secondary text-foreground">
                <AvatarFallback>{activity.organizer.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{activity.organizer.name}</p>
                <p className="text-sm text-muted-foreground">Organizer · replies within a day</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Who’s coming</CardTitle>
              <CardDescription>First names only — privacy stays local.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <AvatarGroup>
                {activity.participants.map((p) => (
                  <Avatar key={p.id} title={p.name} className="bg-muted">
                    <AvatarFallback>{p.initials}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <p className="text-sm text-muted-foreground">
                {activity.participants.length} families RSVP’d · room for {activity.spotsOpen} more
              </p>
            </CardContent>
          </Card>

          <div className="rounded-[1.75rem] border border-dashed border-border/80 bg-muted/25 px-6 py-12 text-center">
            <p className="text-sm font-medium text-foreground">Map preview</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Supabase + Mapbox (or static maps) can render a soft neighborhood pin here.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <Card className="border-border/70 bg-muted/20 shadow-sm">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 font-heading text-lg">
                <ShieldCheck className="size-5 text-sage" aria-hidden />
                Parent approvals
              </CardTitle>
              <CardDescription>
                Join requests surface in your dashboard. Nothing happens until you say yes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Streetlight keeps coordination structured: you&apos;ll see who is asking, which
                child profile they&apos;re bringing, and any notes from the host.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Approvals expire gently if left unanswered — no guilt-tripping pings.</li>
                <li>Hosts never see private contact info until you opt in.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Join this activity</CardTitle>
              <CardDescription>We&apos;ll notify the host and pause until approvals clear.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RequestJoinButton activity={activity} />
              <Button variant="outline" className="rounded-full border-border/80" type="button" disabled>
                Save for later
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
