import type { HouseholdSettings } from "@/lib/types";

const MOCK: HouseholdSettings = {
  householdName: "The Lee family",
  primaryEmail: "jordan.lee@example.com",
  neighborhoodLabel: "Willow Creek · near Lincoln Elementary",
  discoveryRadiusLabel: "About 0.6 mi on foot / bike",
  emailDigest: true,
  smsReminders: false,
  quietHours: { start: "9:00 PM", end: "7:00 AM" },
};

export function getHouseholdSettings(): HouseholdSettings {
  return MOCK;
}
