export type ActivityCategory = "outdoor" | "sports" | "creative" | "social";

export type PersonRef = {
  id: string;
  name: string;
  initials: string;
};

export type Activity = {
  id: string;
  title: string;
  summary: string;
  category: ActivityCategory;
  locationLabel: string;
  dateLabel: string;
  timeLabel: string;
  spotsOpen: number;
  spotsTotal: number;
  organizer: PersonRef & { verified?: boolean };
  participants: PersonRef[];
  requiresParentApproval: boolean;
  neighborhood: string;
};

export type JoinRequest = {
  id: string;
  activityTitle: string;
  fromFamily: string;
  status: "pending" | "approved" | "declined";
};

export type ChildActivityStatus = {
  childId: string;
  childName: string;
  status: "home" | "out" | "pending";
  detail: string;
};

export type NeighborhoodUpdate = {
  id: string;
  title: string;
  body: string;
  timeAgo: string;
};

export type ChildProfile = {
  id: string;
  displayName: string;
  ageRangeLabel: string;
  interests: string[];
  avatarInitials: string;
  permissions: {
    joinActivities: "parent_only" | "trusted_hosts" | "neighborhood";
    shareFirstNameOnly: boolean;
    showOnRsvp: boolean;
  };
};

export type HouseholdSettings = {
  householdName: string;
  primaryEmail: string;
  neighborhoodLabel: string;
  discoveryRadiusLabel: string;
  emailDigest: boolean;
  smsReminders: boolean;
  quietHours: { start: string; end: string };
};
