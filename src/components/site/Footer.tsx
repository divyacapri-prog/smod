import { Link } from "@tanstack/react-router";
import { VARIANTS } from "@/lib/variants";

export function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "color-mix(in oklab, var(--v-ink, #000) 10%, transparent)", background: "var(--v-bg-soft, #f4f4f4)" }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--brand, #111)" }}>◐</span>
            <span style={{ color: "var(--v-ink)" }}>PODWASH</span>
          </div>
          <p className="mt-3 text-sm" style={{ color: "var(--v-ink-soft)" }}>
            Precision laundry pods, engineered for the way you actually wash.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink)" }}>Shop</p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>
            {VARIANTS.map((v) => (
              <li key={v.slug}><Link to={`/${v.slug}` as string} className="hover:underline">{v.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink)" }}>Help</p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>
            <li>Shipping & returns</li>
            <li>Subscriptions</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--v-ink)" }}>Company</p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>
            <li>Our science</li>
            <li>Sustainability</li>
            <li>Press</li>
          </ul>
        </div>
      </div>
      <div className="border-t px-5 py-5 text-center text-xs" style={{ borderColor: "color-mix(in oklab, var(--v-ink, #000) 10%, transparent)", color: "var(--v-ink-soft)" }}>
        © {new Date().getFullYear()} Podwash Labs. All rights reserved.
      </div>
    </footer>
  );
}
