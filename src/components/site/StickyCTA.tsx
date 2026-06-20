import { Link } from "@tanstack/react-router";
import type { Variant } from "@/lib/variants";

export function StickyCTA({ variant }: { variant: Variant }) {
  const [p20, p40] = variant.packs;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div
        className="pointer-events-auto flex w-full max-w-2xl items-center gap-2 rounded-full border p-2 backdrop-blur-xl sm:gap-3"
        style={{
          background: "color-mix(in oklab, var(--v-surface) 70%, transparent)",
          borderColor: "color-mix(in oklab, var(--v-ink) 12%, transparent)",
          boxShadow: "0 20px 50px -20px rgba(0,0,0,0.35)",
        }}
      >
        <div className="hidden flex-1 px-3 text-sm font-semibold sm:block" style={{ color: "var(--v-ink)" }}>
          {variant.name} · from ₹{p20.price}
        </div>
        <Link
          to={p20.buyPath}
          className="flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold transition-transform hover:scale-[1.02]"
          style={{ background: "var(--v-bg-soft)", color: "var(--brand-deep)" }}
        >
          20 Pods · ₹{p20.price}
        </Link>
        <Link
          to={p40.buyPath}
          className="flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          style={{ background: "var(--brand)" }}
        >
          40 Pods · ₹{p40.price}
        </Link>
      </div>
    </div>
  );
}
