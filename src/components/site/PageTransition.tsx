import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter, useRouterState } from "@tanstack/react-router";

/**
 * Premium page transition:
 * 1. Current page fades out
 * 2. A soft liquid gradient overlay (deep indigo → lavender) sweeps across
 * 3. New page fades in with a subtle upward movement
 *
 * Duration target: ~450ms total.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  const [sweepKey, setSweepKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", () => {
      setSweepKey((k) => k + 1);
    });
    return () => unsub();
  }, [router]);

  // SSR / first paint: render children plainly so server HTML matches.
  if (!mounted) return <>{children}</>;

  if (reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {sweepKey > 0 && (
          <SweepOverlay key={sweepKey} onDone={() => { /* GC handled by AnimatePresence */ }} />
        )}
      </AnimatePresence>
    </>
  );
}

function SweepOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 220);
    const t2 = setTimeout(onDone, 520);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      initial={{ x: "-105%" }}
      animate={{ x: phase === "in" ? "0%" : "105%" }}
      transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      style={{
        background:
          "linear-gradient(120deg, #2A3A86 0%, #4A4E97 45%, #756CA1 100%)",
        boxShadow: "0 0 80px rgba(42,58,134,0.45)",
        filter: "saturate(1.05)",
      }}
    >
      {/* soft liquid highlight */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 30% 40%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(50% 70% at 75% 65%, rgba(255,255,255,0.12), transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}
