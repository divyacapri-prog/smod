import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variant } from "@/lib/variants";
import { pouchFor } from "@/lib/variants";
import podMacro from "@/assets/smod-pack-front.png";

type Shot = { src: string; label: string; size?: 20 | 40 };

/**
 * Product gallery — main image plus a thumbnail strip.
 *
 * Uses the stand-up pouch renders for both pack sizes; the pod macro is a
 * single shared asset across every variant. `packSize` keeps the gallery in
 * sync with the pack selector in the buy column. Shots that don't exist yet
 * render as dashed placeholders instead of breaking the strip.
 */
export function ProductGallery({ variant, packSize }: { variant: Variant; packSize?: 20 | 40 }) {
  const shots: Shot[] = [
    { src: pouchFor(variant, 40) ?? "", label: "40-pod pouch", size: 40 },
    { src: pouchFor(variant, 20) ?? "", label: "20-pod pouch", size: 20 },
    { src: podMacro, label: "Pod macro" },
  ].filter((s) => Boolean(s.src));

  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [variant.slug]);

  // Follow the pack selector, but don't yank the user off the pod macro.
  useEffect(() => {
    if (!packSize) return;
    const i = shots.findIndex((s) => s.size === packSize);
    if (i >= 0) setActive(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packSize, variant.slug]);

  const pending = ["In drum", "Lifestyle"];
  const current = shots[active] ?? shots[0];

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-[2rem] border"
        style={{
          aspectRatio: "4 / 5",
          borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
          background: "linear-gradient(170deg, color-mix(in oklab, var(--v-bg-soft) 60%, white), var(--v-bg-soft))",
        }}
      >
        <span
          className="absolute left-5 top-5 z-[2] rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur"
          style={{ background: "rgba(255,255,255,0.85)", color: "var(--brand)" }}
        >
          {variant.emoji} SMOD {variant.name}
        </span>

        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={current?.src}
            alt={`SMOD ${variant.name} — ${current?.label}`}
            className="absolute left-[6%] top-[5%] h-[90%] w-[88%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.28)]"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="smod-thumbs mt-4">
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={s.label}
            aria-current={i === active}
            className="relative h-[92px] w-[76px] shrink-0 overflow-hidden rounded-xl border-[1.5px] transition-shadow"
            style={{
              borderColor: i === active ? "var(--brand)" : "color-mix(in oklab, var(--v-ink) 12%, transparent)",
              background: "var(--v-bg-soft)",
              boxShadow: i === active ? "0 0 0 3px color-mix(in oklab, var(--brand) 14%, transparent)" : undefined,
            }}
          >
            <img src={s.src} alt="" className="absolute left-[8%] top-[6%] h-[88%] w-[84%] object-contain" loading="lazy" />
          </button>
        ))}

        {pending.map((label) => (
          <span
            key={label}
            aria-hidden
            className="grid h-[92px] w-[76px] shrink-0 place-items-center rounded-xl border-[1.5px] border-dashed px-1 text-center text-[8.5px] font-extrabold uppercase leading-tight tracking-[0.05em]"
            style={{ borderColor: "color-mix(in oklab, var(--v-ink) 18%, transparent)", color: "#B4BCCB" }}
          >
            {label}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>
        Pouch renders for both pack sizes. The pod macro is one shared asset across all five
        variants — the two dashed slots are the shots still to be produced.
      </p>
    </div>
  );
}
