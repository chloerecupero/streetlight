import Link from "next/link";
import { Plus } from "lucide-react";

import { AppPageHeader } from "@/components/brand/app-page-header";
import { ActivitiesBoard } from "@/components/activities/activities-board";
import { Button } from "@/components/ui/button";
import { listActivities } from "@/lib/mock/activities";

export const metadata = {
  title: "Activities",
};

export default function ActivitiesPage() {
  const activities = listActivities();

  return (
    <>
      <AppPageHeader
        title="Neighborhood activities"
        description="Discover what’s happening a walk or bike ride away — curated, finite, and always parent-visible."
        actions={
          <Button className="rounded-full shadow-sm" type="button" variant="secondary" asChild>
            <Link href="#create">
              <Plus className="size-4" data-icon="inline-start" />
              New activity
            </Link>
          </Button>
        }
      />
      <p id="create" className="sr-only">
        Activity creation flow coming soon.
      </p>
      <ActivitiesBoard activities={activities} />
    </>
  );
}
