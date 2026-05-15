import Link from "next/link";
import { MapPin, Users } from "lucide-react";

import { ActivityCategoryStripe } from "@/components/activities/activity-category-stripe";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryLabel: Record<Activity["category"], string> = {
  outdoor: "Outdoors",
  sports: "Sports",
  creative: "Creative",
  social: "Gathering",
};

type ActivityCardProps = {
  activity: Activity;
  className?: string;
};

export function ActivityCard({ activity, className }: ActivityCardProps) {
  const filled = activity.spotsTotal - activity.spotsOpen;

  return (
    <Link href={`/activities/${activity.id}`} className={cn("group block", className)}>
      <Card className="h-full overflow-hidden border-border/70 bg-card/90 shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md">
        <ActivityCategoryStripe category={activity.category} />
        <CardHeader className="gap-3 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full font-normal">
              {categoryLabel[activity.category]}
            </Badge>
            {activity.organizer.verified ? (
              <Badge variant="outline" className="rounded-full border-sage/50 text-muted-foreground">
                Verified host
              </Badge>
            ) : null}
          </div>
          <h2 className="font-heading text-xl font-medium tracking-tight text-foreground group-hover:text-forest sm:text-2xl">
            {activity.title}
          </h2>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{activity.summary}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-sage" aria-hidden />
              {activity.locationLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5 shrink-0 text-sage" aria-hidden />
              {filled}/{activity.spotsTotal} families
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {activity.dateLabel} · {activity.timeLabel}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
