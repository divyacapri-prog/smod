/**
 * Monochrome line icons for the feature / benefit grids and trust chips.
 * All strokes use currentColor so they inherit the brand ink — no multicolour,
 * no emoji. Sized to fill the .feature-icon box; stroke-based to match StepIcons.
 */

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type P = { className?: string };
const box = (className = "") => ({
  viewBox: "0 0 100 100",
  className,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
});

/* ---- 4-in-1 grid ---- */

// Detergent — a pod (rounded pill) with a droplet inside
export function PodIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <rect x="20" y="30" width="60" height="42" rx="20" {...s} />
      <path d="M50 40c-6 8-11 13-11 19a11 11 0 0022 0c0-6-5-11-11-19z" {...s} />
    </svg>
  );
}

// Comforter — a folded / stacked cloth
export function ClothIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M22 42l28-14 28 14-28 14-28-14z" {...s} />
      <path d="M22 58l28 14 28-14" {...s} />
    </svg>
  );
}

// Softener — a single leaf / petal with a vein (no colour fill)
export function SoftenerIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M30 70c0-24 18-42 40-44-2 22-20 40-40 44z" {...s} />
      <path d="M38 62c10-10 18-18 24-28" {...s} />
    </svg>
  );
}

// Anti-microbial — shield with a check
export function ShieldIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M50 20l24 9v18c0 18-12 28-24 33-12-5-24-15-24-33V29l24-9z" {...s} />
      <path d="M40 50l7 7 14-15" {...s} />
    </svg>
  );
}

/* ---- Why-pods grid ---- */

// Pre-measured — balance / scale
export function ScaleIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M50 24v52M30 76h40" {...s} />
      <path d="M24 40h52" {...s} />
      <path d="M24 40l-8 16a8 8 0 0016 0l-8-16zM76 40l-8 16a8 8 0 0016 0l-8-16z" {...s} />
    </svg>
  );
}

// Travel friendly — suitcase
export function SuitcaseIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <rect x="24" y="38" width="52" height="40" rx="6" {...s} />
      <path d="M40 38v-8a4 4 0 014-4h12a4 4 0 014 4v8M50 46v24" {...s} />
    </svg>
  );
}

// Easy storage — box
export function BoxIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M50 26l26 12v24L50 74 24 62V38l26-12z" {...s} />
      <path d="M24 38l26 12 26-12M50 50v24" {...s} />
    </svg>
  );
}

// Bio-degradable — leaf
export function LeafIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M28 72c0-26 20-46 46-46 0 26-20 46-46 46z" {...s} />
      <path d="M38 62c8-14 18-24 30-30" {...s} />
    </svg>
  );
}

// Premium clean — sparkle
export function SparkleIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M50 22c2 14 8 20 22 22-14 2-20 8-22 22-2-14-8-20-22-22 14-2 20-8 22-22z" {...s} />
    </svg>
  );
}

/* ---- Hero trust chips (small, inline) ---- */

export function CrueltyFreeIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M40 54c-6-2-10-8-10-16 0-6 2-12 6-12s6 6 6 14M60 54c6-2 10-8 10-16 0-6-2-12-6-12s-6 6-6 14" {...s} />
      <circle cx="50" cy="64" r="14" {...s} />
      <path d="M45 62h.1M55 62h.1" {...s} strokeWidth={6} />
    </svg>
  );
}

export function RecycleIcon({ className }: P) {
  return (
    <svg {...box(className)}>
      <path d="M50 28l8 14h-16l8-14zM32 54l-8 14 14 2M68 54l8 14-14 2" {...s} />
      <path d="M42 42L30 62M58 42l12 20M36 72h28" {...s} opacity={0.9} />
    </svg>
  );
}
