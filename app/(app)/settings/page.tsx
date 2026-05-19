import Link from "next/link";
import { Bell, MapPinned, Moon, Users } from "lucide-react";

import { AppPageHeader } from "@/components/brand/app-page-header";
import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getHouseholdSettings } from "@/lib/mock/settings";

export const metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  const s = getHouseholdSettings();

  return (
    <>
      <AppPageHeader
        title="Household settings"
        description="Quiet controls for notifications, neighborhood scope, and how your family shows up."
      />

      <div className="space-y-5">
        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 font-heading text-lg">
              <Users className="size-5 text-sage" aria-hidden />
              Household
            </CardTitle>
            <CardDescription>
              Mock fields — persist with Supabase when you wire auth.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="household"
                className="text-sm font-medium text-foreground"
              >
                Household name
              </label>
              <Input id="household" defaultValue={s.householdName} readOnly />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Primary parent email
              </label>
              <Input
                id="email"
                type="email"
                defaultValue={s.primaryEmail}
                readOnly
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 font-heading text-lg">
              <MapPinned className="size-5 text-sage" aria-hidden />
              Neighborhood
            </CardTitle>
            <CardDescription>
              Discovery stays inside the boundary you verify.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <label
                htmlFor="hood"
                className="text-sm font-medium text-foreground"
              >
                Verified area
              </label>
              <Input id="hood" defaultValue={s.neighborhoodLabel} readOnly />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="radius"
                className="text-sm font-medium text-foreground"
              >
                Discovery radius (read-only stub)
              </label>
              <Input
                id="radius"
                defaultValue={s.discoveryRadiusLabel}
                readOnly
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 font-heading text-lg">
              <Bell className="size-5 text-sage" aria-hidden />
              Notifications
            </CardTitle>
            <CardDescription>
              Low volume by design — no growth hacks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Weekly digest
                </p>
                <p className="text-xs text-muted-foreground">
                  Upcoming activities nearby
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {s.emailDigest ? "On" : "Off"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  SMS reminders
                </p>
                <p className="text-xs text-muted-foreground">
                  Day-of nudges for hosts
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {s.smsReminders ? "On" : "Off"}
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 sm:col-span-2">
              <Moon className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Quiet hours
                </p>
                <p className="text-sm text-muted-foreground">
                  {s.quietHours.start} – {s.quietHours.end} (local)
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Non-urgent notifications pause here automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full" type="button" disabled>
            Save changes (stub)
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-border/80"
            asChild
          >
            <Link href="/children">Manage child profiles</Link>
          </Button>
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              className="rounded-full text-muted-foreground"
            >
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
