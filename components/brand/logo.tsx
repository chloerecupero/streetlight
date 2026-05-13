import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show wordmark beside mark */
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative flex size-9 items-center justify-center rounded-2xl bg-forest text-cream shadow-sm ring-1 ring-forest/10"
        aria-hidden
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4v22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 8c-2.5 2-4 4.2-4 6.5 0 2.1 1.5 3.5 4 3.5s4-1.4 4-3.5C20 12.2 18.5 10 16 8Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="6" r="1.6" fill="currentColor" />
        </svg>
      </span>
      {showWordmark ? (
        <span className="font-heading text-lg font-medium tracking-tight text-foreground">
          Streetlight
        </span>
      ) : null}
    </span>
  );
}
