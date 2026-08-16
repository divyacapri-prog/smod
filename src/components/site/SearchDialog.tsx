import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { VARIANTS, COMING_SOON, pouchFor } from "@/lib/variants";

type Row = {
  key: string;
  slug: string;
  title: string;
  sub: string;
  price: string;
  image?: string;
  disabled?: boolean;
};

/**
 * Command-palette style product search. Opens on click or Cmd/Ctrl+K.
 * The index is built from VARIANTS at render time, so adding a variant to
 * lib/variants.ts is all that's needed for it to become searchable.
 * Coming-soon products appear but are not selectable until `available` is true.
 *
 * Portalled into document.body for the same reason as Splash: PageTransition
 * leaves a `filter: blur(0px)` on its wrapper, which captures `position: fixed`
 * descendants and would anchor this overlay to the page instead of the viewport.
 */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTerm("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const rows = useMemo<Row[]>(() => {
    const t = term.trim().toLowerCase();
    const out: Row[] = [];
    VARIANTS.forEach((v) => {
      v.packs.forEach((p) => {
        const hay = [
          v.name, v.tagline, v.headline, v.description,
          v.packaging.fragrance, v.packaging.machines.join(" "),
          `${p.size}`, `${p.size} pod`, p.bestFor, p.household,
        ].join(" ").toLowerCase();
        if (!t || hay.includes(t)) {
          out.push({
            key: p.sku,
            slug: v.slug,
            title: `SMOD ${v.name} · ${p.size} pods`,
            sub: `${v.tagline} — ₹${Math.round(p.perWash)}/wash`,
            price: `₹${p.price.toLocaleString("en-IN")}`,
            image: pouchFor(v, p.size),
          });
        }
      });
    });
    COMING_SOON.filter((c) => !c.available).forEach((c) => {
      const hay = `${c.name} ${c.body}`.toLowerCase();
      if (!t || hay.includes(t)) {
        out.push({
          key: c.slug, slug: c.slug, title: c.name,
          sub: "Not yet available", price: "Coming soon", disabled: true,
        });
      }
    });
    return out;
  }, [term]);

  if (!open) return null;

  const pick = (r: Row) => {
    if (r.disabled) return;
    onClose();
    navigate({ to: `/${r.slug}` as string });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-5 pt-[9vh] backdrop-blur-sm"
      style={{ background: "rgba(15,17,24,.5)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div
        className="w-full max-w-[620px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && rows[0]) pick(rows[0]); }}
          placeholder="Search products, pack sizes, fabrics…"
          aria-label="Search"
          className="w-full border-0 border-b px-6 py-5 text-[17px] outline-none"
          style={{ borderColor: "rgba(29,32,41,.11)" }}
        />
        <div className="max-h-[52vh] overflow-auto p-2">
          {rows.length === 0 ? (
            <p className="p-6 text-center text-sm" style={{ color: "#728198" }}>
              No products match &ldquo;{term}&rdquo;.
            </p>
          ) : (
            rows.slice(0, 10).map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => pick(r)}
                disabled={r.disabled}
                className="flex w-full items-center gap-4 rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-black/[0.04] disabled:cursor-default disabled:opacity-55 disabled:hover:bg-transparent"
              >
                {r.image ? (
                  <img src={r.image} alt="" className="h-[52px] w-[42px] object-contain" loading="lazy" />
                ) : (
                  <span className="h-[52px] w-[42px]" aria-hidden />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-bold">{r.title}</span>
                  <span className="block truncate text-xs" style={{ color: "#728198" }}>{r.sub}</span>
                </span>
                <span className="text-[13px] font-extrabold" style={{ color: r.disabled ? "#728198" : "inherit" }}>
                  {r.price}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
