/**
 * Inline SVG infographics for the "How it works" steps.
 * All strokes use currentColor so they inherit the active --brand-deep ink,
 * with var(--brand) / var(--accent) for fills.
 */

import { useEffect, useRef, useState, type ComponentType } from "react";

export function ScrollReplayIcon({
  Icon,
  className,
}: {
  Icon: ComponentType<{ className?: string }>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [replayKey, setReplayKey] = useState(0);
  const wasVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible.current) {
          setReplayKey((k) => k + 1);
          wasVisible.current = true;
        } else if (!entry.isIntersecting) {
          wasVisible.current = false;
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Icon key={replayKey} className={className} />
    </div>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HandDropPodIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* hand from top-right pinching a pod */}
      <g {...stroke}>
        {/* hand silhouette */}
        <path d="M140 18 L170 18 L170 70 Q170 86 154 86 L120 86" />
        <path d="M120 86 Q104 86 104 70 L104 50" />
        {/* fingers/pinch */}
        <path d="M110 56 L100 64" />
        <path d="M118 50 L108 58" />
      </g>
      {/* pod being dropped — plays once on mount */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 -8; 0 36; 0 -8" keyTimes="0; 0.6; 1" dur="2.4s" />
        <rect x="88" y="86" width="34" height="26" rx="11" fill="var(--brand)" />
        <circle cx="98" cy="96" r="5" fill="var(--accent)" opacity="0.95" />
        <circle cx="113" cy="103" r="3" fill="#fff" opacity="0.9" />
      </g>
      {/* motion lines + drum opening below */}
      <g {...stroke} opacity="0.55">
        <path d="M76 120 L72 130">
          <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2.4s" />
        </path>
        <path d="M134 120 L138 130">
          <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2.4s" />
        </path>
        <path d="M105 120 L105 132">
          <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2.4s" />
        </path>
      </g>
      {/* washing-machine top w/ open door */}
      <g {...stroke}>
        <path d="M40 196 L40 150 Q40 140 50 140 L150 140 Q160 140 160 150 L160 196" />
        <circle cx="100" cy="170" r="22" fill="var(--v-bg-soft)" />
        <path d="M82 158 Q100 148 118 158" />
      </g>
    </svg>
  );
}

export function LoadClothesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* washing machine */}
      <g {...stroke}>
        <rect x="32" y="28" width="136" height="160" rx="12" />
        {/* top panel */}
        <path d="M32 60 L168 60" />
        {/* knobs / display */}
        <circle cx="148" cy="44" r="4" fill="var(--brand)" />
        <rect x="44" y="40" width="40" height="8" rx="2" fill="var(--accent)" opacity="0.4" />
      </g>
      {/* drum */}
      <circle cx="100" cy="124" r="46" fill="var(--v-bg-soft)" stroke="currentColor" strokeWidth="4" />
      <circle cx="100" cy="124" r="34" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" opacity="0.6" />

      {/* shirt being loaded — drops into drum */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 -40; 0 0; 0 -40" keyTimes="0; 0.55; 1" dur="2.8s" repeatCount="indefinite" />
        <path
          d="M80 108 L92 100 L100 106 L108 100 L120 108 L116 124 L110 122 L110 142 L90 142 L90 122 L84 124 Z"
          fill="var(--brand)"
          opacity="0.95"
        />
        <path d="M92 100 Q100 96 108 100" {...stroke} stroke="#fff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* sock floating in — drops slightly offset */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="50 100; 58 138; 50 100" keyTimes="0; 0.65; 1" dur="2.8s" begin="0.4s" repeatCount="indefinite" />
        <g transform="rotate(-18)">
          <path d="M0 0 H14 V18 Q14 24 8 24 H0 Z" fill="var(--accent)" />
          <path d="M0 0 H14" {...stroke} stroke="#fff" strokeWidth="2" opacity="0.6" />
        </g>
      </g>

      {/* motion / drop arrows above the drum — pulse */}
      <g {...stroke} opacity="0.7">
        <animate attributeName="opacity" values="0.3; 0.9; 0.3" dur="2.8s" repeatCount="indefinite" />
        <path d="M70 76 L70 92" />
        <path d="M66 86 L70 92 L74 86" />
        <path d="M130 76 L130 92" />
        <path d="M126 86 L130 92 L134 86" />
      </g>
    </svg>
  );
}

export function SpinWashIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* machine body */}
      <g {...stroke}>
        <rect x="32" y="28" width="136" height="160" rx="12" />
        <path d="M32 60 L168 60" />
        <circle cx="148" cy="44" r="4" fill="var(--brand)" />
        <rect x="44" y="40" width="40" height="8" rx="2" fill="var(--accent)" opacity="0.5" />
      </g>

      {/* drum filled with swirling water */}
      <circle cx="100" cy="124" r="46" fill="var(--brand)" opacity="0.15" stroke="currentColor" strokeWidth="4" />
      <circle cx="100" cy="124" r="46" fill="none" stroke="var(--brand)" strokeWidth="3" strokeDasharray="6 6">
        <animateTransform attributeName="transform" type="rotate" from="0 100 124" to="360 100 124" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* swirling water arrows */}
      <g fill="none" stroke="var(--brand-deep)" strokeWidth="3" strokeLinecap="round">
        <g style={{ transformOrigin: "100px 124px" }}>
          <path d="M100 92 A32 32 0 0 1 132 124">
            <animateTransform attributeName="transform" type="rotate" from="0 100 124" to="360 100 124" dur="3.5s" repeatCount="indefinite" />
          </path>
          <path d="M132 124 L128 118 M132 124 L138 122">
            <animateTransform attributeName="transform" type="rotate" from="0 100 124" to="360 100 124" dur="3.5s" repeatCount="indefinite" />
          </path>
        </g>
        <g>
          <path d="M100 156 A32 32 0 0 1 68 124">
            <animateTransform attributeName="transform" type="rotate" from="0 100 124" to="360 100 124" dur="3.5s" repeatCount="indefinite" />
          </path>
          <path d="M68 124 L72 130 M68 124 L62 126">
            <animateTransform attributeName="transform" type="rotate" from="0 100 124" to="360 100 124" dur="3.5s" repeatCount="indefinite" />
          </path>
        </g>
      </g>

      {/* bubbles */}
      <g fill="#fff" opacity="0.9">
        <circle cx="86" cy="116" r="3" />
        <circle cx="114" cy="132" r="2" />
        <circle cx="96" cy="138" r="2.5" />
      </g>

      {/* sparkle stars outside */}
      <g fill="var(--accent)">
        <path d="M44 96 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z" />
        <path d="M168 110 l1.5 4.5 4.5 1.5 -4.5 1.5 -1.5 4.5 -1.5 -4.5 -4.5 -1.5 4.5 -1.5 z" />
      </g>
    </svg>
  );
}
