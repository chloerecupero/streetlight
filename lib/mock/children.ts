import type { ChildProfile } from "@/lib/types";

export const MOCK_CHILDREN: ChildProfile[] = [
  {
    id: "c-leo",
    displayName: "Leo",
    ageRangeLabel: "6 – 8",
    interests: ["Bikes", "Soccer", "Drawing with chalk"],
    avatarInitials: "L",
    permissions: {
      joinActivities: "trusted_hosts",
      shareFirstNameOnly: true,
      showOnRsvp: true,
    },
  },
  {
    id: "c-noa",
    displayName: "Noa",
    ageRangeLabel: "4 – 5",
    interests: ["Playground", "Picture books", "Neighborhood walks"],
    avatarInitials: "N",
    permissions: {
      joinActivities: "parent_only",
      shareFirstNameOnly: true,
      showOnRsvp: false,
    },
  },
];

export function listChildProfiles(): ChildProfile[] {
  return MOCK_CHILDREN;
}

export function getChildById(id: string): ChildProfile | undefined {
  return MOCK_CHILDREN.find((c) => c.id === id);
}
