"use client";

import { useMemo, useState } from "react";

import { ActivityCard } from "@/components/activities/activity-card";
import { Button } from "@/components/ui/button";
import type { Activity, ActivityCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: { id: "all" | ActivityCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "outdoor", label: "Outdoors" },
  { id: "sports", label: "Sports" },
  { id: "creative", label: "Creative" },
  { id: "social", label: "Gatherings" },
];

export function ActivitiesBoard({ activities }: { activities: Activity[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return activities;
    return activities.filter((a) => a.category === filter);
  }, [activities, filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.id}
            type="button"
            size="sm"
            variant={filter === f.id ? "default" : "outline"}
            className={cn(
              "rounded-full border-border/70",
              filter === f.id ? "shadow-sm" : "bg-card/70"
            )}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 bg-muted/30 px-6 py-16 text-center">
          <p className="font-heading text-lg text-foreground">Nothing here yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            When neighbors post activities in this category, they&apos;ll appear calmly — no endless refresh.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
