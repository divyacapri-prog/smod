/**
 * Abstract artwork inspired by the SMOD packaging label —
 * organic flowing ribbons + speckled blob in cobalt / violet / cream / mist.
 * Use as a decorative backdrop. Absolutely positioned; sits inside any `relative` parent.
 */
export function AbstractArt({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="aa-mist" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#EFEAF7" />
          <stop offset="100%" stopColor="#E4DED3" />
        </radialGradient>
        <linearGradient id="aa-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#897BAA" />
          <stop offset="100%" stopColor="#5E4F86" />
        </linearGradient>
        <linearGradient id="aa-cobalt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A4B9B" />
          <stop offset="100%" stopColor="#1D2A6B" />
        </linearGradient>
        <pattern id="aa-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#1D2029" opacity="0.55" />
        </pattern>
      </defs>

      {/* Soft mist backdrop blob */}
      <path
        d="M120,220 C60,120 240,40 420,90 C620,150 780,80 760,300 C740,500 520,560 340,500 C170,440 180,320 120,220 Z"
        fill="url(#aa-mist)"
      />

      {/* Big violet ribbon sweep */}
      <path
        d="M80,360 C200,180 360,520 520,300 C620,160 760,260 720,420 C680,560 460,540 320,500 C200,470 100,500 80,360 Z"
        fill="url(#aa-violet)"
        opacity="0.85"
      />

      {/* Cobalt ribbon — leaf-like flowing form */}
      <path
        d="M180,440 C260,300 360,440 460,320 C540,220 680,260 640,400 C600,520 480,500 380,520 C300,535 220,520 180,440 Z"
        fill="url(#aa-cobalt)"
        opacity="0.95"
      />

      {/* Slim cobalt brush stroke */}
      <path
        d="M120,500 C260,420 380,540 520,440 C620,370 720,420 700,490"
        fill="none"
        stroke="#1D2A6B"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Cream / peach speckled blob */}
      <path
        d="M540,360 C600,330 700,360 700,420 C700,470 620,500 560,480 C500,460 480,390 540,360 Z"
        fill="#F1D9B5"
      />
      <path
        d="M540,360 C600,330 700,360 700,420 C700,470 620,500 560,480 C500,460 480,390 540,360 Z"
        fill="url(#aa-dots)"
      />

      {/* Tiny violet accent dot cluster */}
      <circle cx="240" cy="200" r="6" fill="#897BAA" opacity="0.9" />
      <circle cx="260" cy="220" r="3" fill="#2A4B9B" opacity="0.8" />
      <circle cx="220" cy="225" r="2" fill="#1D2029" opacity="0.7" />
    </svg>
  );
}
