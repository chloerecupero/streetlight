"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Activity } from "@/lib/types";

type RequestJoinButtonProps = {
  activity: Activity;
};

export function RequestJoinButton({ activity }: RequestJoinButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="rounded-full px-8 shadow-sm"
        type="button"
        onClick={() => setOpen(true)}
      >
        Request to join
      </Button>
      <Dialog open={open} onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSubmitted(false);
      }}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Send a join request?</DialogTitle>
            <DialogDescription>
              We&apos;ll notify {activity.organizer.name.split(" ")[0]} and keep everything
              visible in your parent dashboard. This is a placeholder flow for the MVP.
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <p className="rounded-2xl border border-border/70 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              Request recorded locally. Wire this step to Supabase when you&apos;re ready.
            </p>
          ) : null}
          <DialogFooter>
            <Button variant="outline" className="rounded-full" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="rounded-full"
              type="button"
              onClick={() => {
                if (submitted) {
                  setOpen(false);
                  return;
                }
                setSubmitted(true);
              }}
            >
              {submitted ? "Close" : "Confirm request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
