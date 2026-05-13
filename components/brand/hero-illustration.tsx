export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 420"
      className={className}
      role="img"
      aria-label="Warm evening on a quiet neighborhood street"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE9E0" />
          <stop offset="100%" stopColor="#F6F1E8" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#F2C968" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#F2C968" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F2C968" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="#183B2D"
            floodOpacity="0.08"
          />
        </filter>
      </defs>
      <rect width="560" height="420" fill="url(#sky)" rx="28" />
      <ellipse cx="280" cy="360" rx="220" ry="14" fill="#DDD8CC" opacity="0.55" />

      {/* Distant houses */}
      <g opacity="0.85" filter="url(#softShadow)">
        <path
          d="M72 292h96v72H72v-72Zm116 0h78v72H188v-72Zm96 0h110v72H284v-72Z"
          fill="#E8EDE3"
          stroke="#C9D4C4"
          strokeWidth="1.25"
        />
        <path d="M96 268l24-28 24 28v96H96V268Z" fill="#FDFBF6" stroke="#DDD8CC" />
        <path d="M392 252l32-36 32 36v112h-64V252Z" fill="#FDFBF6" stroke="#DDD8CC" />
      </g>

      {/* Trees */}
      <g>
        <circle cx="120" cy="248" r="26" fill="#A9B998" opacity="0.55" />
        <circle cx="138" cy="232" r="20" fill="#A9B998" opacity="0.45" />
        <rect x="124" y="248" width="10" height="56" rx="3" fill="#183B2D" opacity="0.35" />
        <circle cx="448" cy="236" r="30" fill="#A9B998" opacity="0.5" />
        <circle cx="468" cy="218" r="22" fill="#A9B998" opacity="0.4" />
        <rect x="452" y="236" width="12" height="64" rx="3" fill="#183B2D" opacity="0.32" />
      </g>

      {/* Streetlight glow */}
      <circle cx="280" cy="168" r="120" fill="url(#lampGlow)" />

      {/* Pole + lamp */}
      <g filter="url(#softShadow)">
        <rect x="272" y="168" width="16" height="168" rx="6" fill="#183B2D" />
        <path
          d="M248 176c0-18 14-32 32-32s32 14 32 32v10H248v-10Z"
          fill="#183B2D"
        />
        <path
          d="M256 178h48a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8v-6a8 8 0 0 1 8-8Z"
          fill="#F2C968"
          opacity="0.92"
        />
      </g>

      {/* Kids on bikes — minimal silhouettes */}
      <g opacity="0.55" fill="#183B2D">
        <circle cx="168" cy="332" r="9" />
        <path
          d="M152 348h36l-6 28h-24l-6-28Zm8 28l-10 34M180 376l12 34"
          stroke="#183B2D"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="196" cy="354" r="14" fill="none" stroke="#183B2D" strokeWidth="4" />
      </g>
      <g opacity="0.45" fill="#183B2D">
        <circle cx="392" cy="328" r="8" />
        <path
          d="M380 340h28l-4 26h-20l-4-26Zm4 26l-8 32M404 352l10 30"
          stroke="#183B2D"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="418" cy="350" r="12" fill="none" stroke="#183B2D" strokeWidth="3.5" />
      </g>

      {/* Chalk hopscotch hint */}
      <g stroke="#E58B5B" strokeWidth="2" strokeOpacity="0.35" fill="none">
        <path d="M340 360h18v18h-18zM358 360h18v18h-18zM376 360h18v18h-18z" />
      </g>
    </svg>
  );
}
