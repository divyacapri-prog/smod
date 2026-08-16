import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldIcon, SuitcaseIcon, SparkleIcon, ScaleIcon } from "./FeatureIcons";

const CLAIMS = [
  { label: "Anti-microbial", Icon: ShieldIcon },
  { label: "Travel friendly", Icon: SuitcaseIcon },
  { label: "Premium clean", Icon: SparkleIcon },
  { label: "Pre-measured", Icon: ScaleIcon },
];

const INTERVAL = 2600;

/**
 * Rotating hero claim line. Falls back to a static, comma-separated list when
 * the visitor has asked for reduced motion.
 */
export function ClaimRotator() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % CLAIMS.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return (
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-2xl font-black tracking-tight text-white md:text-3xl">
        {CLAIMS.map((c) => (
          <li key={c.label} className="flex items-center gap-3">
            <c.Icon className="h-7 w-7" />
            {c.label}
          </li>
        ))}
      </ul>
    );
  }

  const current = CLAIMS[i];

  return (
    <div>
      <div className="relative mt-4 h-[58px] overflow-hidden md:h-[74px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            className="absolute inset-0 flex items-center gap-4 text-[32px] font-black leading-none tracking-tight text-white md:text-[46px]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="shrink-0" style={{ color: "var(--accent)" }}>
              <current.Icon className="h-8 w-8 md:h-11 md:w-11" />
            </span>
            <span>{current.label}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-1.5" aria-hidden>
        {CLAIMS.map((c, idx) => (
          <span
            key={c.label}
            className="h-[3px] w-6 rounded-full transition-colors duration-300"
            style={{ background: idx === i ? "var(--accent)" : "rgba(255,255,255,.22)" }}
          />
        ))}
      </div>
    </div>
  );
}
