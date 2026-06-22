import { Link } from "@tanstack/react-router";
import { VARIANTS } from "@/lib/variants";
import { useCart } from "@/lib/cart";
import smodLogo from "@/assets/smod-logo.png.asset.json";

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl" style={{ background: "color-mix(in oklab, var(--v-bg, #fff) 75%, transparent)", borderBottom: "1px solid color-mix(in oklab, var(--v-ink, #000) 8%, transparent)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-black tracking-tight" aria-label="SMOD home">
          <img src={smodLogo.url} alt="SMOD" className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              to={`/${v.slug}` as string}
              className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5"
              style={{ color: "var(--v-ink-soft, #444)" }}
              activeProps={{ style: { color: "var(--v-ink, #000)", background: "color-mix(in oklab, var(--brand, #000) 12%, transparent)" } }}
            >
              {v.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5"
            style={{ color: "var(--v-ink-soft, #444)" }}
            activeProps={{ style: { color: "var(--v-ink, #000)", background: "color-mix(in oklab, var(--brand, #000) 12%, transparent)" } }}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors hover:bg-black/5"
            style={{ borderColor: "color-mix(in oklab, var(--v-ink, #000) 12%, transparent)", color: "var(--v-ink, #111)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M6 6L4 2H1" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span
                className="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black text-white"
                style={{ background: "var(--brand, #111)" }}
              >
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/regular"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:inline-flex"
            style={{ background: "var(--brand, #111)" }}
          >
            Shop
          </Link>
        </div>
      </div>
    </header>
  );
}
