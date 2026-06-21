import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMOD — Premium laundry pods, engineered for every load" },
      { name: "description", content: "Pre-measured, plant-based laundry pods engineered for every fabric: regular, socks and sportswear. Powerful clean, smart detergent." },
      { property: "og:title", content: "SMOD — Premium laundry pods" },
      { property: "og:description", content: "Three precision formulas. One smarter way to wash." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }} className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-0 h-[600px]"
          style={{ background: `radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, ${BRAND_PALETTE.brand} 18%, transparent), transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center md:py-32">
          <div
            className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur"
            style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)", color: "var(--brand)" }}
          >
            ◐ Premium laundry science
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-6xl font-black leading-[1.02] tracking-tight md:text-8xl">
            One pod.{" "}
            <span style={{ color: "var(--brand)" }}>Powerful clean.</span>{" "}
            Zero guesswork.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: "var(--v-ink-soft)" }}>
            SMOD makes a precision detergent pod for every load — engineered for whole-family clothes, socks and performance activewear.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/regular"
              className="rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              style={{ background: "var(--brand)", boxShadow: "0 15px 40px -15px var(--brand)" }}
            >
              Shop the range
            </Link>
            <a
              href="#variants"
              className="rounded-full border px-6 py-3 text-sm font-bold"
              style={{ borderColor: "color-mix(in oklab, var(--v-ink) 20%, transparent)", color: "var(--v-ink)" }}
            >
              Explore variants
            </a>
          </div>

          {/* trust strip */}
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--v-ink-soft)" }}>
            <span>✓ Cruelty Free</span>
            <span>✓ Recyclable Packaging</span>
            <span>✓ Made in India</span>
            <span>✓ Top & Front Load Safe</span>
          </div>
        </div>
      </section>

      {/* VARIANTS GRID */}
      <section id="variants" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>The range</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">A pod for every load.</h2>
          <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "var(--v-ink-soft)" }}>
            Each variant ships in 20 and 40 pod packs. Same precision formula, different commitment.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              to={`/${v.slug}` as string}
              className="group relative overflow-hidden rounded-3xl border p-8 transition-transform hover:-translate-y-1"
              style={{
                borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
                background: `linear-gradient(150deg, var(--v-surface), var(--v-bg-soft))`,
              }}
            >
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-50 blur-2xl" style={{ background: "var(--brand)" }} />
              <div className="relative">
                <div className="text-4xl">{v.emoji}</div>
                <h3 className="mt-4 text-2xl font-black" style={{ color: "var(--v-ink)" }}>{v.name}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>{v.tagline}</p>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold">
                  <div className="flex gap-2">
                    {v.packs.map((p) => (
                      <span key={p.sku} className="rounded-full border px-2 py-1" style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)", color: "var(--brand-deep)" }}>
                        {p.size} pods · ₹{p.price}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: "var(--v-ink-soft)" }}>From ₹{v.packs[0].price}</span>
                  <span className="rounded-full px-3 py-1 text-xs font-bold text-white transition-transform group-hover:translate-x-1" style={{ background: "var(--brand)" }}>
                    Shop →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMISE STRIP */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div
          className="grid gap-6 rounded-[2rem] border p-10 md:grid-cols-3"
          style={{
            borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)",
            background: `linear-gradient(135deg, var(--brand), var(--brand-deep))`,
            color: "white",
          }}
        >
          <Promise title="Pre-measured" body="Exactly one pod per load. No spills, no scoops, no waste." />
          <Promise title="Plant-based" body="Biodegradable dissolvable film and eco-conscious formula." />
          <Promise title="Fabric safe" body="Color-lock technology engineered for every machine." />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Promise({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">Promise</p>
      <h3 className="mt-2 text-2xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-90">{body}</p>
    </div>
  );
}
