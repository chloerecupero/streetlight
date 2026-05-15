import type { ActivityCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const categorySurface: Record<ActivityCategory, string> = {
  outdoor: "from-sage/35 via-butter/15 to-cream",
  sports: "from-terracotta/20 via-sage/25 to-cream",
  creative: "from-butter/30 via-muted to-cream",
  social: "from-sage/25 via-terracotta/15 to-cream",
};

export function ActivityCategoryStripe({
  category,
  className,
}: {
  category: ActivityCategory;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-2 w-full rounded-full bg-gradient-to-r",
        categorySurface[category],
        className
      )}
      aria-hidden
    />
  );
}
