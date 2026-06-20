import { Link } from "@tanstack/react-router";
import { VARIANTS } from "@/lib/variants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl" style={{ background: "color-mix(in oklab, var(--v-bg, #fff) 75%, transparent)", borderBottom: "1px solid color-mix(in oklab, var(--v-ink, #000) 8%, transparent)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--brand, #111)" }}>
            <span aria-hidden>◐</span>
          </span>
          <span className="text-lg" style={{ color: "var(--v-ink, #111)" }}>PODWASH</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              to={`/${v.slug}` as string}
              className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5"
              style={{ color: "var(--v-ink-soft, #444)" }}
              activeProps={{ style: { color: "var(--brand-deep, #000)", background: "color-mix(in oklab, var(--brand, #000) 12%, transparent)" } }}
            >
              {v.name}
            </Link>
          ))}
        </nav>
        <Link
          to="/regular"
          className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:inline-flex"
          style={{ background: "var(--brand, #111)" }}
        >
          Shop
        </Link>
      </div>
    </header>
  );
}
