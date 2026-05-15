"use server";

import { redirect } from "next/navigation";

import { syncProfileRow } from "@/lib/auth/profiles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthFormState = { error?: string } | null;

export type ResendFormState = { error?: string; success?: boolean } | null;

function safeNextPath(raw: string | null | undefined, fallback: string): string {
  const next = String(raw ?? "").trim() || fallback;
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

export async function signInWithPassword(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? ""), "/dashboard");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: userError?.message ?? "Could not load your account after sign-in." };
  }

  const meta = user.user_metadata as { full_name?: string } | undefined;
  const profileError = await syncProfileRow(supabase, {
    id: user.id,
    email: user.email ?? email,
    full_name: meta?.full_name ?? null,
  });
  if (profileError) {
    await supabase.auth.signOut();
    return { error: profileError };
  }

  redirect(next);
}

export async function signUpWithPassword(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("name") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = await createSupabaseServerClient();
  const siteUrl = siteOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent("/onboarding")}`,
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session && data.user) {
    const profileError = await syncProfileRow(supabase, {
      id: data.user.id,
      email: data.user.email ?? email,
      full_name: fullName || null,
    });
    if (profileError) {
      await supabase.auth.signOut();
      return { error: profileError };
    }
  }

  redirect(`/signup/verify?email=${encodeURIComponent(email)}`);
}

export async function resendSignupEmail(
  _prev: ResendFormState,
  formData: FormData
): Promise<ResendFormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return { error: "Missing email address." };
  }

  const supabase = await createSupabaseServerClient();
  const siteUrl = siteOrigin();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent("/onboarding")}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function confirmSessionAndContinue(
  _prev: AuthFormState,
  _formData: FormData
): Promise<AuthFormState> {
  void _prev;
  void _formData;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: error.message };
  }
  if (!user) {
    return {
      error:
        "No active session yet. Open the confirmation link in your email, then try again.",
    };
  }

  const meta = user.user_metadata as { full_name?: string } | undefined;
  const profileError = await syncProfileRow(supabase, {
    id: user.id,
    email: user.email ?? "",
    full_name: meta?.full_name ?? null,
  });
  if (profileError) {
    await supabase.auth.signOut();
    return { error: profileError };
  }

  redirect("/onboarding");
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}
