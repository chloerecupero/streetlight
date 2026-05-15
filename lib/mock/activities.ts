import type { Activity } from "@/lib/types";

const people = {
  maya: { id: "p1", name: "Maya Chen", initials: "MC" },
  david: { id: "p2", name: "David Ortiz", initials: "DO" },
  sam: { id: "p3", name: "Sam Ellis", initials: "SE" },
  jules: { id: "p4", name: "Jules Park", initials: "JP" },
  nina: { id: "p5", name: "Nina Brooks", initials: "NB" },
  alex: { id: "p6", name: "Alex Rivera", initials: "AR" },
} as const;

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "act-bike-park",
    title: "Slow roll to Maple Park",
    summary:
      "Easy loop for training wheels and big kids alike. We’ll meet at the corner of Birch & 4th.",
    category: "outdoor",
    locationLabel: "Birch & 4th → Maple Park",
    dateLabel: "Saturday, May 17",
    timeLabel: "10:00 AM · ~45 min",
    spotsOpen: 4,
    spotsTotal: 8,
    organizer: { ...people.maya, verified: true },
    participants: [people.david, people.sam, people.jules],
    requiresParentApproval: true,
    neighborhood: "Willow Creek",
  },
  {
    id: "act-lemonade",
    title: "Neighborhood lemonade stand",
    summary:
      "Kids are running the stand; parents on the porch with iced tea. Bring quarters or digital if you like.",
    category: "social",
    locationLabel: "1426 Linden Ave (front walk)",
    dateLabel: "Sunday, May 18",
    timeLabel: "2:00 – 4:00 PM",
    spotsOpen: 10,
    spotsTotal: 12,
    organizer: { ...people.nina, verified: true },
    participants: [people.maya, people.alex],
    requiresParentApproval: true,
    neighborhood: "Willow Creek",
  },
  {
    id: "act-soccer",
    title: "Pickup soccer (mixed ages)",
    summary:
      "Casual scrimmage — cleats optional, good attitudes required. Water break every 20 minutes.",
    category: "sports",
    locationLabel: "School field (east goal)",
    dateLabel: "Wednesday, May 21",
    timeLabel: "5:30 – 6:30 PM",
    spotsOpen: 2,
    spotsTotal: 10,
    organizer: { ...people.david, verified: true },
    participants: [people.sam, people.jules, people.alex, people.nina],
    requiresParentApproval: true,
    neighborhood: "Willow Creek",
  },
  {
    id: "act-scavenger",
    title: "Sidewalk scavenger hunt",
    summary:
      "Printed clues, small teams, everything stays on the block. Finish with popsicles in the cul-de-sac.",
    category: "creative",
    locationLabel: "Cul-de-sac on Aspen Row",
    dateLabel: "Saturday, May 24",
    timeLabel: "11:00 AM · ~1 hr",
    spotsOpen: 6,
    spotsTotal: 8,
    organizer: { ...people.sam, verified: true },
    participants: [people.maya],
    requiresParentApproval: true,
    neighborhood: "Willow Creek",
  },
  {
    id: "act-movie",
    title: "Backyard movie night (G)",
    summary:
      "Blanket chairs, popcorn, a short double feature. Content is G-rated; parents stay on-site.",
    category: "social",
    locationLabel: "908 Cedar Lane (backyard)",
    dateLabel: "Friday, May 30",
    timeLabel: "Dusk (~8:15 PM)",
    spotsOpen: 5,
    spotsTotal: 14,
    organizer: { ...people.jules, verified: true },
    participants: [people.david, people.nina, people.alex],
    requiresParentApproval: true,
    neighborhood: "Willow Creek",
  },
];

export function getActivityById(id: string): Activity | undefined {
  return MOCK_ACTIVITIES.find((a) => a.id === id);
}

export function listActivities(): Activity[] {
  return MOCK_ACTIVITIES;
}
