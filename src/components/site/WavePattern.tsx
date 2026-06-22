/**
 * Layered wave borders inspired by SMOD packaging artwork.
 * Renders 1–3 stacked drippy edges using the brand primary + secondary colors.
 *
 * - `edge`: which side(s) the wave anchors to.
 * - `color` / `colors`: override the wave fills. If omitted, defaults to the
 *   current palette's primary + accent + brand-deep CSS variables.
 * - `height`: pixel height of the wave band.
 */
type WaveProps = {
  edge?: "top" | "bottom" | "both";
  color?: string;
  colors?: string[];
  className?: string;
  height?: number;
};

const DRIP_PATHS = [
  // Bold primary wave
  "M0,0 L1200,0 L1200,70 C1140,140 1080,40 1020,90 C960,150 900,60 840,110 C780,160 720,70 660,120 C600,170 540,80 480,130 C420,180 360,90 300,140 C240,190 180,100 120,150 C60,200 30,110 0,150 Z",
  // Secondary, offset
  "M0,0 L1200,0 L1200,40 C1130,110 1060,30 990,80 C920,130 850,50 780,100 C710,150 640,60 570,110 C500,160 430,70 360,120 C290,170 220,80 150,130 C90,170 40,90 0,120 Z",
  // Tertiary accent ribbon
  "M0,0 L1200,0 L1200,30 C1120,90 1050,20 970,60 C880,110 810,30 740,80 C660,140 590,50 520,90 C440,140 370,60 300,100 C220,150 150,70 80,110 C40,130 20,80 0,100 Z",
];

export function WavePattern({
  edge = "both",
  color,
  colors,
  className = "",
  height = 120,
}: WaveProps) {
  // Resolve fill stack: explicit `colors` > single `color` > palette tokens
  const stack =
    colors && colors.length > 0
      ? colors
      : color
        ? [color]
        : [
            "color-mix(in oklab, var(--brand-deep) 92%, transparent)",
            "color-mix(in oklab, var(--brand) 70%, transparent)",
            "color-mix(in oklab, var(--accent) 55%, transparent)",
          ];

  const renderEdge = (which: "top" | "bottom") => (
    <svg
      key={which}
      className={`absolute left-0 right-0 w-full ${which === "top" ? "top-0" : "bottom-0"}`}
      style={{ height, transform: which === "bottom" ? "scaleY(-1)" : undefined }}
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {stack.map((fill, i) => (
        <path key={i} d={DRIP_PATHS[i % DRIP_PATHS.length]} fill={fill} />
      ))}
    </svg>
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 ${className}`} style={{ top: 0, bottom: 0 }}>
      {(edge === "top" || edge === "both") && renderEdge("top")}
      {(edge === "bottom" || edge === "both") && renderEdge("bottom")}
    </div>
  );
}
