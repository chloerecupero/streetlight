"use client";

import { useActionState } from "react";

import {
  signUpWithPassword,
  type AuthFormState,
} from "@/lib/auth/actions";
import { Heading, Lead } from "@/components/brand/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUpWithPassword, null as AuthFormState);

  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-card/95 p-8 shadow-sm sm:p-10">
      <div className="space-y-2">
        <Heading level="h2" className="text-foreground">
          Create your household
        </Heading>
        <Lead className="text-base">
          We&apos;ll send a confirmation email (Supabase Auth). Use a real inbox you can open on this
          device while testing.
        </Lead>
      </div>
      <form className="mt-8 space-y-5" action={formAction}>
        {state?.error ? (
          <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Your name
          </label>
          <Input id="name" name="name" autoComplete="name" placeholder="Jordan Lee" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            required
            minLength={6}
          />
        </div>
        <Button type="submit" className="w-full rounded-full shadow-sm" size="lg" disabled={pending}>
          {pending ? "Creating account…" : "Continue"}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have access?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
