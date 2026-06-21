import { createFileRoute, Link } from "@tanstack/react-router";
import { VARIANTS, BRAND_PALETTE, paletteToCssVars } from "@/lib/variants";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import smodLogo from "@/assets/smod-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMOD — Smart Pods. Powerful Clean. Engineered for every load." },
      { name: "description", content: "SMOD — the Smart Pod. Pre-measured, plant-based laundry pods built on four pillars: Smart dosing, Maximum clean, Optimised care, Dependable freshness." },
      { property: "og:title", content: "SMOD — Smart Pods for every load" },
      { property: "og:description", content: "Smart. Maximum. Optimised. Dependable. One pod does it all." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

// Four pillars — implicitly spell SMOD (Smart · Maximum · Optimised · Dependable)
const PILLARS = [
  {
    letter: "S",
    word: "Smart",
    title: "Smart Dosing",
    body: "One pre-measured pod per load. No spills, no scoops, no over-pouring. Designed to take the guesswork out of laundry.",
    icon: "🧠",
  },
  {
    letter: "M",
    word: "Maximum",
    title: "Maximum Clean",
    body: "Concentrated multi-chamber formula tackles tough stains, sweat and grime in a single cycle — even on a cold wash.",
    icon: "💧",
  },
  {
    letter: "O",
    word: "Optimised",
    title: "Optimised for Fabrics",
    body: "Color-lock and fiber-safe chemistry tuned for every variant — regular cottons, performance polyester and delicate weaves.",
    icon: "🧵",
  },
  {
    letter: "D",
    word: "Dependable",
    title: "Dependable Freshness",
    body: "Long-lasting fragrance and anti-microbial finish keep clothes fresh wash after wash. Top & front load safe.",
    icon: "🌿",
  },
];

function Home() {
  return (
    <div
      style={{ ...paletteToCssVars(BRAND_PALETTE), background: "var(--v-bg)", color: "var(--v-ink)" }}
      className="min-h-screen"
    >
      <Header />

      {/* ============ HERO — Ariel / Surf-style split ============ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)` }}>
        {/* decorative bubbles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, transparent), transparent 60%)" }} />
          <div className="absolute right-10 top-40 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, white 70%, transparent), transparent 60%)" }} />
          <div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, transparent), transparent 60%)" }} />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 py-16 text-center text-white md:py-24">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -m-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 60%, transparent), transparent 70%)" }}
            />
            <div
              className="relative grid h-56 w-56 place-items-center rounded-full shadow-2xl md:h-72 md:w-72"
              style={{
                background: `conic-gradient(from 210deg, color-mix(in oklab, var(--accent) 80%, white), white 40%, color-mix(in oklab, var(--brand) 50%, white) 70%, var(--accent))`,
              }}
            >
              <div className="grid h-[80%] w-[80%] place-items-center rounded-full bg-white/20 backdrop-blur">
                <div className="text-center">
                  <img src={smodLogo.url} alt="SMOD" className="mx-auto h-14 w-auto md:h-20" />
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.35em] text-white/90">Smart Pod · One Wash</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-md text-base leading-relaxed opacity-90 md:text-lg">
            SMOD is the smarter way to wash. Pre-measured pods built on four pillars — <strong>S</strong>mart dosing, <strong>M</strong>aximum clean, <strong>O</strong>ptimised care and <strong>D</strong>ependable freshness.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/regular"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold shadow-lg transition-transform hover:scale-[1.03]"
              style={{ color: "var(--brand)" }}
            >
              Shop the range
            </Link>
            <a
              href="#pillars"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Discover the science
            </a>
          </div>
        </div>

        {/* trust strip */}
        <div className="relative border-t border-white/15 bg-black/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            <span>✓ Cruelty Free</span>
            <span>✓ Recyclable Packaging</span>
            <span>✓ Made in India</span>
            <span>✓ Top & Front Load Safe</span>
          </div>
        </div>
      </section>

      {/* ============ WHAT IS SMOD — wordmark reveal ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>
          What's in the name
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          <span style={{ color: "var(--brand)" }}>SM</span>art p<span style={{ color: "var(--brand)" }}>OD</span>.
          <br />
          Engineered to outperform.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base" style={{ color: "var(--v-ink-soft)" }}>
          Every SMOD pod is a tiny laboratory — multi-compartment chambers release the right detergent at the right moment of the wash cycle. No scooping. No leaking bottles. Just the smart way to clean.
        </p>
      </section>

      {/* ============ FOUR PILLARS ============ */}
      <section id="pillars" className="relative py-20" style={{ background: "var(--v-bg-soft)" }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>
              Four pillars
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">The science behind every pod.</h2>
            <p className="mx-auto mt-3 max-w-xl" style={{ color: "var(--v-ink-soft)" }}>
              Each letter of SMOD stands for a promise we engineer into every wash.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <article
                key={p.letter}
                className="group relative overflow-hidden rounded-3xl border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ borderColor: "color-mix(in oklab, var(--v-ink) 10%, transparent)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 text-[8rem] font-black leading-none opacity-[0.07] transition-opacity group-hover:opacity-[0.12]"
                  style={{ color: "var(--brand)" }}
                >
                  {p.letter}
                </div>
                <div className="relative">
                  <div className="text-3xl">{p.icon}</div>
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "var(--brand)" }}>
                    {p.word}
                  </div>
                  <h3 className="mt-1 text-xl font-black">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--v-ink-soft)" }}>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VARIANTS ============ */}
      <section id="variants" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>The range</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">One Smart Pod for every load.</h2>
          </div>
          <p className="max-w-sm text-sm" style={{ color: "var(--v-ink-soft)" }}>
            Available in 20-pod and 40-pod packs. Choose by laundry need — every variant carries the full SMOD promise.
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
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-40 blur-2xl" style={{ background: "var(--brand)" }} />
              <div className="relative">
                <div className="text-4xl">{v.emoji}</div>
                <h3 className="mt-4 text-2xl font-black" style={{ color: "var(--v-ink)" }}>{v.name}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>{v.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
                  {v.packs.map((p) => (
                    <span key={p.sku} className="rounded-full border px-2 py-1" style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)", color: "var(--brand-deep)" }}>
                      {p.size} pods · ₹{p.price}
                    </span>
                  ))}
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

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20" style={{ background: "var(--v-bg-soft)" }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: "var(--brand)" }}>How it works</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Three steps. Zero mess.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Drop the pod", b: "Place one SMOD pod directly into the empty drum before loading clothes." },
              { n: "02", t: "Load & start", b: "Add your laundry and run any cycle — cold or warm, top or front load." },
              { n: "03", t: "Pull out clean", b: "The biodegradable film dissolves completely. Deep clean, every time." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl bg-white p-8 shadow-sm">
                <div className="text-5xl font-black" style={{ color: "var(--brand)" }}>{s.n}</div>
                <h3 className="mt-4 text-xl font-black">{s.t}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--v-ink-soft)" }}>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-12 text-center text-white md:p-20"
          style={{ background: `linear-gradient(135deg, var(--brand), var(--brand-deep))` }}
        >
          <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-30" style={{ background: "var(--accent)" }} />
          <div className="relative">
            <h2 className="text-4xl font-black md:text-6xl">Ready for a smarter wash?</h2>
            <p className="mx-auto mt-4 max-w-xl opacity-90">Try the SMOD range today. One pod, one wash, no compromises.</p>
            <Link
              to="/regular"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-bold shadow-lg transition-transform hover:scale-[1.03]"
              style={{ color: "var(--brand)" }}
            >
              Shop SMOD pods →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
