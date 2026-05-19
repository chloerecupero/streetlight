import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ChildProfile } from "@/lib/types";

type ChildRow = {
  id: string;
  first_name: string;
  age_range: string | null;
  interests: string[] | null;
};

function initials(firstName: string): string {
  const letter = firstName.trim().charAt(0);
  return letter ? letter.toUpperCase() : "?";
}

function mapChildRow(row: ChildRow): ChildProfile {
  return {
    id: row.id,
    displayName: row.first_name,
    ageRangeLabel: row.age_range ?? "",
    interests: row.interests ?? [],
    avatarInitials: initials(row.first_name),
    permissions: {
      joinActivities: "parent_only",
      shareFirstNameOnly: true,
      showOnRsvp: true,
    },
  };
}

/** Children in households the current user belongs to (RLS-scoped). */
export async function listChildrenForCurrentUser(): Promise<ChildProfile[]> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("children")
    .select("id, first_name, age_range, interests")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("listChildrenForCurrentUser:", error.message);
    return [];
  }

  return (data ?? []).map(mapChildRow);
}
