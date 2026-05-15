"use client";

import { useActionState } from "react";
import { useState } from "react";

import {
  completeOnboarding,
  type OnboardingFormState,
} from "@/lib/auth/onboarding-actions";
import { Heading, Lead } from "@/components/brand/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const stepMeta = [
  {
    title: "Household",
    description: "What should neighbors see when you host?",
  },
  {
    title: "Kids",
    description: "Add a first name and age range — you can refine this later.",
  },
  {
    title: "Neighborhood",
    description: "We’ll use this to scope activities and invites.",
  },
] as const;

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [householdName, setHouseholdName] = useState("");
  const [childFirstName, setChildFirstName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [state, formAction, pending] = useActionState(completeOnboarding, null as OnboardingFormState);

  const isLast = step === stepMeta.length - 1;

  function handleContinue() {
    if (step === 0) {
      if (!householdName.trim()) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      if (!childFirstName.trim() || !ageRange.trim()) return;
      setStep(2);
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-card/95 p-8 shadow-sm sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Step {step + 1} of {stepMeta.length}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {stepMeta.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors",
                i <= step ? "bg-sage" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <Heading level="h2" className="text-foreground">
          {stepMeta[step].title}
        </Heading>
        <Lead className="text-base">{stepMeta[step].description}</Lead>
      </div>
      <form className="mt-8 space-y-6" action={formAction}>
        <input type="hidden" name="household_name" value={householdName} readOnly />
        {state?.error ? (
          <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        {step === 0 ? (
          <div className="space-y-2">
            <label htmlFor="household" className="text-sm font-medium text-foreground">
              Household name
            </label>
            <Input
              id="household"
              placeholder="The Lee family"
              required
              value={householdName}
              onChange={(ev) => setHouseholdName(ev.target.value)}
              disabled={pending}
            />
          </div>
        ) : null}
        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="child" className="text-sm font-medium text-foreground">
                Child first name
              </label>
              <Input
                id="child"
                placeholder="Leo"
                required
                value={childFirstName}
                onChange={(ev) => setChildFirstName(ev.target.value)}
                disabled={pending}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="age" className="text-sm font-medium text-foreground">
                Age range
              </label>
              <Input
                id="age"
                placeholder="6 – 8"
                required
                value={ageRange}
                onChange={(ev) => setAgeRange(ev.target.value)}
                disabled={pending}
              />
            </div>
          </div>
        ) : null}
        {step === 2 ? (
          <div className="space-y-2">
            <label htmlFor="block" className="text-sm font-medium text-foreground">
              Home street or block
            </label>
            <Input
              id="block"
              name="neighborhood"
              placeholder="Willow Creek · near the school"
              required
              value={neighborhood}
              onChange={(ev) => setNeighborhood(ev.target.value)}
              disabled={pending}
            />
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          {step > 0 ? (
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={pending}
            >
              Back
            </Button>
          ) : null}
          {isLast ? (
            <Button type="submit" className="rounded-full shadow-sm" disabled={pending}>
              {pending ? "Finishing…" : "Go to dashboard"}
            </Button>
          ) : (
            <Button
              type="button"
              className="rounded-full shadow-sm"
              onClick={handleContinue}
              disabled={pending}
            >
              Continue
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
