import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Full-screen ripple overlay triggered on every route resolution.
 * Uses router.subscribe so it fires even when child trees remount.
 */
export function RippleTransition() {
  const router = useRouter();
  const originRef = useRef<{ x: number; y: number } | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      originRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointerdown", onClick, true);
    return () => window.removeEventListener("pointerdown", onClick, true);
  }, []);

  useEffect(() => {
    const fire = () => {
      const o = originRef.current ?? {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: o.x, y: o.y }]);
      setTimeout(() => {
        setRipples((r) => r.filter((rp) => rp.id !== id));
      }, 1200);
    };

    const unsubBefore = router.subscribe("onBeforeNavigate", fire);
    return () => {
      unsubBefore();
    };
  }, [router]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-burst"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}
