/**
 * Dripping wave borders from the SMOD packaging artwork.
 * - "top": a deep purple wavy/dripping edge anchored to the TOP of the parent
 * - "bottom": the same edge mirrored, anchored to the BOTTOM
 * - "both": render both edges
 * Color uses var(--brand-deep) by default; pass `color` to override.
 * Drop into any `relative` container.
 */
export function WavePattern({
  edge = "both",
  color,
  className = "",
  height = 120,
}: {
  edge?: "top" | "bottom" | "both";
  color?: string;
  className?: string;
  height?: number;
}) {
  const fill = color ?? "var(--brand-deep)";

  // Dripping wave: a wide rectangle that bleeds off, with a scalloped/drippy
  // bottom edge formed by alternating big and small bezier bulges.
  const DRIP_PATH =
    "M0,0 L1200,0 L1200,70 " +
    "C1140,140 1080,40 1020,90 " +
    "C960,150 900,60 840,110 " +
    "C780,160 720,70 660,120 " +
    "C600,170 540,80 480,130 " +
    "C420,180 360,90 300,140 " +
    "C240,190 180,100 120,150 " +
    "C60,200 30,110 0,150 Z";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 ${className}`} style={{ top: 0, bottom: 0 }}>
      {(edge === "top" || edge === "both") && (
        <svg
          className="absolute left-0 right-0 top-0 w-full"
          style={{ height }}
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={DRIP_PATH} fill={fill} />
        </svg>
      )}
      {(edge === "bottom" || edge === "both") && (
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          style={{ height, transform: "scaleY(-1)" }}
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={DRIP_PATH} fill={fill} />
        </svg>
      )}
    </div>
  );
}
