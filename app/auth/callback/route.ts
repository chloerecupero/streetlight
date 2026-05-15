import { NextResponse } from "next/server";

import { syncProfileRow } from "@/lib/auth/profiles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Email confirmation / OAuth code exchange. Add this URL to Supabase:
 * Authentication → URL Configuration → Redirect URLs:
 * `http://localhost:3000/auth/callback` (and your production URL).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextRaw = url.searchParams.get("next") ?? "/dashboard";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent("missing_code")}`, url.origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin)
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(userError?.message ?? "no_user_after_exchange")}`, url.origin)
    );
  }

  const meta = user.user_metadata as { full_name?: string } | undefined;
  const profileError = await syncProfileRow(supabase, {
    id: user.id,
    email: user.email ?? "",
    full_name: meta?.full_name ?? null,
  });

  if (profileError) {
    await supabase.auth.signOut();
    const login = new URL("/login", url.origin);
    login.searchParams.set("error", profileError);
    return NextResponse.redirect(login);
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
