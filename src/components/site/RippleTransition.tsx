import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Full-screen ripple overlay triggered on route changes.
 * Captures the last click position so the ripple emanates from where the user
 * clicked; falls back to viewport center.
 */
export function RippleTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const originRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const firstRender = useRef(true);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Track click origin for the upcoming navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      originRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const { x, y } = originRef.current.x || originRef.current.y
      ? originRef.current
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    const t = setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== id));
    }, 1100);
    return () => clearTimeout(t);
  }, [pathname]);

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
