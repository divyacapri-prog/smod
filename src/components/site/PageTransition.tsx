import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter, useRouterState } from "@tanstack/react-router";

/**
 * Liquid Bloom transition — a detergent pod dissolves outward.
 *
 *  1. A tiny pod appears at the centre of the viewport
 *  2. It expands organically with soft blurred edges
 *  3. Deep cobalt (#2A3A86) and soft violet (#756CA1) bloom outward
 *  4. The bloom fills the viewport; new page fades in from within
 *  5. Bloom gently dissipates into the page background
 *
 * Total duration ~650ms.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  const [blooms, setBlooms] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", () => {
      const id = Date.now() + Math.random();
      setBlooms((b) => [
        ...b,
        {
          id,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
      ]);
      window.setTimeout(() => {
        setBlooms((b) => b.filter((bl) => bl.id !== id));
      }, 750);
    });
    return () => unsub();
  }, [router]);

  if (!mounted || reduce) return <>{children}</>;

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
        {children}
      </motion.div>

      <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        <AnimatePresence>
          {blooms.map((b) => (
            <LiquidBloom key={b.id} x={b.x} y={b.y} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

function LiquidBloom({ x, y }: { x: number; y: number }) {
  // Diameter needed to cover the viewport from origin (x, y)
  const w = typeof window !== "undefined" ? window.innerWidth : 1440;
  const h = typeof window !== "undefined" ? window.innerHeight : 900;
  const dx = Math.max(x, w - x);
  const dy = Math.max(y, h - y);
  const cover = Math.ceil(Math.hypot(dx, dy) * 2.2);

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: cover,
        height: cover,
        marginLeft: -cover / 2,
        marginTop: -cover / 2,
        borderRadius: "9999px",
        background:
          "radial-gradient(circle at 40% 38%, color-mix(in oklab, var(--brand) 20%, transparent) 0%, color-mix(in oklab, var(--brand) 45%, transparent) 40%, color-mix(in oklab, var(--brand-deep) 55%, transparent) 75%, color-mix(in oklab, var(--brand-deep) 35%, transparent) 100%)",
        filter: "blur(22px) saturate(108%)",
        willChange: "transform, opacity, filter",
      }}
      initial={{ scale: 0.04, opacity: 0, filter: "blur(28px) saturate(110%)" }}
      animate={{
        scale: [0.04, 0.22, 1],
        opacity: [0, 0.55, 0.55, 0],
        filter: [
          "blur(28px) saturate(110%)",
          "blur(24px) saturate(108%)",
          "blur(20px) saturate(105%)",
          "blur(32px) saturate(102%)",
        ],
      }}
      transition={{
        duration: 0.75,
        times: [0, 0.2, 0.62, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* secondary inner bloom — softer brand-tinted swirl */}
      <motion.div
        className="absolute inset-[10%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 58% 52%, color-mix(in oklab, var(--brand) 30%, transparent) 0%, color-mix(in oklab, var(--brand) 18%, transparent) 45%, transparent 75%)",
          filter: "blur(22px)",
          mixBlendMode: "screen",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.1, 1], opacity: [0, 0.45, 0] }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
    </motion.div>
  );
}
