import type {
  Activity,
  ChildActivityStatus,
  JoinRequest,
  NeighborhoodUpdate,
} from "@/lib/types";

import { MOCK_ACTIVITIES } from "./activities";

export function getUpcomingActivities(): Activity[] {
  return MOCK_ACTIVITIES.slice(0, 3);
}

export function getJoinRequests(): JoinRequest[] {
  return [
    {
      id: "jr-1",
      activityTitle: "Pickup soccer (mixed ages)",
      fromFamily: "The Okonkwo household",
      status: "pending",
    },
    {
      id: "jr-2",
      activityTitle: "Slow roll to Maple Park",
      fromFamily: "The Patel household",
      status: "pending",
    },
  ];
}

export function getChildActivityStatuses(): ChildActivityStatus[] {
  return [
    {
      childId: "c1",
      childName: "Leo",
      status: "out",
      detail: "Bike ride with Maya’s group until 11:45 AM",
    },
    {
      childId: "c2",
      childName: "Noa",
      status: "pending",
      detail: "Awaiting your approval for scavenger hunt",
    },
  ];
}

export function getNeighborhoodUpdates(): NeighborhoodUpdate[] {
  return [
    {
      id: "nu-1",
      title: "Hydration station on Elm",
      body: "The Morris family is leaving a cooler with ice water on their porch during Saturday’s ride.",
      timeAgo: "2h ago",
    },
    {
      id: "nu-2",
      title: "Quiet hours reminder",
      body: "Movie night wraps by 10 PM — thanks for keeping voices gentle past the hedgerow.",
      timeAgo: "Yesterday",
    },
  ];
}
