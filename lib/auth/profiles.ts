import type { SupabaseClient } from "@supabase/supabase-js";

export type ProfileSyncInput = {
  id: string;
  email: string;
  full_name?: string | null;
};

/**
 * Ensures a `public.profiles` row exists for the authenticated user (RLS: id = auth.uid()).
 * Inserts on first sight; updates email (and full_name when provided) on subsequent syncs.
 */
export async function syncProfileRow(
  supabase: SupabaseClient,
  input: ProfileSyncInput
): Promise<string | null> {
  const { data: existing, error: selectError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", input.id)
    .maybeSingle();

  if (selectError) {
    return selectError.message;
  }

  if (!existing) {
    const { error } = await supabase.from("profiles").insert({
      id: input.id,
      email: input.email,
      full_name: input.full_name ?? null,
    });
    return error?.message ?? null;
  }

  const updates: { email: string; full_name?: string | null } = {
    email: input.email,
  };
  if (input.full_name != null && String(input.full_name).trim() !== "") {
    updates.full_name = input.full_name.trim();
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", input.id);
  return error?.message ?? null;
}
