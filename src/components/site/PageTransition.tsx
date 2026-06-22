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
          "radial-gradient(circle at 38% 35%, rgba(255,255,255,0.55) 0%, rgba(178,196,235,0.55) 12%, #756CA1 38%, #2A3A86 72%, #1d2a66 100%)",
        filter: "blur(14px) saturate(115%)",
        mixBlendMode: "normal",
        willChange: "transform, opacity, filter",
      }}
      initial={{ scale: 0.02, opacity: 0, filter: "blur(24px) saturate(120%)" }}
      animate={{
        scale: [0.02, 0.18, 1],
        opacity: [0, 1, 1, 0],
        filter: [
          "blur(24px) saturate(120%)",
          "blur(18px) saturate(115%)",
          "blur(14px) saturate(110%)",
          "blur(28px) saturate(105%)",
        ],
      }}
      transition={{
        duration: 0.75,
        times: [0, 0.18, 0.62, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* secondary inner bloom — softer violet swirl */}
      <motion.div
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 55%, rgba(255,255,255,0.35) 0%, rgba(117,108,161,0.6) 35%, transparent 70%)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.1, 1], opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
      {/* diffusion specks — like detergent particles dispersing */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 20% 70%, rgba(255,255,255,0.25), transparent 18%), radial-gradient(circle at 78% 30%, rgba(255,255,255,0.18), transparent 16%), radial-gradient(circle at 55% 80%, rgba(178,196,235,0.25), transparent 22%)",
          filter: "blur(10px)",
          mixBlendMode: "screen",
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.05, 1.15], opacity: [0, 0.85, 0] }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
      />
    </motion.div>
  );
}
