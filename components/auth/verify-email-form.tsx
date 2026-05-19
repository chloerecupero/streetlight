"use client";

import { useActionState, useMemo } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

import {
  confirmSessionAndContinue,
  resendSignupEmail,
  type AuthFormState,
  type ResendFormState,
} from "@/lib/auth/actions";
import { Heading, Lead } from "@/components/brand/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function maskEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed.includes("@")) return trimmed || "your email";
  const [local, domain] = trimmed.split("@");
  if (!local || !domain) return trimmed;
  const visible = local.slice(0, 2);
  return `${visible}${local.length > 2 ? "•••" : ""}@${domain}`;
}

type VerifyEmailFormProps = {
  initialEmail: string;
};

export function VerifyEmailForm({ initialEmail }: VerifyEmailFormProps) {
  const [confirmState, confirmAction, confirmPending] = useActionState(
    confirmSessionAndContinue,
    null as AuthFormState,
  );
  const [resendState, resendAction, resendPending] = useActionState(
    resendSignupEmail,
    null as ResendFormState,
  );

  const masked = useMemo(() => maskEmail(initialEmail), [initialEmail]);

  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-card/95 p-8 shadow-sm sm:p-10">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-forest">
        <Mail className="size-5" aria-hidden />
      </div>
      <div className="mt-6 space-y-2">
        <Heading level="h2" className="text-foreground">
          Check your inbox
        </Heading>
        <Lead className="text-base">
          We sent a confirmation link to{" "}
          <span className="font-medium text-foreground">{masked}</span>. After
          you tap the link, Supabase sets a session cookie; then you can
          continue to onboarding.
        </Lead>
      </div>

      <form className="mt-8 space-y-5" action={confirmAction}>
        {confirmState?.error ? (
          <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {confirmState.error}
          </p>
        ) : null}
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium text-foreground">
            OTP code (optional)
          </label>
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
          />
          <p className="text-xs text-muted-foreground">
            If you enable phone or email OTP in Supabase, handle verification
            here; magic links skip this field.
          </p>
        </div>
        <Button
          type="submit"
          className="w-full rounded-full shadow-sm"
          size="lg"
          disabled={confirmPending}
        >
          {confirmPending ? "Checking…" : "I’ve confirmed my email"}
        </Button>
      </form>

      <form className="mt-6 space-y-3" action={resendAction}>
        <input type="hidden" name="email" value={initialEmail} />
        {resendState?.error ? (
          <p className="text-sm text-destructive">{resendState.error}</p>
        ) : null}
        {resendState?.success ? (
          <p className="text-sm text-muted-foreground">
            Another confirmation email is on its way.
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            variant="outline"
            className="rounded-full border-border/80"
            disabled={resendPending || !initialEmail}
          >
            {resendPending ? "Sending…" : "Resend link"}
          </Button>
          <Button
            variant="ghost"
            className="rounded-full text-muted-foreground"
            asChild
          >
            <Link href="/signup">Use a different email</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
