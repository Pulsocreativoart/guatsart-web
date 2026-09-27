type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <svg
      aria-label="GÜATSART"
      className={className}
      role="img"
      viewBox={compact ? "0 0 64 64" : "0 0 352 64"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32C8 16 18 8 32 8c9 0 17 4 22 11L43 29c-3-5-7-7-12-7-7 0-11 5-11 11s4 11 12 11c4 0 7-1 10-4v-5H31" strokeWidth="3" />
        <path d="M13 51 52 12" opacity=".42" strokeWidth="1.5" />
        <circle cx="25" cy="3.5" fill="currentColor" stroke="none" r="2.5" />
        <circle cx="38" cy="3.5" fill="currentColor" stroke="none" r="2.5" />
      </g>
      {!compact && (
        <text fill="currentColor" fontFamily="var(--font-display), Arial, sans-serif" fontSize="31" fontWeight="600" letterSpacing="2.7" x="78" y="42">
          GÜATSART
        </text>
      )}
    </svg>
  );
}
