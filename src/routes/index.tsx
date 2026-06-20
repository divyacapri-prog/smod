import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Podwash — Premium laundry pods for every load" },
      { name: "description", content: "Pre-measured, plant-based laundry pods engineered for every fabric: regular, baby, intimates, socks, and sportswear." },
      { property: "og:title", content: "Podwash — Premium laundry pods for every load" },
      { property: "og:description", content: "Five fabric-specific formulas. One smarter way to wash." },
    ],
  }),
  component: Home,
});

const HOME_PALETTE = {
  brand: "#111111",
  brandDeep: "#000000",
  accent: "#1E5BFF",
  bg: "#FAFAF7",
  bgSoft: "#F0F0EA",
  surface: "#FFFFFF",
  ink: "#0A0A0A",
  inkSoft: "#52525B",
};

function Home() {
  return (
    <div style={{ ...paletteToCssVars(HOME_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-0 h-[600px]" style={{ background: "radial-gradient(60% 60% at 50% 0%, #E6EEFF, transparent 70%)" }} />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur" style={{ borderColor: "rgba(0,0,0,0.08)", color: "#0B2E99" }}>
            ◐ Premium laundry science
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-6xl font-black leading-[1.02] tracking-tight md:text-8xl">
            One pod. <span style={{ background: "linear-gradient(90deg,#1E5BFF,#7A3CFF)", WebkitBackgroundClip: "text", color: "transparent" }}>Five formulas.</span> Zero guesswork.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "var(--v-ink-soft)" }}>
            Podwash makes a precision detergent pod for every load — from delicate intimates to high-performance activewear.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/regular" className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white">Shop all variants</Link>
            <a href="#variants" className="rounded-full border border-black/20 px-6 py-3 text-sm font-bold">Explore the range</a>
          </div>
        </div>
      </section>

      {/* VARIANTS GRID */}
      <section id="variants" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#1E5BFF" }}>The range</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">A pod for every load.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              to={`/${v.slug}` as string}
              className="group relative overflow-hidden rounded-3xl border p-8 transition-transform hover:-translate-y-1"
              style={{
                borderColor: "rgba(0,0,0,0.08)",
                background: `linear-gradient(150deg, ${v.palette.surface}, ${v.palette.bgSoft})`,
              }}
            >
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-60 blur-2xl" style={{ background: v.palette.brand }} />
              <div className="relative">
                <div className="text-4xl">{v.emoji}</div>
                <h3 className="mt-4 text-2xl font-black" style={{ color: v.palette.ink }}>{v.name}</h3>
                <p className="mt-2 text-sm" style={{ color: v.palette.inkSoft }}>{v.tagline}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: v.palette.brandDeep }}>From ₹{v.packs[0].price}</span>
                  <span className="rounded-full px-3 py-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1" style={{ background: v.palette.brand }}>Shop →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
