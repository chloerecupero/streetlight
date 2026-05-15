"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type OnboardingFormState = { error?: string } | null;

export async function completeOnboarding(
  _prev: OnboardingFormState,
  formData: FormData
): Promise<OnboardingFormState> {
  const householdName = String(formData.get("household_name") ?? "").trim();
  const neighborhood = String(formData.get("neighborhood") ?? "").trim();

  if (!householdName || !neighborhood) {
    return { error: "Please complete household name and neighborhood." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Your session expired. Please sign in again." };
  }

  const { data: existingMember } = await supabase
    .from("household_members")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingMember) {
    redirect("/dashboard");
  }

  const { data: household, error: householdError } = await supabase
    .from("households")
    .insert({
      name: householdName,
      neighborhood,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (householdError || !household) {
    return { error: householdError?.message ?? "Could not create your household." };
  }

  const { error: memberError } = await supabase.from("household_members").insert({
    household_id: household.id,
    user_id: user.id,
    role: "parent",
  });

  if (memberError) {
    return {
      error: memberError.message,
    };
  }

  redirect("/dashboard");
}
