/**
 * Water effects around the hero pod: rising bubbles, a slow swirl, ripple rings
 * and splash droplets. Pure CSS — the keyframes live in src/styles.css.
 *
 * Positions and delays are hard-coded rather than random so every render (and
 * every SSR pass) is identical. The whole effect is disabled under
 * `prefers-reduced-motion` via the stylesheet.
 */

// [leftPercent, sizePx, durationBase, delaySeconds, driftPx]
const BUBBLES: [number, number, number, number, number][] = [
  [6, 30, 7.5, 0.0, 26], [14, 17, 9.5, 3.1, -18], [21, 38, 5.5, 5.4, 34],
  [29, 22, 12.0, 1.4, -26], [37, 13, 7.0, 6.8, 16], [44, 32, 10.5, 3.9, -32],
  [51, 19, 6.0, 8.2, 22], [58, 42, 13.5, 0.8, -14], [65, 25, 8.0, 4.6, 30],
  [72, 15, 5.0, 7.4, -20], [79, 34, 11.0, 2.2, 18], [86, 20, 4.5, 9.1, -28],
  [93, 27, 6.5, 5.9, 12], [10, 44, 5.0, 10.3, -22], [25, 12, 7.5, 6.2, 28],
  [40, 48, 4.0, 3.3, -16], [55, 28, 3.5, 11.1, 20], [70, 36, 4.5, 9.7, -24],
  [82, 11, 8.5, 1.9, 24], [17, 26, 6.0, 8.8, -30], [48, 16, 9.0, 2.7, 14],
  [63, 46, 5.5, 10.9, -12], [90, 40, 7.0, 4.1, 32], [34, 34, 10.0, 7.9, -26],
];

// [offsetX, offsetY, durationSeconds, delaySeconds]
const DROPS: [number, number, number, number][] = [
  [-205, -115, 4.4, 0.0], [210, -92, 5.0, 1.6], [-165, 128, 4.6, 3.1],
  [190, 148, 5.2, 4.7], [-55, -185, 4.2, 2.2], [80, -200, 4.8, 5.6],
  [-235, 28, 5.4, 3.9], [245, 46, 4.4, 0.8], [-95, 185, 5.0, 6.3],
  [115, 195, 4.6, 2.9], [-260, -35, 5.2, 5.1], [265, -18, 4.8, 6.9],
];

type BubbleStyle = React.CSSProperties & { "--dx"?: string };
type DropStyle = React.CSSProperties & { "--sx"?: string; "--sy"?: string; "--sr"?: string };

function Bubble({ spec, scale = 1 }: { spec: (typeof BUBBLES)[number]; scale?: number }) {
  const [left, size, dur, delay, dx] = spec;
  const style: BubbleStyle = {
    left: `${left}%`,
    width: `${size * scale}px`,
    height: `${size * scale}px`,
    animationDuration: `${dur + 6}s`,
    animationDelay: `${delay}s`,
    "--dx": `${dx}px`,
  };
  return <span className="smod-bubble" style={style} />;
}

export function HeroWaterFX({ layer }: { layer: "back" | "front" }) {
  const isBack = layer === "back";
  // Larger, slower bubbles sit behind the pod; smaller ones and every droplet
  // pass in front, so the splash reads over the product rather than under it.
  const bubbles = BUBBLES.filter((_, i) => (isBack ? i % 2 === 0 : i % 2 === 1));

  return (
    <div className={`smod-fx ${isBack ? "smod-fx-back" : "smod-fx-front"}`} aria-hidden>
      {isBack && (
        <>
          <span className="smod-swirl">
            <svg viewBox="0 0 200 200" fill="none">
              <g className="smod-swirl-a" stroke="rgba(201,190,242,.75)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="10 13">
                <circle cx="100" cy="100" r="72" />
              </g>
              <g className="smod-swirl-b" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 16">
                <circle cx="100" cy="100" r="92" />
              </g>
              <g className="smod-swirl-a" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinecap="round">
                <path d="M100 44 A56 56 0 0 1 156 100" />
                <path d="M100 156 A56 56 0 0 1 44 100" />
              </g>
            </svg>
          </span>
          {[0, 1, 2].map((i) => (
            <span key={`ring-${i}`} className="smod-ring" style={{ animationDelay: `${i * 1.7}s` }} />
          ))}
        </>
      )}

      {bubbles.map((b, i) => (
        <Bubble key={`b-${layer}-${i}`} spec={b} scale={isBack ? 1 : 0.7} />
      ))}

      {!isBack &&
        DROPS.map(([sx, sy, dur, delay], i) => {
          const style: DropStyle = {
            left: "50%",
            top: "50%",
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
            "--sx": `${sx}px`,
            "--sy": `${sy}px`,
            "--sr": `${sx > 0 ? 60 : -60}deg`,
          };
          return <span key={`d-${i}`} className="smod-drop" style={style} />;
        })}
    </div>
  );
}
