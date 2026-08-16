import podBlue from "@/assets/pod-blue.png";
import podMagenta from "@/assets/pod-magenta.png";
import podLilac from "@/assets/pod-lilac.png";

/**
 * Scattered pod composition for the hero.
 *
 * The pods are cut straight out of smod-pack-front.png — same artwork, same
 * colours, nothing redrawn. They're just no longer locked into the pinwheel:
 * twelve of them at different sizes, each drifting at its own pace over a
 * water splash.
 *
 * `size`, `left` and `top` are percentages of the square container, so the
 * whole arrangement scales with the viewport. Everything is hard-coded (no
 * randomness) so SSR and client output match.
 */
type Pod = {
  src: string;
  size: number;   // % of container width
  left: number;
  top: number;
  dur: number;    // float duration, seconds
  delay: number;
  rot: number;
  z: number;
  opacity?: number;
};

const PODS: Pod[] = [
  // three big ones carry the composition
  { src: podMagenta, size: 42, left: 28, top: 4,  dur: 9,  delay: 0,   rot: -8,  z: 5 },
  { src: podBlue,    size: 34, left: 2,  top: 38, dur: 11, delay: 1.4, rot: 13,  z: 4 },
  { src: podLilac,   size: 30, left: 62, top: 34, dur: 8,  delay: 2.2, rot: -19, z: 4 },
  // mid
  { src: podBlue,    size: 22, left: 44, top: 60, dur: 12, delay: 0.8, rot: 24,  z: 3 },
  { src: podMagenta, size: 19, left: 74, top: 66, dur: 10, delay: 3.4, rot: -14, z: 3, opacity: 0.95 },
  { src: podLilac,   size: 17, left: 12, top: 68, dur: 13, delay: 1.9, rot: 31,  z: 3, opacity: 0.95 },
  // small
  { src: podBlue,    size: 13, left: 80, top: 8,  dur: 10, delay: 3.1, rot: -31, z: 2, opacity: 0.88 },
  { src: podLilac,   size: 12, left: 10, top: 12, dur: 14, delay: 4.2, rot: 27,  z: 2, opacity: 0.85 },
  { src: podMagenta, size: 11, left: 58, top: 84, dur: 12, delay: 5.0, rot: 16,  z: 2, opacity: 0.85 },
  // far / atmospheric
  { src: podBlue,    size: 8,  left: 34, top: 88, dur: 15, delay: 2.6, rot: -22, z: 1, opacity: 0.7 },
  { src: podLilac,   size: 7,  left: 90, top: 44, dur: 16, delay: 6.1, rot: 9,   z: 1, opacity: 0.65 },
  { src: podMagenta, size: 6,  left: 1,  top: 24, dur: 17, delay: 4.8, rot: -37, z: 1, opacity: 0.6 },
];

type PodStyle = React.CSSProperties & { "--rot"?: string };

export function HeroPods() {
  return (
    <div className="smod-pods" role="img" aria-label="SMOD laundry pods">
      {/* water splash behind the pods */}
      <svg className="smod-splash" viewBox="0 0 200 200" fill="none" aria-hidden>
        <g stroke="rgba(255,255,255,.42)" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path className="smod-splash-a" d="M100 26 A74 74 0 0 1 174 100" />
          <path className="smod-splash-b" d="M100 174 A74 74 0 0 1 26 100" />
        </g>
        <g stroke="rgba(201,190,242,.6)" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path className="smod-splash-a" d="M46 52 Q64 34 88 32" />
          <path className="smod-splash-b" d="M154 148 Q136 166 112 168" />
          <path className="smod-splash-a" d="M24 118 Q30 146 52 160" />
        </g>
        <g fill="rgba(255,255,255,.75)">
          <circle className="smod-splash-a" cx="30" cy="72" r="2.6" />
          <circle className="smod-splash-b" cx="172" cy="120" r="2.2" />
          <circle className="smod-splash-a" cx="120" cy="18" r="1.9" />
          <circle className="smod-splash-b" cx="72" cy="184" r="2.4" />
          <circle className="smod-splash-a" cx="186" cy="66" r="1.7" />
          <circle className="smod-splash-b" cx="14" cy="150" r="2.0" />
        </g>
      </svg>

      {PODS.map((p, i) => {
        const style: PodStyle = {
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: `${p.size}%`,
          zIndex: p.z,
          opacity: p.opacity ?? 1,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.delay}s`,
          "--rot": `${p.rot}deg`,
        };
        return (
          <img
            key={i}
            src={p.src}
            alt=""
            className="smod-pod"
            style={style}
            loading={i > 2 ? "lazy" : undefined}
          />
        );
      })}
    </div>
  );
}
