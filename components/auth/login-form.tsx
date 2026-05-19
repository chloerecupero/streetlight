"use client";

import { useActionState } from "react";

import { signInWithPassword, type AuthFormState } from "@/lib/auth/actions";
import { Heading, Lead } from "@/components/brand/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function formatLoginErrorParam(raw?: string): string | undefined {
  if (!raw) return undefined;
  if (raw === "missing_code") {
    return "That confirmation link was incomplete. Try signing up again or use a fresh email link.";
  }
  try {
    return decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    return raw;
  }
}

type LoginFormProps = {
  nextPath?: string;
  initialErrorParam?: string;
};

export function LoginForm({ nextPath, initialErrorParam }: LoginFormProps) {
  const initial: AuthFormState = initialErrorParam
    ? { error: formatLoginErrorParam(initialErrorParam) }
    : null;

  const [state, formAction, pending] = useActionState(
    signInWithPassword,
    initial,
  );

  const next =
    nextPath?.startsWith("/") && !nextPath.startsWith("//")
      ? nextPath
      : "/dashboard";

  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-card/95 p-8 shadow-sm sm:p-10">
      <div className="space-y-2">
        <Heading level="h2" className="text-foreground">
          Welcome back
        </Heading>
        <Lead className="text-base">
          Sign in with the email and password for your household. Sessions use
          secure cookies via Supabase.
        </Lead>
      </div>
      <form className="mt-8 space-y-5" action={formAction}>
        <input type="hidden" name="next" value={next} />
        {state?.error ? (
          <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
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
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-full shadow-sm"
          size="lg"
          disabled={pending}
        >
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Streetlight?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
