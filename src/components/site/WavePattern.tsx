/**
 * Decorative wave/brushstroke pattern inspired by the SMOD packaging artwork.
 * Uses currentColor and CSS vars (--brand, --accent, --brand-deep) so it tints
 * per palette. Place inside a `relative` parent; this component is absolute,
 * pointer-events-none, aria-hidden.
 */
export function WavePattern({
  variant = "soft",
  className = "",
}: {
  variant?: "soft" | "bold" | "dots";
  className?: string;
}) {
  if (variant === "dots") {
    return (
      <svg
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <pattern id="smod-dots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="currentColor" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#smod-dots)" />
      </svg>
    );
  }

  const opacity = variant === "bold" ? 0.55 : 0.18;

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      <defs>
        {/* dotted brushstroke pattern */}
        <pattern id="smod-dot-cluster" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.4" fill="var(--accent, currentColor)" />
        </pattern>
        <linearGradient id="smod-wave-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-deep, currentColor)" />
          <stop offset="1" stopColor="var(--brand, currentColor)" />
        </linearGradient>
        <linearGradient id="smod-wave-g2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--accent, currentColor)" />
          <stop offset="1" stopColor="var(--brand, currentColor)" />
        </linearGradient>
      </defs>

      <g opacity={opacity}>
        {/* Deep indigo organic blob */}
        <path
          d="M-80,420 C160,260 320,560 540,420 C760,280 880,520 1120,360 L1280,800 L-80,800 Z"
          fill="url(#smod-wave-g1)"
        />
        {/* Mid violet brushstroke */}
        <path
          d="M-40,520 C220,420 420,660 660,520 C860,400 1040,600 1280,500 L1280,800 L-40,800 Z"
          fill="url(#smod-wave-g2)"
          opacity="0.55"
        />
        {/* Cream dotted cluster following a wave */}
        <path
          d="M-40,300 C200,180 420,440 680,300 C900,180 1100,360 1280,260 L1280,420 C1080,500 880,340 660,460 C420,580 200,360 -40,460 Z"
          fill="url(#smod-dot-cluster)"
          opacity="0.7"
        />
        {/* Thin accent stroke */}
        <path
          d="M-40,200 C220,80 460,360 720,220 C940,120 1080,300 1280,200"
          fill="none"
          stroke="var(--accent, currentColor)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
