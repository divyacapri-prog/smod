import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE } from "@/lib/variants";

type BloomColors = { brand: string; deep: string };

function colorsForPath(pathname: string): BloomColors {
  // Match /sports, /socks, /regular, /buy/<slug>-..., etc.
  const seg = pathname.split("/").filter(Boolean);
  const slug = seg[0] === "buy" ? seg[1]?.split("-")[0] : seg[0];
  const v = VARIANTS.find((x) => x.slug === slug);
  const p = v?.palette;
  return {
    brand: p?.brand ?? BRAND_PALETTE.brand,
    deep: p?.brandDeep ?? BRAND_PALETTE.brandDeep,
  };
}

/**
 * Liquid Bloom transition — a subtle detergent pod dissolves outward
 * using the destination page's brand colors.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  const [blooms, setBlooms] = useState<{ id: number; x: number; y: number; colors: BloomColors }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", (evt: any) => {
      const toPath: string = evt?.toLocation?.pathname ?? evt?.to?.pathname ?? window.location.pathname;
      const id = Date.now() + Math.random();
      setBlooms((b) => [
        ...b,
        {
          id,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          colors: colorsForPath(toPath),
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
            <LiquidBloom key={b.id} x={b.x} y={b.y} colors={b.colors} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

function LiquidBloom({ x, y, colors }: { x: number; y: number; colors: BloomColors }) {
  const w = typeof window !== "undefined" ? window.innerWidth : 1440;
  const h = typeof window !== "undefined" ? window.innerHeight : 900;
  const dx = Math.max(x, w - x);
  const dy = Math.max(y, h - y);
  const cover = Math.ceil(Math.hypot(dx, dy) * 2.2);
  const { brand, deep } = colors;

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
        background: `radial-gradient(circle at 40% 38%, color-mix(in oklab, ${brand} 20%, transparent) 0%, color-mix(in oklab, ${brand} 45%, transparent) 40%, color-mix(in oklab, ${deep} 55%, transparent) 75%, color-mix(in oklab, ${deep} 35%, transparent) 100%)`,
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
      <motion.div
        className="absolute inset-[10%] rounded-full"
        style={{
          background: `radial-gradient(circle at 58% 52%, color-mix(in oklab, ${brand} 30%, transparent) 0%, color-mix(in oklab, ${brand} 18%, transparent) 45%, transparent 75%)`,
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
